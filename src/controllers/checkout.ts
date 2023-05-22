import {catchErrors} from '../errors';
import * as invoiceService from "../services/invoiceService";
import {generateToken, validateToken} from "../utils/auth";
import {Invoice} from "../data/checkout/InvoiceData";
import UserHandlers from "../data/users/UserHandlers";
import {DataProvider} from "../data"
import InvoiceHandlers from "../data/checkout/InvoiceHandlers";
import orderId from "order-id";
import SubscriptionPlanHandlers from "../data/subscriptionPlan/SubscriptionPlanHandlers";
// import {sendEmails} from "./teams";
import {SendEmail} from "../services/email/SendEmail";
import axios from "axios";
import * as bcrypt from "bcrypt";
import LicenseHandlers from "../data/license/LicenseHandlers";
import {futureDate} from "../utils/dateUtil";
import qs from 'querystring';
import cheerio from 'cheerio';
import InvoiceItemHandlers from "../data/invoiceItem/InvoiceItemHandlers";
import SubscriptionHandlers from "../data/subscription/SubscriptionHandlers";
const merchantId = '21013235';
const merchantKey = 'zcx350nyoedit';
const returnUrl = 'https://changeverveacademy.com/transaction-status';
const cancelUrl = 'https://changeverveacademy.com/cancel-url';
const notifyUrl = 'https://backend.changeverveacademy.com/notify';
const itemName = 'Change Management Game';

const SECRET_KEY = '6LdTVP8lAAAAAN4vi6Qc-rDwwB5TfOp2haVN_6Xm';


export const getAll =
    catchErrors(async (req, res) => {
      const sales     = await invoiceService.getAll()
      console.log("sales", req.body)
      res.respond({
        sales
      })
    })

export const getSaleDetails =
    catchErrors(async (req, res) => {
      const {token}     = req.params
      const invoice: Invoice = await invoiceService.getInvoice({transaction_number: token})
      const payment_token = invoice.payment_link
      const response = await validateToken(payment_token)
      console.log("invoice from sale details", invoice)
      const tokenObject = response.payloadObject
      res.respond({
        sale: tokenObject
      })
    })

export const getSale =
    catchErrors(async (req, res) => {
      const sale  = await invoiceService.getInvoice(req.body)
      console.log("sale", req.body)
      res.respond({
        sale
      })
    })


export const processPaymentForm =
    catchErrors(async (req, res) => {

        // console.log(req.cookies)
        // const csrfToken = req.cookies['XSRF-TOKEN'];
        // const csrfHeader = req.headers['x-xsrf-token'];
        // if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
        //     return res.status(403).json({ message: 'Invalid CSRF token' });
        // }

        const { items, email, quantity,  } = req.body;
        if (!(email)) {
            return res.status(400).send("All inputs are required!");
        }

        const dataProvider =       await DataProvider.create()
        const plans = await (await  SubscriptionPlanHandlers.create(dataProvider)).getAll()
        const orderNo = orderId("zertde").generate()
        // const plan_id = plans[0]?.id
        const plan_qty = quantity
        const plan     = plans[0]
        // const planObject = await (await SubscriptionPlanHandlers.create(dataProvider)).getById(plan_id)
        const total = plan?.price_per_person * Number(plan_qty)

        const generated_url = generateToken({
            email,
            total: plan?.price_per_person * Number(plan_qty),
            transaction_number: orderNo,
            url: `/card-payments/${orderNo}`,
            items
        }, '72h')

        await (await InvoiceHandlers.create(dataProvider)).create({
            transaction_number: orderNo,
            total: plan?.price_per_person * Number(plan_qty),
            provider: "payfast",
            payment_link: generated_url,
        })

        const data = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            return_url: returnUrl,
            cancel_url: cancelUrl,
            notify_url: notifyUrl,
            email_address: email,
            m_payment_id: orderNo,
            amount: total,
            item_name: itemName,
            payment_method: "cc"
        }

        const postData = { ...data };

        try {
            const response = await axios.post('https://www.payfast.co.za/eng/process', qs.stringify(postData));

            const $ = cheerio.load(response.data);
            const uuid = $('meta[name="uuid"]').attr("content");
            console.log("uuid", uuid);

            if (!uuid) {
                return res.status(400).send("UUID not found in the response");
            }

            return res.respond({
                url: `https://www.payfast.co.za/eng/process/payment/${uuid}`
            })

        } catch (error) {

            return res.respond({
                url: `${error}`
            })
        }
    })


