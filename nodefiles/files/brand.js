rt = exp.Router();

rt.post("/insertBrand", (req, res) => {
  //console.log(req.body);
  body_data = req.body;
  conn.tbl_brand.save(body_data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Data Inserted" });
    }
  });
});

rt.get("/getbdata", function (req, res) {
  conn.tbl_brand.find(function (err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
});

rt.put("/upbranddata", (req, res) => {
  console.log(req.body);
  conn.tbl_brand.update(
    { _id: oid(req.body.id) },
    { $set: { bname: req.body.bname, active: req.body.active } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send({ result: "Data Updated" });
      }
    }
  );
});

module.exports = rt;
