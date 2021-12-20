const { connect } = require("http2");

rt = exp.Router();

rt.post("/getmyprofiledata", function (req, res) {
  userid = oid(req.body.userid);
  conn.tbl_reg.find({ _id: userid }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

rt.put("/updateprofile", (req, res) => {
  //console.log(req.body);
  let id = oid(req.body.userid);
  var obj = {
    email: req.body.email,
    username: req.body.username,
    mobile: req.body.mobile,
    Address: req.body.Address,
    pincode: req.body.pincode,
    state: req.body.state,
  };
  conn.tbl_reg.findAndModify(
    {
      query: { _id: oid(id) },
      update: {
        $set: {
          email: obj.email,
          username: obj.username,
          mobile: obj.mobile,
          Address: obj.Address,
          pincode: obj.pincode,
          state: obj.state,
        },
      },
      new: true,
    },
    (err, result) => {
      if (err) {
        res.send({ err: err, msg: "Profile not updated" });
      } else {
        res.send({ result: result, msg: "Profile updated successfully" });
      }
    }
  );
});

module.exports = rt;
