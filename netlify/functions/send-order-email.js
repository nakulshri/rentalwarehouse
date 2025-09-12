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
      from: 'therentalwarehouse1@gmail.com', // Updated sender email
      subject: 'Order Confirmation - The Rental Warehouse',
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 2rem;">The Rental Warehouse</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0.5rem 0 0;">Premium Event Rentals</p>
          </div>
          
          <div style="padding: 2rem; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #4F46E5; margin-top: 0;">Thank you for your order, ${name || 'Valued Customer'}!</h2>
            <p style="font-size: 1.1rem; line-height: 1.6;">
              We have received your order <strong>#${orderId}</strong> and our team is excited to help make your event memorable.
            </p>
            
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #4F46E5;">
              <h3 style="color: #4F46E5; margin-top: 0;">What happens next?</h3>
              <ul style="margin: 0; padding-left: 1.2rem; color: #374151;">
                <li>We will reach out to you soon to discuss any customization or special requirements for your order.</li>
                <li>Once details are confirmed, you will receive an invoice with payment instructions.</li>
                <li>After payment, we'll process and deliver your order promptly.</li>
              </ul>
            </div>
            
            <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border: 1px solid #d1fae5;">
              <h3 style="color: #059669; margin-top: 0;">Contact Information</h3>
              <p style="margin: 0.5rem 0; color: #374151;"><strong>Phone:</strong> (559) 552-3768</p>
              <p style="margin: 0.5rem 0; color: #374151;"><strong>Email:</strong> therentalwarehouse1@gmail.com</p>
              <p style="margin: 0.5rem 0; color: #374151;"><strong>Address:</strong> 641 Walnut Dr, Fowler, CA 93625</p>
            </div>
            
            <p style="color: #6b7280; margin-top: 2rem;">
              If you have any questions, reply to this email or contact us using the information above.
            </p>
            
            <div style="margin-top: 2em; padding-top: 2em; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 0.9rem; text-align: center;">
              <p>Thank you for choosing The Rental Warehouse.</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p style="margin-top: 1rem;">Premium event rentals • Professional service • Memorable experiences</p>
            </div>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
