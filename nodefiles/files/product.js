rt = exp.Router();

rt.post("/insertproduct", (req, res) => {
  // console.log(req.body);
  // var file_cont=req.files.f1
  //         dt=new Date()
  //         var fname=dt.getTime()+req.files.f1.names

  body_data = {
    pname: req.body.pname,
    catid: oid(req.body.catid),
    subcatid: oid(req.body.subcatid),
    subsubcatid: oid(req.body.subsubcatid),
    brandid: oid(req.body.brandid),
    pcolor: req.body.pcolor,
    oldprice: req.body.oldprice,
    newprice: req.body.newprice,
    quantity: req.body.quantity,
    description: req.body.description,
    rating: req.body.rating,
    offer: req.body.offer,
    size: req.body.size,
    ptype: req.body.ptype,
  };

  conn.tbl_product.save(body_data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      // file_cont.mv("../src/product_images/"+fname)
      // res.redirect("http://localhost:4200/ad/products;name="+fname)
      res.send({ result: "Data Inserted" });
    }
  });
});

rt.post("/insertproductimg", (req, res) => {
  var pro_images = [];
  if (req.files.f1.length > 1) {
    for (var i = 0; i < req.files.f1.length; i++) {
      // fname=req.files.f1[i].name;
      file_cont = req.files.f1[i];
      dt = new Date();
      var fname = dt.getTime() + req.files.f1[i].name;
      pro_images.push(fname);
      file_cont.mv("../src/assets/product_images/" + fname);
    }
  } else {
    var file_cont = req.files.f1;
    // console.log(req.files);
    dt = new Date();
    var fname = dt.getTime() + req.files.f1.name;
    pro_images.push(fname);
    file_cont.mv("../src/assets/product_images/" + fname);
  }
  conn.tbl_product
    .find()
    .sort({ _id: -1 })
    .limit(1, function (err, result) {
      rwid = result[0]._id;
      conn.tbl_product.update(
        { _id: oid(rwid) },
        { $set: { pimage: pro_images } }
      );
      res.redirect("http://localhost:4200/ad/products;name=" + fname);
    });
});

rt.get("/getproductdata", (req, res) => {
  conn.tbl_product.find(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //console.log(result);
      res.send(result);
    }
  });
});

rt.post("/getproduct_subsubid", (req, res) => {
  conn.tbl_product.find(
    { subsubcatid: oid(req.body.subsubcatid) },
    function (err, result) {
      if (err) res.send(err);
      else res.send(result);
    }
  );
});

rt.post("/getproductinfo_productid", (req, res) => {
  //console.log(req.body.productid)
  conn.tbl_product.find(
    { _id: oid(req.body.productid) },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        //console.log(result)
        res.send(result);
      }
    }
  );
});

rt.post("/getproductbname_bid", (req, res) => {
  //console.log(req.body.brandid)
  conn.tbl_product.aggregate(
    [
      {
        $lookup: {
          from: "tbl_brand",
          localField: "brandid",
          foreignField: "_id",
          as: "branddata",
        },
      },
      { $unwind: "$branddata" },
    ],
    (err, result) => {
      if (err) res.send(err);
      //console.log(result);
      else res.send(result);
    }
  );
});

// Product data for silder1

rt.get("/getsilder1info", (req, res) => {
  conn.tbl_product.find().limit(6, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
rt.get("/getsilder2info", (req, res) => {
  conn.tbl_product
    .find()
    .sort({ _id: -1 })
    .limit(-6, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

rt.post("/getsilderminmax", (req, res) => {
  //console.log(req.body.slider_value);
  conn.tbl_product
    .find({
      subsubcatid: oid(req.body.subsubcatid),
      newprice: { $lte: req.body.slider_value },
    })
    .sort({ newprice: 1 }, function (err, result) {
      console.log(result);
      if (err) res.send(err);
      else {
        res.send(result);
      }
    });
});

rt.post("/getsearch_data", (req, res) => {
  //console.log(req.body);
  conn.tbl_product
    .find({ pname: { $regex: req.body.txt } }, { _id: 1, pname: 1 })
    .limit(5, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

// send prodcartdata to table
rt.post("/senprodcartdatatotable", (req, res) => {
  //console.log(req.body);
  var obj = {
    userid: oid(req.body.userid),
    prodid: oid(req.body.productdata._id),
    pname: req.body.productdata.pname,

    catid: oid(req.body.catid),
    subcatid: oid(req.body.productdata.subcatid),
    subsubcatid: oid(req.body.productdata.subsubcatid),
    brandid: oid(req.body.productdata.brandid),
    pcolor: req.body.productdata.pcolor,
    oldprice: req.body.productdata.oldprice,
    newprice: req.body.productdata.newprice,
    quantity: req.body.productdata.quantity,
    rating: req.body.productdata.rating,
    offer: req.body.productdata.offer,
    size: req.body.productdata.size,
    ptype: req.body.productdata.ptype,
    pimage: req.body.productdata.pimage,
    uqty: 1,
  };
  //console.log(obj)
  conn.tbl_prodcartdata.save(obj, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Inserted" });
    }
  });
});

rt.get("/getcartdetails", (req, res) => {
  conn.tbl_prodcartdata.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
rt.get("/getcartdetailbyuserid/:userid/:prodid", (req, res) => {
  let { userid, prodid } = req.params;
  console.log("getcartdetailbyuserid " + userid);
  console.log("getcartdetailbyuserid " + prodid);
  conn.tbl_prodcartdata.find(
    { prodid: oid(prodid), userid: oid(userid) },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// rt.put("/updatecartqty/:cartid", (req, res) => {
//   //let cartid = req.params;
//   console.log("updatecartqty " + cartid);
//   console.log("updatecartqty " + req.body.uqty);
//   // conn.tbl_prodcartdata.update(
//   //   { _id: oid(cartid) },
//   //   {
//   //     $set: {
//   //       uqty: req.body.uqty,
//   //     },
//   //   },
//   //   (err, result) => {
//   //     if (err) {
//   //       res.send(err);
//   //     } else {
//   //       res.send(result);
//   //     }
//   //   }
//   // );
// });

rt.put("/updatecartqty", (req, res) => {
  //console.log(req.body);
  let cartid = req.body.cartid;
  let uqty = req.body.uqty;
  console.log({ cartid });
  console.log({ uqty });
  conn.tbl_prodcartdata.update(
    { _id: oid(cartid) },
    {
      $set: {
        uqty: uqty,
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

rt.get("/deletecartdetails", (req, res) => {
  conn.tbl_prodcartdata.remove((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Deleted" });
    }
  });
});
rt.delete("/removeitemfromcart/:id", (req, res) => {
  console.log(req.params.id);
  conn.tbl_prodcartdata.remove({ _id: oid(req.params.id) }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Deleted" });
    }
  });
});

module.exports = rt;
