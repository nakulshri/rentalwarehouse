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
      subject: 'Order Confirmation - The Rental Warehouse',
      html: `
        <div style="font-family: Arial, sans-serif; color: #222;">
          <h2 style="color: #4F46E5;">Thank you for your order, ${name || 'Valued Customer'}!</h2>
          <p>
            We have received your order <b>#${orderId}</b> and our team is excited to get started.<br>
            <br>
            <b>What happens next?</b><br>
            - We will reach out to you soon to discuss any customization or special requirements for your order.<br>
            - Once details are confirmed, you will receive an invoice with payment instructions.<br>
            - After payment, we’ll process and deliver your order promptly.
          </p>
          <p>
            If you have any questions, reply to this email or contact us at <a href="mailto:support@therentalwarehouse.net">support@therentalwarehouse.net</a>.
          </p>
          <p style="margin-top:2em; color:#888; font-size:13px;">
            Thank you for choosing The Rental Warehouse.<br>
            <b>Order ID:</b> ${orderId}
          </p>
        </div>
      `
    };

    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
