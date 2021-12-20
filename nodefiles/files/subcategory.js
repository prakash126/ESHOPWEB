rt = exp.Router();

rt.get("/getsubcat", function (req, res) {
  conn.tbl_subcat.aggregate(
    [
      {
        $lookup: {
          from: "tbl_category",
          localField: "catid",
          foreignField: "_id",
          as: "catdata",
        },
      },
      { $unwind: "$catdata" },
    ],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
});

rt.post("/inssubcat", (req, res) => [
  // console.log(req.body),
  conn.tbl_subcat.save({
    subcatname: req.body.subcatname,
    active: req.body.active,
    catid: oid(req.body.catid),
  }),
  // console.log({subcatname:req.body.subcatname,catid:oid(req.body.catid)}),
  res.send({ result: "Inserted" }),
]);

rt.put("/updateSubcategory", (req, res) => {
  console.log(req.body);
  conn.tbl_subcat.update(
    { _id: oid(req.body.id) },
    { $set: { subcatname: req.body.subcatname, catid: oid(req.body.catid) } },
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
