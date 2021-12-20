// const { connect } = require("http2");

// rt=exp.Router();

// module.exports=rt;

// rt.get("/getCategory",function(req,res){
//     conn.tbl_category.find(function(err,result){
//         if(err)
//         {
//             res.send(err);
//         }
//         else{
//             res.send(result);
//         }
//     });
// });

// rt.post("/insertCategory",function(req,res){
//     body_data = req.body_data
//     conn.tbl_category.save(body_data,function(err,result){
//         if(err){
//             res.send(err);
//         }
//         else{
//             res.send(result+"Data Inserted");
//         }
//     });
// });

rt = exp.Router();

rt.get("/getCategory", function (req, res) {
  conn.tbl_category.find(function (err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
});
// rt.post("/insertCategory",function(req,res){
// console.log(req.body)
// conn.tbl_category.save(req.body,function(err){
// if(err)
// res.send(err)
// else
// res.send({result:"Data Inserted"})
// })
// })
// module.exports=rt

rt.post("/insertCategory", function (req, res) {
  body_data = req.body;
  console.log(body_data);
  conn.tbl_category.save(body_data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: "Data Inserted" });
    }
  });
});

rt.put("/updateCategory", (req, res) => {
  console.log(req.body);
  conn.tbl_category.update(
    { _id: oid(req.body.id) },
    { $set: { catname: req.body.catname, active: req.body.active } },
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
