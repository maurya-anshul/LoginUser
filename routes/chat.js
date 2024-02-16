const express= require('express');
const fs=require('fs');
const router=express.Router();

router.get('/', (req, res, next) => {
    fs.readFile("message.txt", (err, data) => {
      if (err) {
        data = "no data exit";
      }
      res.send(`<p>${data}</p>
      <form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
      <input id="message" type="text" name="message" placeHolder="message">
      <input type="hidden" name="username" id="username">
      <button type="submit">send</button>
  </form>`);
    });
  });
  router.post('/', (req, res, next) => {
    console.log(req.body.message);
    if (req.body.message) {
      fs.appendFile(
        "message.txt",
        `${req.body.username}: ${req.body.message}`,
        (err, data) => {
          if(err) console.log(err);
          else res.redirect('/')
        }
      );
    } else {
      res.redirect("/");
    }
  });
  module.exports=router;