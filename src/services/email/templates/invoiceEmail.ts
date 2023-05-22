
export const invoiceTemplate = (name, orderNumber, date, total, qty, payment_link) => {
  // const base_url = process.env.BASE_URL !== null ? process.env.BASE_URL : "https://backend.changeverveacademy.com"
  const base_url = "https://backend.changeverveacademy.com"
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      font-family: 'Arial', sans-serif;
    }
    .container {
      width: 80%;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f8f8f8;
      color: #333;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .header h1 {
      margin: 0;
      color: #a70000;
    }
    .header h2 {
      margin: 5px 0 0;
      color: #777;
    }
    .content {
      margin: 20px 0;
    }
    .table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
    }
    .table td, .table th {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .table th {
      background-color: #a70000;
      color: white;
    }
    .footer {
      border-top: 1px solid #ddd;
      padding: 20px 0;
      text-align: center;
      color: #777;
    }
    .btn {
      display: inline-block;
      color: #fff;
      background-color: #a70000;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>ChangeVerve</h1>
    <h2>Order Confirmation</h2>
  </div>
  <div class="content">
    <p>Dear ${name},</p>
    <p>Thank you for your purchase from ChangeVerve.</p>
    <p>The following are the details of your order:</p>
    <table class="table">
      <tr>
        <th>Order Number</th>
        <td>${orderNumber}</td>
      </tr>
      <tr>
        <th>Date Ordered</th>
        <td>${date}</td>
      </tr>
      <tr>
        <th>Product</th>
        <td>${qty} x ChangeVerve Change Management Game</td>
      </tr>
      <tr>
        <th>Sub-Total</th>
        <td>${total}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td>${total}</td>
      </tr>
    
    </table>
    <a href=${base_url}/admin-setup/${payment_link} class="btn">Set up Admin</a>
  </div>
  <div class="footer">
    <p>If you have any questions or concerns, please don't hesitate to contact</p>
    </div>
    </div>
    </body>
    </html>
    `;

    return html
}
