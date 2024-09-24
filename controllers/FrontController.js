const UserModel = require("../modules/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dawjokma2",
  api_key: "927489688623582",
  api_secret: "PQMaqV7e_7S-jWKLwzRAecwP08g", // Click 'View API Keys' above to copy your API secret
});

class FrontController {
  static home = async (req, res) => {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      res.render("login", {
        mssage: req.flash("success"),
        msg1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };

  //user insert
  static userInsert = async (req, res) => {
    try {
      // console.log(req.files.image)
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userimage",
      });
      console.log(imageUpload);
      const { n, e, p } = req.body;
      const user = await UserModel.findOne({ email: e });
      //console.log(user)
      if (user) {
        req.flash("error", "email already Exist");
        res.redirect("/register");
      } else {
        if (n && e && p) {
          const hashpassword = await bcrypt.hash(p, 10);
          const result = new UserModel({
            name: n,
            email: e,
            password: hashpassword,
            image: {
              public_id: imageUpload.public_id,
              url: imageUpload.secure_url,
            },
          });
          await result.save();
          req.flash("success", "Register succesfully Insert please login");
          res.redirect("/");
        } else {
          req.flash("error", "All fields are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //verifylogin user
  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (isMatch) {
          
          res.redirect("/home");
        } else {
          req.flash("error", "your email or password is not match");
          res.redirect("/");
        }
      } else {
        req.flash("error", "you are not register user ,please register");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  };




}
module.exports = FrontController;
