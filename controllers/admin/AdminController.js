const UserModel = require("../../modules/user");


class AdminController {
  static dashboard = async (req, res) => {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static display = async (req, res) => {
    try {
      const data = await UserModel.find();
      // console.log(data)
      res.render("admin/display", { d: data });
    } catch (error) {
      console.log(error);
    }
  };
  static Adduser = async (req, res) => {
    try {
      res.render("admin/Adduser");
    } catch (error) {
      console.log(error);
    }
  };
  static viewUser = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id);
      // console.log(data)
      res.render("admin/viewUser", { d: data });
    } catch (error) {
      console.log(error);
    }
  };
  static editUser = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id);
      // console.log(data)
      res.render("admin/editUser", { d: data });
    } catch (error) {
      console.log(error);
    }
  };
  static UserUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const { n, e, p } = req.body;
      const data = await UserModel.findByIdAndUpdate(id, {
        name: n,
        email: e,
        password: p,
      });
      res.redirect("/admin/studentDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static DeleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await UserModel.findByIdAndDelete(id);
      res.redirect("/admin/studentDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static userInsert = async (req, res) => {
    try {
      //console.log(req.files.image)
      const file  = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
        folder:"userimage"
      })
      console.log(imageUpload)
      const { n, e, p } = req.body;
      const result = new UserModel({
        name: n,
        email: e,
        password: p,
        image:{
          public_id:imageUpload.public_id,
          url:imageUpload.secure_url
        }
     });
      await result.save();
      res.redirect("/");         //router ka url
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
