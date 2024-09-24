const express = require("express");
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/admin/AdminController");
const route = express.Router();

//frontcontroller route
route.get("/home", FrontController.home);
route.get("/about", FrontController.about);
route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/contact", FrontController.contact);

//user insert
route.post("/userInsert",FrontController.userInsert);
route.post("/verifyLogin",FrontController.verifyLogin);
route.get('/logout',FrontController.logout)


//admincontroller
route.get("/admin/dashboard", AdminController.dashboard);
route.get("/admin/studentDisplay", AdminController.display);
route.get("/admin/Adduser", AdminController.Adduser);
route.get("/admin/viewUser/:id", AdminController.viewUser);
route.get("/admin/editUser/:id", AdminController.editUser);
route.post("/admin/UserUpdate/:id", AdminController.UserUpdate);
route.get("/admin/DeleteUser/:id", AdminController.DeleteUser);
route.post("/admin/userInsert",AdminController.userInsert)




module.exports = route;
