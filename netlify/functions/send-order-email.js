const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, orderId, name } = JSON.parse(event.body);
    if (!email || !orderId) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    const msg = {
      to: email,
      from: 'noreply@therentalwarehouse.net', // Use your verified sender
      subject: 'Order Received - The Rental Warehouse',
      html: `<p>Hi ${name || ''},</p>
             <p>Thank you for your order! We will contact you for customization. After that, you will receive an invoice to pay.</p>
             <p>Order ID: <b>${orderId}</b></p>`
    };

    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
