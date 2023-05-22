"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsTemplate = void 0;
const UserProgressHandlers_1 = __importDefault(require("../../../data/userProgress/UserProgressHandlers"));
const data_1 = require("../../../data");
const UserHandlers_1 = __importDefault(require("../../../data/users/UserHandlers"));
const TeamHandlers_1 = __importDefault(require("../../../data/teams/TeamHandlers"));
const LicenseHandlers_1 = __importDefault(require("../../../data/license/LicenseHandlers"));
// import LicenseHandlers from "../../../data/license/LicenseHandlers";
const resultsTemplate = ({ user_id, game_id, license_id }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const data = yield data_1.DataProvider.create();
    const [progressObject, userObject, licenseObject] = yield Promise.all([
        (yield UserProgressHandlers_1.default.create(data)).getSingleProgress({ user: user_id, game: game_id }),
        (yield UserHandlers_1.default.create(data)).getUser({ id: user_id }),
        (yield LicenseHandlers_1.default.create(data)).getById(license_id)
    ]);
    const currentActualEEScore = ((progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_ee_score) ? progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_ee_score : 0) + 100;
    const currentActualETScore = ((progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_et_score) ? progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_et_score : 0) + 100;
    const currentActualBudgetScore = ((progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_budget_score) ? progressObject === null || progressObject === void 0 ? void 0 : progressObject.actual_budget_score : 0) + 100;
    const overallScore = Math.floor((currentActualEEScore + currentActualETScore + currentActualBudgetScore) / 3);
    const licensedUser = yield (yield UserHandlers_1.default.create(data)).getUser({ id: licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.user });
    const firstName = ((_a = userObject === null || userObject === void 0 ? void 0 : userObject.firstName) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()) + ((_b = userObject === null || userObject === void 0 ? void 0 : userObject.firstName) === null || _b === void 0 ? void 0 : _b.slice(1));
    const lastName = ((_c = userObject === null || userObject === void 0 ? void 0 : userObject.lastName) === null || _c === void 0 ? void 0 : _c.charAt(0).toUpperCase()) + ((_d = userObject === null || userObject === void 0 ? void 0 : userObject.lastName) === null || _d === void 0 ? void 0 : _d.slice(1));
    console.log(`${firstName} ${lastName}`);
    const teams = yield (yield TeamHandlers_1.default.create(data)).getAll(license_id);
    // @ts-ignore
    const team = teams.length > 0 ? teams[0] : { email: "" };
    console.log("user id", user_id);
    console.log("game -id", game_id);
    // @ts-ignore
    const html = `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/html">
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          background-color: white;
          color: black;
        }
      </style>
    </head>
    <body>
      <h2>Congratulations ${firstName} ${lastName},</h2>
      <p>You have completed the <strong>ChangeVerve Change Management Game!</strong>
         We trust that you found the experience insightful and derived significant value throughout the process.
       </p>

      <h2>Below is a summary of your final results.</h2>
      
         <h3>Overall Average Score = ${overallScore}</h3>
        <p>${getOverAllAssessment(overallScore)}</p>

      <h3>Employee Effectiveness Score = ${currentActualEEScore} </h3>
      <p>${getEffectivenessAssessment(currentActualEEScore)}</p>

      <h3>Time Score = ${currentActualETScore}</h3>
      <p>${getTimeAssessment(currentActualETScore)}</p>

      <h3>Budget Score = ${currentActualBudgetScore}</h3>
      <p>${getBudgetAssessment(currentActualBudgetScore)}</p>

      <br />
      <p>
      <strong>
            Please contact your Administrator at ${licensedUser === null || licensedUser === void 0 ? void 0 : licensedUser.email}  if you have any questions or if you are interested in developing any specific Change Management skills.
    </strong>
       </p>

      <p><strong>All the best for your organisational Change Management projects! </strong></p>

      <p><strong>The ChangeVerve Team.</strong></p>
    </body>
    </html>
  `;
    // return html;
    const PdfHtml = `
 <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script></script>
        <style>
          html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            position: relative;
          }
    
          /* header */
          .header {
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          }
    
          .header-image {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
    
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: auto;
          }
    
          /* email section */
          section {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            height: 100%;
            margin-bottom: 2rem;
          }
    
          .heading {
            font-size: 46px;
            color: #a30401;
            font-weight: 400;
          }

         .names {
            font-size: 25px;
            padding-left: 60px;
            padding-right: 60px;
          }
          
          .score {
             color: #a30401;
          }

         .intro{
            font-size: 20px;
            padding-left: 60px;
            padding-right: 60px;
            font-weight: 200 !important
          }
    
          .paragraph {
            font-size: 20px;
            padding-left: 60px;
            padding-right: 60px;
          }
          /* footer image */
          .footer {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            text-align: center;
          }
    
          .footer h1 {
            font-size: 30px;
            font-weight: 800;
            padding-left: 60px;
            padding-right: 60px;
          }
    
          .team {
            font-size: 50px;
            font-weight: 400;
            color: #a30401;
          }
          .footer-image {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <!-- header -->
        <header class="header">
          <img src=${`https://changeverve-bucket.s3.eu-west-2.amazonaws.com/Full-Header.png`} alt="" class="header-image" />
        </header>
        <!-- end of header -->
        <section class="email-section">
        
              <h1 class="heading">Congratulations </h1>
              
              <h3 class="names" style="text-decoration: underline">${firstName} ${lastName}</h3>
              
                <p class="intro">
                You have completed the <strong>ChangeVerve Change Management Game!</strong>
                 We trust that you found the experience insightful and derived significant value throughout the process.
       </p>
       
             <h2>Below is a summary of your final results.</h2>

            <h2 class="score">Overall Average Score = ${overallScore}</h2>
            <p class="paragraph">${getOverAllAssessment(overallScore)}</p>
        
            <h2 class="score">Employee Effectiveness Score = ${currentActualEEScore} </h3>
            <p class="paragraph">${getEffectivenessAssessment(currentActualEEScore)}</p>

            <h2 class="score">Time Score = ${currentActualETScore}</h2>
             <p class="paragraph">${getTimeAssessment(currentActualETScore)}</p>

             <h2 class="score">Budget Score = ${currentActualBudgetScore}</h2>
             <p class="paragraph">${getBudgetAssessment(currentActualBudgetScore)}</p>
      
        </section>
        <!-- end of section -->
        <!-- footer section -->
        <footer class="footer">
          <p class="intro">
            Please contact your Administrator at ${licensedUser === null || licensedUser === void 0 ? void 0 : licensedUser.email} 
            if you have any questions or if you are interested in developing any
            specific Change Management skills
          </p>
          <p class="intro">All the best for your organisational Change Management projects!</p>
          <h2 class="team">The Change Verve Team.</h2>
          <img src=${`https://changeverve-bucket.s3.eu-west-2.amazonaws.com/Footer.png`} alt="" class="footer-image" />
        </footer>
        <!-- end of footer section -->
      </body>
    </html>
 `;
    return { PdfHtml, firstName, lastName, licensedUser };
    return PdfHtml;
});
exports.resultsTemplate = resultsTemplate;
const getEffectivenessAssessment = (currentActualEEScore) => {
    let message;
    if (currentActualEEScore >= 208 && currentActualEEScore < 247) {
        message = `
      Well done! You are an expert at managing Employee Effectiveness during the change process.
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is important to manage the well-being of employees and recognise their efforts and successes.
      Your score suggests that you may be proficient in designing and implementing activities that are tailored to the specific Employee Effectiveness needs for large-scale and complex change with highly diverse stakeholders. This leads to effective management of human resource capacity, capability, competency development, role and deliverable clarity, health and wellness, stakeholder engagement, and recognition during the change process.
  `;
    }
    else if (currentActualEEScore >= 172 && currentActualEEScore < 208) {
        message = `
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is important to manage the well-being and participation of employees. This includes managing human resource capacity, capability, competency development, role and deliverable clarity, health and wellness, stakeholder engagement, and recognition in the change process.
      Your score suggests that you have a thorough understanding of, and experience in Employee Effectiveness management during the change process. A recommendation for further development is to enhance your Change Management skills and ability to refine and/or develop change initiatives and tailor them more specifically to the needs of highly diverse stakeholders, to more complex change deliverables, and to the phases within the change process.
  `;
    }
    else if (currentActualEEScore >= 137 && currentActualEEScore < 172) {
        message = `
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is important to manage the well-being and participation of employees. This includes managing human resource capacity, capability, competency development, role and deliverable clarity, health and wellness, stakeholder engagement, and recognition during the change process.
      Your score suggests that you have some knowledge and experience in managing Employee Effectiveness during the change process. As a next step for your development, it is recommended to focus on enhancing the practical application of your Change Management skills to include more diverse tools and interventions that will address the needs of larger and more complex stakeholder groups and Employee Effectiveness issues.
  `;
    }
    else if (currentActualEEScore >= 104 && currentActualEEScore < 137) {
        message = `
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is important to manage the well-being of employees and recognise their efforts and successes.
      Your score suggests a theoretical understanding of the importance of managing Employee Effectiveness during the change process. As a next step in your development journey, it is recommended to focus on the practical application of your Change Management skills to enhance your ability to manage human resource capacity, capability development, and role clarity, as well as promote employee health and wellness, stakeholder engagement, and recognition.
  `;
    }
    else if (currentActualEEScore >= 57 && currentActualEEScore < 104) {
        message = `
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is important to manage the well-being of employees and recognise their efforts and successes.
      Your score suggests that you have some knowledge of the importance of successfully managing Employee Effectiveness during the change process. As a next step, more learning and development are required to deepen your Change Management knowledge and practical application of skills for enhancing human resource capacity, capability, competency development, role and deliverable clarity, health and wellness, stakeholder engagement, and recognition.
  `;
    }
    else if (currentActualEEScore >= 0 && currentActualEEScore < 57) {
        message = `
      Successful change relies on the participation and effort of individuals to accomplish tasks and activities. In order for individuals to effectively contribute, it is important for them to have a clear understanding of their expectations, the necessary resources and support to fulfil those expectations, and a willingness to be involved in the change process. Throughout the change process, it is essential to prioritise the well-being of employees and recognise their efforts and successes.
      Your score suggests that there is a need for further learning and development in understanding the importance of Employee Effectiveness in Change Management. This includes how to effectively support human resource capacity, capability, competency development, role and deliverable clarity, health and wellness, stakeholder engagement, and recognition during the change process.
  `;
    }
    return message;
};
const getTimeAssessment = (currentActualETScore) => {
    let message;
    if (currentActualETScore >= 197 && currentActualETScore < 230) {
        message = `
      Well done! You are an expert at managing project timelines during the change process. Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Your score suggests that you know how to manage the impact of different activities, issues and risks on the overall change project deadline. You most likely consider the strategic interdependence of each decision, stakeholder engagement, or intervention that was planned. You know how to focus on what needs to be delivered, clearly communicate the requirements to stakeholders, regularly monitor the progress and make adjustments where necessary.
  `;
    }
    else if (currentActualETScore >= 168 && currentActualETScore < 197) {
        message = `
      Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Good time management includes clear communication on stakeholder requirements and expectations, effective risk management, and regular progress monitoring with adjustments or corrective action where necessary.
      Your score suggests that you know how to manage project timelines during a change process well. A recommendation for further development is to refine your tracking and management of the impact of different activities, interventions, and issues on the overall project deadline. Explore the option of more diverse tools to manage the interdependence of decisions, stakeholder engagements, interventions, and strategic challenges on planned timelines.
  `;
    }
    else if (currentActualETScore >= 138 && currentActualETScore < 168) {
        message = `
      Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Each decision, stakeholder engagement, or action taken during the project affects the timelines. Good time management includes clear communication on stakeholder requirements and expectations, effective risk management, and regular progress monitoring with adjustments or corrective action where necessary.
      Your score suggests that you have some knowledge and experience in project time management during the change process. As a next step for your development, it is recommended to focus on enhancing the practical application of your skills through learning about more tools and methods to support effective time management for more complex change projects.
`;
    }
    else if (currentActualETScore >= 108 && currentActualETScore < 138) {
        message = `
      Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Each decision, stakeholder engagement, or action taken during the project affects the timelines. Good time management includes clear communication on stakeholder requirements and expectations, effective risk management, and regular progress monitoring with adjustments or corrective action where necessary.
      Your score suggests that you have a theoretical understanding of project time management during the change process. There seems to be a need for further learning and development with regard to practical application in this area. This includes the practical application of skills to plan and manage the time available for tasks, effectively drive task completion within planned timelines, and assess the overall impact on the project deadline. This will help you to optimise the use of time and prioritise activities that are essential to the change project's success and avoid implementing inappropriate activities or wasting time on unnecessary tasks.
  `;
    }
    else if (currentActualETScore >= 69 && currentActualETScore < 108) {
        message = `
      Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Each decision, stakeholder engagement, or action taken during the project affects the timelines. Good time management includes clear communication on stakeholder requirements and expectations, effective risk management, and regular progress monitoring with adjustments or corrective action where necessary.
      Your score suggests that you have some knowledge of project time management during the change process. There seems to be a need for further learning and development in this area. This includes gaining more knowledge and practical application of skills to plan and manage the time available for tasks, effectively drive task completion within planned timelines, and assess the overall impact on the project deadline. This will help you to optimise the use of time and prioritise activities that are essential to the change project's success and avoid implementing inappropriate activities or wasting time on unnecessary tasks.
  `;
    }
    else if (currentActualETScore >= 0 && currentActualETScore < 69) {
        message = `
      Effective management of project timelines is crucial in ensuring the timely completion of tasks and maintaining the overall progress of the change project. This not only helps to avoid delays and additional expenses but also contributes to the successful implementation of the change.
      Each decision, stakeholder engagement, or action taken during the project affects the timelines. Good time management includes clear communication on stakeholder requirements and expectations, effective risk management, and regular progress monitoring with adjustments or corrective action where necessary.
      Your score suggests that you probably have limited knowledge and experience in project time management during the change process, and there is a need for further learning and development in this area. This includes the practical application of skills to plan and manage the time available for tasks, effectively drive task completion within planned timelines, and assess the overall impact on the project deadline.
  `;
    }
    return message;
};
const getBudgetAssessment = (currentActualBudgetScore) => {
    let message;
    if (currentActualBudgetScore >= 185 && currentActualBudgetScore < 220) {
        message = `
      Well done! You are an expert at managing change project budgets. Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending. This can prevent delays and additional costs that can negatively impact the project's success.
  Your score suggests that you know how to manage the impact of different activities, issues, and risks on the overall change budget. You most likely consider the strategic interdependence of each decision, stakeholder engagement, intervention, potential risks, and project timelines on the budget. You probably present budget information well and should be able to assess variables and scenarios, such as forecasting. A high level of business acumen and the ability to anticipate and plan for potential financial challenges and related decision-making are core skills for strategic change role players.
  `;
    }
    else if (currentActualBudgetScore >= 159 && currentActualBudgetScore < 185) {
        message = `
      Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending. This can prevent delays and additional costs that can negatively impact the project's success.
  Your score indicates that you know how to manage change budgets well. A recommendation for further development is to refine your budget management skills. This includes considering the strategic interdependence of decisions, stakeholder engagement, interventions, potential risks, and project timelines on the budget. Additionally, explore enhancing your business acumen, different methods of presenting budget information, and evaluating variables and scenarios, such as forecasting. This will enable you to anticipate and plan for potential financial challenges and make informed decisions, which is a core skill for strategic change role players.
  `;
    }
    else if (currentActualBudgetScore >= 132 && currentActualBudgetScore < 159) {
        message = `
      Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending.
      This can prevent delays and additional costs that can negatively impact the project's success. When making decisions, engaging with stakeholders, or planning interventions, it is important to consider their financial impact on the budget. Additionally, potential risks or issues that may affect the budget should be closely monitored and addressed promptly.
  Your score suggests that you have some knowledge and experience in budget management during the change process. As a next step for your development, it is recommended to focus on enhancing the practical application of your skills to manage change budgets for more diverse and complex change projects and the impact of the interdependence of each decision, stakeholder engagement, intervention, and risk on the budget.
 `;
    }
    else if (currentActualBudgetScore >= 105 && currentActualBudgetScore < 132) {
        message = `
      Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending. This can prevent delays and additional costs that can negatively impact the project's success. When making decisions, engaging with stakeholders, or planning interventions, it is important to consider their financial impact on the budget. Additionally, potential risks or issues that may affect the budget should be closely monitored and addressed promptly.
  Your score suggests that you have an understanding of the significance of project budget management during the change process. It is recommended that you place additional emphasis on the practical application of managing a change budget effectively. This includes developing a comprehensive budget plan, consistently monitoring expenses, and being prepared to make adjustments as necessary to ensure that the project stays within financial constraints. By focusing on these key elements, you will be better equipped to successfully manage change budgets.
  `;
    }
    else if (currentActualBudgetScore >= 70 && currentActualBudgetScore < 105) {
        message = `
      Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending. This can prevent delays and additional costs that can negatively impact the project's success. When making decisions, engaging with stakeholders, or planning interventions, it is important to consider their financial impact on the budget. Additionally, potential risks or issues that may affect the budget should be closely monitored and addressed promptly.
  Your score suggests that you probably have some knowledge of budget management during the change process and there is a need for further learning and development in this area. The next step to deepen and enhance your change budget management knowledge and practical application of skills could include focussing on creating a detailed budget plan, regularly monitoring expenses, and being prepared to make adjustments to the budget as needed to ensure the financial success of a change initiative.
  `;
    }
    else if (currentActualBudgetScore >= 0 && currentActualBudgetScore < 70) {
        message = `
      Effective management of change budgets is crucial in ensuring that the change project stays within the allocated financial resources and avoids overspending. This can prevent delays and additional costs that can negatively impact the project's success. When making decisions, engaging with stakeholders, or planning interventions, it is important to consider their financial impact on the budget. Additionally, potential risks or issues that may affect the budget should be closely monitored and addressed promptly.
  Your score suggests that you probably have limited knowledge and experience in budget management during the change process and there is a need for further learning and development in this area. This includes creating a detailed budget plan, regularly monitoring expenses, and being prepared to make adjustments to the budget as needed to ensure the financial success of the change.
  `;
    }
    return message;
};
const getOverAllAssessment = (overallScore) => {
    let message;
    if (overallScore >= 201 && overallScore < 232) {
        message = `You appear to be an accomplished and highly experienced change manager and may possibly be a subject matter expert. You seem to have a deep understanding of Change Management principles and methodologies and most likely successfully led a wide range of change initiatives across different industries and/or organisations in complex and challenging environments. You are likely to have a strong ability to anticipate, manage, and identify causes of resistance to change, effectively use Change Management tools, methodologies, and techniques, as well as develop new methods, tools, and tailored interventions to suit specific change scenarios. You may also have the ability to establish and foster a culture of change within organisations. Your leadership, communication, and stakeholder management skills, emotional intelligence, and ability to inspire and motivate others to embrace change are likely exceptional, making you a legend in the field of Change Management.
If you are interested in further enhancing your skills, exploring new practical tools in Change Management, and/or developing Change Management capacity within your organisation, we recommend reaching out to the appropriate organisational representative/manager or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development or your organisation in this area.`;
    }
    else if (overallScore >= 170 && overallScore < 201) {
        message = `
            It appears that you have significant experience and a good understanding of Change Management, including a broad range of knowledge and skills. You may have a proven track record of successfully leading a wide range of change initiatives. As an experienced Change Manager/Leader/Champion, you likely have the ability to not only anticipate and manage resistance to change but also identify and address the root causes of resistance. It appears that your experience includes the application of different methodologies and tools and possibly developing tailored interventions to specific change scenarios. 
            If you are interested in further enhancing your skills or developing Change Management capacity within your organisation, we recommend reaching out to the appropriate organisational representative/manager or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development or your organisation in this area.
            `;
    }
    else if (overallScore >= 139 && overallScore < 170) {
        message = `
                It seems that you have some experience in Change Management, and are capable of managing change initiatives of simple to moderate complexity. You appear to have a good understanding of Change Management principles, methodologies, tools, and techniques. It is probable that you have the competence to recognise the change requirements, create and carry out a change plan, and efficiently communicate and coordinate with stakeholders for such simple to moderately complex projects. With more learning and experience in complex change, you will be able to deepen your understanding through the results of practical application. You may need guidance from specialists or more experienced colleagues to identify and manage the complexities and nuances that arise from more multifaceted change. 
                If you are interested in further enhancing your skills to manage more complex change, we recommend reaching out to the appropriate representative/manager within your organisation or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development in this area.
            `;
    }
    else if (overallScore >= 107 && overallScore < 139) {
        message = `It appears that you have a good understanding of the concepts, principles, and methodologies of Change Management. It is likely that you have gained this knowledge through formal education or self-study. However, you may have limited experience in applying your knowledge to large-scale, more complex change projects such as Gold Corporation's Project Phoenix. With more learning and experience, you will be able to deepen your understanding through the results of practical application. You may need guidance from specialists or more experienced colleagues to identify and manage the complexities and nuances that arise from more multifaceted change.
        If you are interested in further developing your skills to practically implement change and manage more complex change, we recommend reaching out to the appropriate representative/manager within your organisation or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development in this area.`;
    }
    else if (overallScore >= 67 && overallScore < 107) {
        message = `It appears that you have basic knowledge of the principles and processes of Change Management. However, it seems that you may not have had the opportunity to apply your knowledge in a real-world, large-scale change project as complex as the Gold Corporation's Project Phoenix. It is likely that you have gained your knowledge through formal education or self-study, but you may have some uncertainty regarding certain aspects of the Change Management process and may need some guidance from experienced colleagues to put the knowledge into practice. 
                        If you are interested in further enhancing your skills in Change Management, we recommend reaching out to the appropriate representative/manager within your organisation or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development in this area.`;
    }
    else if (overallScore >= 0 && overallScore < 67) {
        message = `It seems that you may be new to Change Management for large-scale change projects, and have limited experience and understanding of the complexity of the full Change Management process. Common challenges when people start out in Change Management include difficulty with setting clear and measurable goals for the change, the uncertainty of how to effectively communicate and implement changes, aligning stakeholders, dealing with resistance, tracking actual progress, and managing change risk. Managing all these elements to ensure that a change initiative is completed successfully on time and within budget requires specialised skills. If you are interested in further developing your skills in Change Management, we recommend reaching out to the appropriate representative/manager within your organisation or the ChangeVerve support team. They can provide information on various practical tools and training programmes that are available to support your development in this area.`;
    }
    return message;
};
//# sourceMappingURL=resultsEmail.js.map