// @ts-ignore
export const paymentLink = (email: string, plan: string, total: number, transaction_number: string, payment_link: string) => {
    return `
                
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100%;
            }
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #F5F5F5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #FFF;
        }
        .header {
            text-align: center;
            background-color: #a70000;
            color: white;
            padding: 20px;
        }
        .invoice-details {
            margin: 20px 0;
        }
        .invoice-details th, .invoice-details td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .total {
            font-weight: bold;
            background-color: #F5F5F5;
        }
        .payment-button {
            display: inline-block;
            width: 200px;
            height: 50px;
            margin: 20px auto;
            background: #a70000;
            color: white;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            line-height: 50px;
            text-align: center;
            transition: background 0.3s ease-in-out;
        }
        .payment-button:hover {
            background: #8b0000;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Invoice Payment</h1>
        </div>
        <p>Good day,</p>
        <p>We appreciate your business. Here is the link to make payment:</p>
        <table class="invoice-details">
            <tr>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>${plan}</td>
                <td>1</td>
                <td>${total}</td>
                <td>${total}</td>
            </tr>
            <tr class="total">
                <td colspan="3">Total:</td>
                <td>ZAR ${total}</td>
            </tr>
        </table>
        <a href="https://backend.changeverveacademy.com/process-payment/${payment_link}" class="payment-button">Pay Now</a>
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        <p>Thank you,</p>
        <p>Your Team</p>
    </div>
</body>
</html>

    `;
}
