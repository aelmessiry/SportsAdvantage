import axios from 'axios';


const SENDGRID_API = 'https://7rq9tbjtf0.execute-api.us-east-1.amazonaws.com'


export async function sendNewUserEmail(recipient: string, amount: string, token: string): Promise<void> {
    
const emailSubject = 'Congratulations! You have received tokens in your Horus Wallet';

  const emailContent = `
    <h1>Congratulations!</h1>
    <p>We are pleased to inform you that you have received ${amount} ${token} tokens in your Horus Wallet. To claim them, please <a href="https://horuswallet.com/">sign in</a> to your account. If you have any questions or need assistance, feel free to contact our support team.</p>
    <p>Best regards,</p>
    <p>The Horus Wallet Team</p>
  `;
    
    const path = '/sendEmail'
    

  try {
    const response = await axios.post(SENDGRID_API + path, {
      toEmail: recipient,
    subject: emailSubject,
      emailText: emailContent
    });

    if (response.status === 200) {
      console.log('Email sent successfully');
    } else {
      console.error('Email sending failed', response.status, response.data);
    }
  } catch (error) {
    console.error('Error sending email', error);
  }
}