export const sendPaymentLink =
    catchErrors(async (req, res) => {
        const { items, email } = req.body;
        console.log("Items, email", `${items} ${email}`)
        if (!( items && email)) {
            return res.status(400).send("All inputs are required!");
        }

        const data =       await DataProvider.create()
        const orderNo = orderId("zertde").generate()
        const plan_id = items[0]["id"]
        const plan_qty = items[0]["qty"]
        const planObject = await (await SubscriptionPlanHandlers.create(data)).getById(plan_id)
        const total = planObject?.price_per_person * Number(plan_qty)

        const generated_url = generateToken({
            email,
            total: planObject?.price_per_person * Number(plan_qty),
            transaction_number: orderNo,
            url: `/card-payments/${orderNo}`,
            items
        }, '72h')

        await (await InvoiceHandlers.create(data)).create({
            transaction_number: orderNo,
            total: planObject?.price_per_person * Number(plan_qty),
            provider: "payfast",
            payment_link: generated_url,
        })

        const sendMail = SendEmail()
        sendMail.sendPaymentLink(email, planObject?.name, total, orderNo, generated_url)

        res.respond({
            data: null
        })

    })


export const processPayment = catchErrors(async (req, res) => {
    const {token} = req.params;
    const parsedToken = parseJwt(token);

    if (!parsedToken) {
        return res.status(400).send("Token is not valid!");
    }

    console.log("Token Info", parsedToken);

    const { email, transaction_number, total } = parsedToken?.payloadObject;

    const data = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,
        email_address: email,
        m_payment_id: transaction_number,
        amount: total,
        item_name: itemName,
        payment_method: "cc"
    };

    // const signature = generateSignature(data);

    // const postData = {
    //     ...data,
    //     signature: signature,
    // };

    const postData = { ...data };

    try {
        const response = await axios.post('https://www.payfast.co.za/eng/process', qs.stringify(postData));
        console.log(response);

        const $ = cheerio.load(response.data);
        const uuid = $('meta[name="uuid"]').attr("content");
        console.log("uuid", uuid);

        if (!uuid) {
            return res.status(400).send("UUID not found in the response");
        }

        return res.redirect(`https://www.payfast.co.za/eng/process/payment/${uuid}`);
    } catch (error) {
        console.error(error);
    }
});

export const paymentNotification = catchErrors(async (req, res) => {
    // @ts-ignore
    const {m_payment_id, pf_payment_id, payment_status, item_name, amount_gross, amount_fee, amount_net, signature} = req.body

    console.log("Payment Notification", req.body)
    if (payment_status === "COMPLETE"){
        // try {
            const data = await DataProvider.create();
            const invoiceHandler = await InvoiceHandlers.create(data);
            const userHandler = await UserHandlers.create(data);
            const subscriptionPlanHandler = await SubscriptionPlanHandlers.create(data);
            const invoiceItemHandler = await InvoiceItemHandlers.create(data);
            const licenseHandler = await LicenseHandlers.create(data);
            const subscriptionHandler = await SubscriptionHandlers.create(data);
            const invoiceObject = await invoiceHandler.getInvoice({transaction_number: m_payment_id});
            const parsedToken = parseJwt(invoiceObject?.payment_link);
            const payloadObject = parsedToken?.payloadObject;
            await invoiceHandler.update(m_payment_id, {paid: true});
            const existingUserObject = await userHandler.getUser({email: payloadObject?.email})
            const userObject = existingUserObject ? existingUserObject : await userHandler.create({email: payloadObject?.email});
            const planObject = await subscriptionPlanHandler.getById(payloadObject?.items[0].id);
            const subscription_plan = planObject.id;
            const unit_price = planObject.price_per_person;
            const quantity = 1;
            const description = planObject.name;
            const invoice = invoiceObject.id;
            const expires_at = futureDate(180);

            // @ts-ignore
            await invoiceItemHandler.create({subscription_plan, unit_price, quantity, description, invoice});

            // @ts-ignore
            const licenseObject = await licenseHandler.create({user: userObject?.id, expiry: expires_at});
            const body = {user: userObject?.id, invoice, subscription_plan, expires_at, quantity, license: licenseObject.id};
            console.log("Body", body)
            // @ts-ignore
            await subscriptionHandler.create(body);
            const invoiceEmail = payloadObject?.email;
            const date = invoiceObject?.created_at;
            const sendMail = SendEmail();
            await sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail, date, m_payment_id, amount_gross,1, invoiceObject?.payment_link);
    }

    return res.respond({
        verified: true
    })
    // return res.send("").status(200)
})

