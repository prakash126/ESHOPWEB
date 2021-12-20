rt = exp.Router();
nm = require("nodemailer");
crypto = require("crypto");
const wbm = require("wbm");
const { sendMsg } = require("../helper/whatsappmsg");
const otpGenerator = require("otp-generator");
token = require("jsonwebtoken");

transport = nm.createTransport({
  service: "gmail",
  auth: {
    user: "prakashkumarkr96@gmail.com",
    pass: "Book@741258",
  },
});

//console.log({ transport });
rt.post("/insertregdata", (req, res) => {
  // console.log(req.body);
  body_data = req.body;

  // var myemail = crypto.createCipher("aes256", req.body.email);
  // var mystr = myemail.update("abc", "utf8", "hex");
  // mystr += myemail.final("hex");

  //console.log(mystr);
  var mypassword = crypto.createCipher("aes-128-cbc", req.body.password);
  var mystr2 = mypassword.update("abc", "utf8", "hex");
  mystr2 += mypassword.final("hex");
  //console.log({ mystr2 });
  var obj = {
    email: req.body.email,
    username: req.body.username,
    password: mystr2,
    mobile: req.body.mobile,
    Address: req.body.Address,
    pincode: req.body.pincode,
    state: req.body.state,
    active: 0,
    role: "user",
    otp: 0,
  };

  conn.tbl_reg.save(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var str = "Registration success please activate throug email";
      var mailcontent =
        "Please click on activation link <a href='http://localhost:4200/us/activate;email=" +
        req.body.email +
        "'>Click here</a>";
      transport.sendMail(
        {
          to: req.body.email,
          subject: "Activation Link",
          html: mailcontent,
          from: "prakashkumar845411@gmail.com",
        },
        function (err, result) {
          if (err) console.log({ err: err });
          else console.log(result);
        }
      );
      //whatsapp msg
      // wbm
      //   .start()
      //   .then(async () => {
      //     // const contacts = [
      //     //   { phone: req.body.mobile, name: req.body.username },
      //     // ];
      //     const phones = [req.body.mobile];
      //     const message = `Hi ${req.body.username} ! Welcome to PKS-Shop , Continue shopping with latest offer!`;
      //     console.log(phones);
      //     await wbm.send(phones, message);
      //     await wbm.end();
      //   })
      //   .catch((err) => console.log(err));
      //console.log(mailcontent);

      const message = `Welcome ${req.body.username} ! Welcome to PKS-Shop , Continue shopping with latest offer!`;
      // const sanitized_number = req.body.mobile
      //   .toString()
      //   .replace(/[- )(]/g, ""); // remove unnecessary chars from the number
      // const final_number = `91${sanitized_number.substring(
      //   sanitized_number.length - 10
      // )}`; // add 91 before the number here 91 is country code of India
      // console.log({ final_number });
      // //const number_details = client.getNumberId(final_number); // get mobile number details
      // const number_details = final_number + "@c.us";
      // console.log({ number_details });
      sendMsg(req.body.mobile, message);

      res.send({ result: str });
    }
  });
});

rt.post("/getregdata", (req, res) => {
  // console.log(req.body);
  console.log("===========================get reg data");
  //  var myemail2 = crypto.createCipher('aes256', req.body.email);
  //  var myemailEncp = myemail2.update('abc', 'utf8', 'hex')
  //  myemailEncp += myemail2.final('hex');

  //console.log(mystr);

  var mypassword2 = crypto.createCipher("aes-128-cbc", req.body.password);
  var mypwdEncp = mypassword2.update("abc", "utf8", "hex");
  mypwdEncp += mypassword2.final("hex");

  // console.log(myemailEncp);
  // console.log(mypwdEncp);

  conn.tbl_reg.find(
    { email: req.body.email, password: mypwdEncp },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        // console.log(result)
        // for(var i=0;i<result.length;i++){
        //   if((result[i].email==myemailEncp) && (result[i].password == mypwdEncp)){
        //    if(result[i].active==1){
        //     res.send({result:'success',activated:1,id:result[i]._id,username:result[i].username})
        //    }
        //    else{
        //      res.send({result:'Please activate your account through registered email'});
        //    }

        //   }
        // else{
        //   res.send({result:'Please Enter valid email or password'});
        // }

        if (result.length == 0) {
          res.send({
            result: 0,
            message: "Login Failed! Invalid email and password",
          });
        } else {
          if (result[0].active == 0) {
            res.send({
              result: 1,
              message: "Login Failed! Activate your account before login",
            });
          } else {
            var obj = {
              userid: result[0]._id,
              username: result[0].username,
              email: result[0].email,
              aut: 1,
              role: "user",
            };
            tk = token.sign(obj, "#$%ER#$", { expiresIn: "12h" });

            res.send({
              result: 2,
              message: "Login Success",
              token: tk,
            });
          }
        }
      }
    }
  );
});

rt.post("/useractivation", (req, res) => {
  //console.log(req.body);
  conn.tbl_reg.update(req.body, { $set: { active: 1 } });
  res.send({ result: "activate" });
});

rt.put("/forgetpassword", (req, res) => {
  console.log(req.body.email);
  conn.tbl_reg.find({ email: req.body.email }, (err, result) => {
    console.log(result);
    if (err) {
      res.send("Email not found");
    } else {
      const otp = otpGenerator.generate(6, {
        alphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      conn.tbl_reg.findAndModify(
        {
          query: { _id: result[0]._id },
          update: { $set: { otp: otp } },
          new: true,
        },
        (otperr, otpres) => {
          if (otperr) {
            res.send({ otperr: otperr, msg: "Otp not updated!" });
          } else {
            //console.log(otpres);
            var str = "Otp for reset password";
            var mailcontent = `<h4>Please use this otp - ${otp} to reset your password</h4>`;
            transport.sendMail(
              {
                to: result[0].email,
                subject: str,
                html: mailcontent,
                from: "prakashkumar845411@gmail.com",
              },
              function (err, result) {
                if (err) console.log({ err: err });
                else {
                  console.log(result);
                  res.send({ data: otpres, msg: "Otp send" });
                }
              }
            );
          }
        }
      );
    }
  });
});

rt.put("/updatepassword", (req, res) => {
  let { id, updatepwd, otp } = req.body;
  var mypassword = crypto.createCipher("aes-128-cbc", updatepwd);
  var mystr2 = mypassword.update("abc", "utf8", "hex");
  mystr2 += mypassword.final("hex");
  console.log(req.body);
  console.log({ mystr2 });
  conn.tbl_reg.findAndModify(
    {
      query: { _id: oid(id), otp: otp },
      update: { $set: { password: mystr2 } },
      new: true,
    },
    (err, result) => {
      if (err) {
        res.send({ err: err, msg: "Password not updated" });
      } else {
        if (otp === result.otp) {
          res.send({ result: result, msg: "Password updated successfully" });
        } else {
          res.send({
            err: err,
            msg: "Otp not matched! Please enter correct one.",
          });
        }
      }
    }
  );
});

module.exports = rt;

//https://github.com/sudheerj/angular-interview-questions#what-is-angular-framework
