// exp=require("express")
// app=exp()
// app.listen(1000)

// const { profile } = require("console");

// mj = require("mongojs");
// conn=mj("mongodb://localhost:27017/db_project");

// crs = require("cors");
// app.use(crs());

// bp = require("body-parser");
// app.use(bp.json());

// catref=require ("./files/category")
// app.use("/catpath",catref)

// console.log(`Server started at 1000`);

exp = require("express");
app = exp();
app.listen(1000);

mj = require("mongojs");
conn = mj("mongodb://localhost:27017/ecommerce");

oid = require("mongojs").ObjectID;

crs = require("cors");
app.use(crs());

bp = require("body-parser");
app.use(bp.json());

jwt = require("jsonwebtoken");

file = require("express-fileupload");
app.use(file());

catref = require("./files/category");
app.use("/catpath", catref);

subcatref = require("./files/subcategory");
app.use("/subcatpath", subcatref);

subsubcatref = require("./files/subsubcategory");
app.use("/subsubcatpath", subsubcatref);

brandref = require("./files/brand");
app.use("/brandpath", brandref);

authref = require("./files/auth");
app.use("/authpath", authref);

productref = require("./files/product");
app.use("/productpath", productref);

regref = require("./files/registration");
app.use("/regpath", regref);

cartref = require("./files/cart");
app.use("/cartpath", cartref);

paymentref = require("./files/payment");
app.use("/paymentpath", paymentref);

profileref = require("./files/profile");
app.use("/profilepath", profileref);

orderef = require("./files/order");
app.use("/orderpath", orderef);

console.log(`Server started at 1000`);
