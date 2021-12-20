rt = exp.Router();

rt.post("/insertcartdata", (req, res) => {
  //console.log("hi................")

  //console.log(req.body);
  var obj = {
    userid: oid(req.body.userid),
    prodid: oid(req.body.prodid),
    pname: req.body.pname,

    catid: oid(req.body.catid),
    subcatid: oid(req.body.subcatid),
    subsubcatid: oid(req.body.subsubcatid),
    brandid: oid(req.body.brandid),
    pcolor: req.body.pcolor,
    oldprice: req.body.oldprice,
    newprice: req.body.newprice,
    quantity: req.body.quantity,
    rating: req.body.rating,
    offer: req.body.offer,
    size: req.body.size,
    ptype: req.body.ptype,
    pimage: req.body.pimage,
    uqty: req.body.uqty,
  };
  //console.log(body_data)
  conn.tbl_prodcartdata.save(obj, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "inserted" });
    }
  });
});

module.exports = rt;
