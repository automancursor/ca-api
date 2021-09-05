var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    auth: {
        user: 'cvadreams', // generated ethereal user
        pass: 'Hell0Camps1#', // generated ethereal password
    },
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/email', async function (req, res, next) {
    let {toAddress, context, subject} = req.body
    let info = await transporter.sendMail({
        from: 'cvadreams@gmail.com', // sender address
        to: toAddress, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: context
    })
    return res.status(200).send(info)
})
module.exports = router;
