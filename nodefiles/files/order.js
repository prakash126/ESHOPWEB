rt = exp.Router();

// rt.get("/getorderdata/:userid", (req, res) => {
//   console.log(req.params.userid);
//   let userid = req.params.userid;
//   conn.tbl_orderdata.find({ userid: oid(userid) }, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       console.log(result);
//       res.send(result);
//     }
//   });
// });

rt.get("/getorderdata/:userId", function (req, res) {
  let uid = oid(req.params.userId);
  conn.tbl_orderdata.find({ userid: uid }, function (err, result) {
    if (err) res.send(err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});

rt.get("/getorderdata", async (req, res) => {
  var obj = [];
  await conn.tbl_oderdata.find((err, result) => {
    if (err) {
      res.send({ isData: false, msg: "No order data", err: err });
    } else {
      console.log(result);
      for (let r of result) {
        for (let prod of r.proddata) {
          obj.push({
            id: r._id,
            userid: r.userid,
            username: r.username,
            useremail: r.useremail,
            orderStatus: r.orderStatus,
            productid: prod._id,
            pname: prod.pname,
            price: prod.newprice,
            userqty: prod.uqty,
            quantity: prod.quantity,
          });
        }
      }
      res.send({ isData: true, msg: "Data found", data: obj });
    }
  });
});

rt.put("/updateorderstatus", async (req, res) => {
  console.log(req.body);
  let orderId = oid(req.body.orderid);
  let orderStatus = req.body.orderStatus;
  conn.tbl_oderdata.update(
    { _id: oid(orderId) },
    {
      $set: {
        orderStatus: orderStatus,
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: result });
      }
    }
  );
});

module.exports = rt;