export const validateAndRedirectToSetup = catchErrors(async (req, res) => {
    const { token } = req.params;
    const parsedToken = parseJwt(token)
    const transactionNumber = parsedToken?.payloadObject?.transaction_number
    const data = await DataProvider.create()
    const invoiceObject      = await (await  InvoiceHandlers.create(data)).getInvoice({
        transaction_number: transactionNumber
    })

    if (invoiceObject?.paid){
        return res.redirect(`https://changeverveacademy.com/return-url/${token}`)
    }

    return res.redirect("https://changeverveacademy.com")
});

export const addAdministrator = catchErrors(async (req, res) => {
        const { name, email, password, company, captchaValue, token } = req.body;

    // try{
         if (!captchaValue) {return res.status(400).json({ error: 'reCAPTCHA value is missing' });}

         const parsedToken = parseJwt(token)
         const transactionId = parsedToken?.payloadObject?.transaction_number

         const data = await DataProvider.create()
         const userHandlers = await UserHandlers.create(data);
         const existingUserObject = await userHandlers.getUser({email})

        if (existingUserObject){
            return res.status(409).json({ error: 'This email is already exists!' });
        }

        const invoiceObject = await (await InvoiceHandlers.create(data)).getInvoice({
            transaction_number: transactionId
        })

        if (!invoiceObject || !invoiceObject?.paid){
            return res.status(404).json({ error: 'Transaction does not exist or not paid!' });
        }

        const isCaptchaValid = await verifyCaptcha(captchaValue);

        if (!isCaptchaValid) {
            return res.status(400).json({ error: 'Invalid reCAPTCHA' });
        }

        const user = await createUser(name, email, password, company);

        await (await InvoiceHandlers.create(data)).update(transactionId, {
            admin_setup: true
        })

        const subscriptionHandlers = await SubscriptionHandlers.create(data)
        const subscription =  await subscriptionHandlers.get({invoice: invoiceObject?.id})
        await subscriptionHandlers.update({
            id: subscription?.id,
            administrator: user?.id
        })

        const sendMail = SendEmail()
        sendMail.confirmationEmailToAdmin(email, 0)

        return res.json({ success: true });

    // }catch (e) {
        return res.json({ success: false });

    // }

});

//@ts-ignore
export const checkTransactionStatus = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const invoiceHandler = await InvoiceHandlers.create(data);
    const allInvoices = await invoiceHandler.getAll({
        paid: false
    })

    const latestInvoice = allInvoices[0]
    const m_payment_id = latestInvoice?.transaction_number
    const amount_gross = latestInvoice?.total

    const userHandler = await UserHandlers.create(data);
    const subscriptionPlanHandler = await SubscriptionPlanHandlers.create(data);
    const invoiceItemHandler = await InvoiceItemHandlers.create(data);
    const licenseHandler = await LicenseHandlers.create(data);
    const subscriptionHandler = await SubscriptionHandlers.create(data);
    const invoiceObject = await invoiceHandler.getInvoice({transaction_number: m_payment_id});
    const parsedToken = parseJwt(invoiceObject?.payment_link);
    const payloadObject = parsedToken?.payloadObject;
    const existingUserObject = await userHandler.getUser({email: payloadObject?.email})
    const userObject = existingUserObject ? existingUserObject : await userHandler.create({email: payloadObject?.email});
    const planObject = await subscriptionPlanHandler.getById(payloadObject?.items[0].id);
    const subscription_plan = planObject.id;
    const unit_price = planObject.price_per_person;
    const quantity = 1;
    const description = planObject.name;
    const invoice = invoiceObject.id;
    const expires_at = futureDate(180);

    // @ts-ignore
    await invoiceItemHandler.create({subscription_plan, unit_price, quantity, description, invoice});

    // @ts-ignore
    const licenseObject = await licenseHandler.create({user: userObject?.id, expiry: expires_at});
    const body = {user: userObject?.id, invoice, subscription_plan, expires_at, quantity, license: licenseObject.id};
    await invoiceHandler.update(m_payment_id, {paid: true, license: licenseObject?.id, user: userObject?.id});

    console.log("Body", body)
    // @ts-ignore
    await subscriptionHandler.create(body);
    const invoiceEmail = payloadObject?.email;
    const date = invoiceObject?.created_at;
    const sendMail = SendEmail();
    await sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail, date, m_payment_id, amount_gross,1, invoiceObject?.payment_link);
    // }

    return res.respond({
        verified: true
    })

});

