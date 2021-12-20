// rt = exp.Router()

// rt.post("/chklogin",(req,res)=>{
//     conn.tbl_admin.find(req.body,(err,result)=>{
//         if(result.length == 0 ){
//           // console.log('hi fail');
//             res.send({login:"fail"})
//         }
//         else{
//             payload={
//                 uname:result[0].uname,role:result[0].role,auth:1
//             }

//             var token = jst.sign(payload,"$%#$^%$")
//            // console.log(token);
//             res.send({login:"success",data:token})
//         }
//     })
// })

// module.exports = rt;\

rt = exp.Router();

rt.post("/chklogin", (req, res) => {
  console.log(req.body);
  conn.tbl_admin.find(req.body, (err, result) => {
    console.log(result);
    if (result.length == 0) {
      res.send({ login: "fail" });
    } else {
      payload = {
        un: result[0].uname,
        role: result[0].role,
        auth: 1,
      };
      var tok = jwt.sign(payload, "$%#$^%^$");
      res.send({ login: "success", data: tok });
    }
  });
});
module.exports = rt;
