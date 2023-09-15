const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9600
const nodemailer = require('nodemailer');

require("dotenv").config()

app.use(express.json());
app.use(cors({ origin: '*' }));


app.get("/", (req, res) => {
    res.send("Rasco")
})

app.post("/api/message", async (req, res) => {

    let { name, phone, gmail, message } = req.body

    try {
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.PASS_EMAIL_ADMIN
            }
        });

        let info = {
            from: process.env.EMAIL_ADMIN,
            to: process.env.EMAIL_ADMIN,
            subject: `New Message from ${name} form website Cybexplor`,
            html: `

            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
    * {
        padding: 0px;
        margin: 0px;
        border: none;
        outline: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
        font-family: "Inter", sans-serif;
    }
    a{
        color: #ffffff !important;
    }
    body {
        height: 100vh;
        background: #16171b;
    }

    .parent {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        text-align: center;
        width: 95%;
        max-width: 630px;
        background: #1f2125;
        padding: 110px 20px;
        border-radius: 25px;
        border: 0.5px solid #4D525C;
        position: relative;
        margin: auto;
    }

    .card {
        margin: auto;
        max-width: 620px;
        color: white;
    }

    .p-message {
        line-height: 24px;
        margin: 10px auto;
    }

    .h1-text {
        font-size: 66px;
        color: #f05255;
        margin-bottom: 10px;
    }

    @media (max-width: 700px) {
        .h1-text {
            font-size: 36px;
        }
    }

    .footer-message {
        padding: 20px;
        position: absolute;
        bottom: -10px;
        background-color: #1f2125;
        left: 50%;
        transform: translateX(-50%);
        width: 95%;
        border-radius: 45px 45px 0 0;
        z-index: 5;
        color: white;
        line-height: 23px;
        bottom: -110px;
        transition: 0.3s;
    }

    .email-phone-div {
        display: flex;
        align-items: center;
        width: 100%;
        margin: auto;
        justify-content: center;
        gap: 10px;
    }

    .icon-a-card {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1f2125;
        border-radius: 50%;
        transition: 0.3s;
    }

    .icon-a-card:hover {
        transform: scale(1.1);
    }

    .icon-a-card img {
        height: 24px;
    }
</style>
    <!-- ======================== Google Font ======================== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
</head>

<body>
    <div class="parent">
        <div class="container">
            <div class="card">

                <h1 class="h1-text">Cybexplor</h1>
                <h2 class="p-message">
                    ${name}
                </h2>
                <p class="p-message">
                   ${message}
                </p>
            </div>
            <p class="footer-message">
                From : <b>${name}</b> | Email : <b>
                    <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=${gmail}"
                        target="_blank" rel="noopener noreferrer">${gmail}</a>
                </b> | Number : <b>
                    <a target="_blank" href={"https://wa.me/${phone}"}>
                        +201011653271
                    </a>
                </b>
            </p>
        </div>
    </div>


</body>

</html>
`
        };

        mailTransporter.sendMail(info, async (err) => {
            if (err) {
                console.log(err);
            }
        });

        res.send({ success: "Thank You For Concat Us" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed To Send Message" });
    }

})


app.listen(PORT, () => {
    console.log("Server listening on port");
})