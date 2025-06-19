const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const {
        name,
        email,
        phone,
        nationality,
        pickupPlace,
        destination,
        people,
        travelDate,
        vacationType,
        carType,
        message
    } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New Travel Enquiry Form Submission',
        text: `
New Travel Enquiry Submitted:

Full Name: ${name}
Email: ${email}
Phone: ${phone}
Nationality: ${nationality}
Pick-up Place: ${pickupPlace}
Destination: ${destination}
No. of People: ${people}
Travel Date: ${travelDate}
Type of Vacation: ${vacationType}
Preferred Car Type: ${carType}

Additional Message:
${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
