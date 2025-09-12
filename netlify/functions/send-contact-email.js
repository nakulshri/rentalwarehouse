const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body);
    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    const msg = {
      to: 'therentalwarehouse1@gmail.com', // destination Gmail
      from: 'noreply@therentalwarehouse.net', // send as noreply address (must be verified in SendGrid)
      replyTo: email, // so replies go to the visitor's email
      subject: `Website contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<div style="font-family: Arial, sans-serif; line-height:1.4">
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      </div>`
    };

    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
