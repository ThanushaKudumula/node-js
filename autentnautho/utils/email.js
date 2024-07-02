const nodemailer=require('nodemailer');
const sendPasswordResetEmail = async (options)=>{
   
        // Create a transporter using Gmail service
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        const mailOptions = {
            from: 'thanusha@synergytechs.net',
            to: options.email,
            subject:options.subject,
            text: options.message,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
};

module.exports = sendPasswordResetEmail;

