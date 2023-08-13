const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./Utils/sendEmail");
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const { email , companyName } = req.body;
try {
  const send_to = process.env.EMAIL_USER   ;
    const sent_from = process.env.EMAIL_USER      ;
    const reply_to = email;
    const subject = `Asking reagarding buying `;
    const message = `
    <p>Dear Sertic </p>
    <p>Please click on reply to contact me regarding the product:</p>
    
    <h5>My Email Adress: </h5>
    <p>${email}</p>
    <h5>Company Name : </h5>
    <p>${companyName}</p>
       
    `;

await sendEmail(subject, message, send_to, sent_from, reply_to);
res.status(200).json({ success: true, message: "Email Sent" });
} catch (error) {
  res.status(500).json(error.message);
}
})






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