export const testTransactionStatus = catchErrors(async (req, res) => {
    const { transaction_id } = req.params;
    const version = 'v1'; // The PayFast API version
    const timestamp = new Date().toISOString(); // The current timestamp in ISO-8601 format
    const passphrase = ''; // Your passphrase as set on the settings page
    const id = transaction_id; // The payment or subscription ID
    const params = {
        merchantId,
        version,
        timestamp,
        passphrase
    };
    const keys = Object.keys(params).sort();
    // const values = keys.map(key => params[key]);
    // const str = values.join('');
    const signature = generateSignature(keys);
    // const signature = require('crypto').createHash('md5').update(str).digest('hex');

    const headers = {
        'merchant-id': merchantId,
        'version': version,
        'timestamp': timestamp,
        'signature': signature
    };

    const options = {
        url: `https://api.payfast.co.za/process/query/${id}`,
        method: 'GET',
        headers: headers
    };

    axios(options)
        .then(resp => {
            console.log(resp.data);
            res.send(resp.data)
        })
        .catch(err => {
            console.error(err);
            res.send(err)
        });

});










export const create =
    catchErrors(async (req, res) => {
      const { items, user } = req.body;
      if (!( items && user)) {
        return res.status(400).send("All inputs are required!");
      }

      // const data =       await DataProvider.create
      // const license     = (await createLicense(req)).id
      // const invoice     = license && await createInvoice(req, items, license)
      // const invoiceItem = (invoice) &&  await invoiceItemService(req, items, invoice)
      // const payment     = (license && invoice && invoiceItem) ? await paymentService(req,invoice, license) : {}
      // const userObject =  await (await UserHandlers.create(data)).getTeamUsersByUserId(user)
      //
      // const generated_url = generateToken({
      //   invoice_id: invoice && invoice.id,
      //   total: invoice.total,
      //   transaction_number: invoice.transaction_number,
      //   formatted_total: invoice.formatted_total,
      //   url: `/card-payments/${invoice.id}?item=${invoiceItem.id}`,
      //   items
      // }, '24h')
      //
      // await invoiceService.updateInvoice(invoice.transaction_number, {
      //   payment_link: generated_url
      // })

        // console.log("User email",  userObject.length > 0 ? userObject[0]?.email: "")
        // const sendMail = SendEmail()

        // sendMail.confirmationEmailToAdmin(userObject[0]?.email, items[0].qty)

        // const invoiceEmail = userObject[0]?.additionalDetails.invoice_email
        // const invoiceEmail = userObject[0]?.email
        // console.log("invoice email", invoiceEmail)

            // await sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail,
            //     userObject[0]?.created_at, invoice.transaction_number, invoice.formatted_total, items[0]?.qty)


      res.respond({
      });
    })


export const regenerateLink =
    catchErrors(async (req, res) => {
      const {transaction_number} = req.params
      const invoice: Invoice = await invoiceService.getInvoice({transaction_number: transaction_number})
      const tokenObject = parseJwt(invoice.payment_link).payloadObject
      const generated = generateToken(tokenObject)
      await invoiceService.updateInvoice( transaction_number, {payment_link: generated})
      res.respond({
        payment_token: generated
      })
    })

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}



// @ts-ignore
const generateSignature = (data) => {
    const crypto = require('crypto');

    let pfOutput = "";
    for (let key in data) {
        if(data.hasOwnProperty(key)){
            if (data[key] !== "") {
                pfOutput +=`${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}&`
            }
        }
    }

    let getString = pfOutput.slice(0, -1);
    // if (passPhrase !== null) {
    //     getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
    // }

    return crypto.createHash("md5").update(getString).digest("hex");
};


const verifyCaptcha = async (captchaValue) => {
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaValue}`;
    const response = await axios.post(verificationURL);
    return response.data.success;
};

const createUser = async (name, email, password, company) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const fullNameArray = name?.split(" ");
    const data = await DataProvider.create();
    const userHandlers = await UserHandlers.create(data);
    const existingUserObject = await userHandlers.getUser({email})

    if (!existingUserObject){
        return await userHandlers.create({
            email,
            firstName: fullNameArray[0],
            lastName: fullNameArray.length > 1 ? fullNameArray[1] : "",
            password: hashedPassword,
            additionalDetails: {
                company: company
            }
        })
    }

    return existingUserObject
};
