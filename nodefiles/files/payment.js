rt = exp.Router();

request = require("request");

rt.post("/getpaymentlink", (req, res) => {
  console.log(oid(req.body.uid));
  uid = oid(req.body.uid);
  conn.tbl_prodcartdata.find({ userid: uid }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      //console.log(result)
      var total = 0;
      for (var i = 0; i < result.length; i++) {
        total += result[i].newprice * result[i].uqty;
      }
      var headers = {
        "X-Api-Key": "28c645727c22790dd2f97e607c2bb42b",
        "X-Auth-Token": "b15b740361587bb5fb0a259bde09e217",
      };
      var payload = {
        purpose: "ShopKart",
        amount: 9,
        phone: "9470287134",
        buyer_name: "Prakash Kumar",
        redirect_url: "http://localhost:4200/us/payment",
        send_email: true,
        webhook: "http://www.example.com/webhook/",
        send_sms: true,
        email: "prakashkumarkr96@gmail.com",
        allow_repeated_payments: false,
      };

      request.post(
        "https://www.instamojo.com/api/1.1/payment-requests/",
        { form: payload, headers: headers },
        function (error, response, body) {
          if (!error && response.statusCode == 201) {
            rtndata = JSON.parse(body);
            url = rtndata.payment_request.longurl;
            console.log(url);
            // console.log("hi")
            res.send({ url });
          }
        }
      );
    }
  });
});

rt.post("/sendoderdata", function (req, res) {
  prodcart_data = req.body.proddata;
  // console.log(body_data.length);

  // for(var i = 0;i<prodcart_data.length;i++){

  var obj = {
    userid: oid(req.body.userid),
    username: req.body.username,
    useremail: req.body.useremail,
    orderStatus: "Recieved",
    proddata: prodcart_data,
  };

  //}
  console.log(obj);

  conn.tbl_oderdata.save(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Data Inserted" });
    }
  });
});

rt.get("/ordersdata/:userid", async (req, res) => {
  await conn.tbl_oderdata.find(
    { userid: oid(req.params.userid) },
    (err, result) => {
      if (err) {
        res.send({ isData: false, msg: "No order data", err: err });
      } else {
        console.log(result);
        res.send({ isData: true, msg: "Data found", data: result });
      }
    }
  );
});

rt.get("/getOrderDataById/:id", async (req, res) => {
  await conn.tbl_oderdata.find({ _id: oid(req.params.id) }, (err, result) => {
    if (err) {
      res.send({ isData: false, msg: "No order data", err: err });
    } else {
      console.log(result);
      res.send({ isData: true, msg: "Data found", data: result });
    }
  });
});

module.exports = rt;

// http://localhost:4200/us/payment?payment_id=MOJO1c07005D59637330&payment_status=Credit&payment_request_id=b01f8ba9b9cf4faeb5435c432a4284af

// http://localhost:4200/us/payment?payment_id=MOJO1c09905D32063736&payment_status=Credit&payment_request_id=ee12ab6d2b0c4260b1a27f7acac72794

// http://localhost:4200/us/payment?payment_id=MOJO1c09E05D32064271&payment_status=Credit&payment_request_id=bd4d441668274af89d85df1686da97bb
