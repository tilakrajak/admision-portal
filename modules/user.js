const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        Require:true,
    },
    email:{
        type:String,
        Require:true,
    },
    password:{
        type:String,
        Require:true,
    },
    image:{
        public_id:{
            type:String,
            Require:true,
        },
        url:{
            type:String,
            Require:true,
        }
    }
     
})

const UserModel = mongoose.model('user',UserSchema)
module.exports = UserModel