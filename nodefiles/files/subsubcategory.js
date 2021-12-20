rt = exp.Router();

//getting data
rt.get("/getSubSubCategoryData", (req, res) => {
  conn.tbl_subsubcat.aggregate(
    [
      {
        $lookup: {
          from: "tbl_subcat",
          localField: "subcatid",
          foreignField: "_id",
          as: "subcatdata",
        },
      },
      { $unwind: "$subcatdata" },
    ],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
});

// inserting data
rt.post("/insSubSubcat", function (req, res) {
  console.log(req.body);
  conn.tbl_subsubcat.save({
    subsubcatname: req.body.subsubcatname,
    active: req.body.active,
    subcatid: oid(req.body.subcatid),
  });
  console.log({
    subsubcatname: req.body.subsubcatname,
    active: req.body.active,
    subcatid: oid(req.body.subcatid),
  });
  res.send({ result: "Inserted" });
});

rt.put("/updateSubSubcategory", (req, res) => {
  // console.log(req.body);
  conn.tbl_subsubcat.update(
    { _id: oid(req.body.id) },
    {
      $set: {
        subsubcatname: req.body.subsubcatname,
        subcatid: oid(req.body.subcatid),
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ result: "data updated" });
      }
    }
  );
});
module.exports = rt;
