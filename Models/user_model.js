// import mongoose from "mongoose";
import { mongoose ,Schema,model } from "mongoose";
import validator from "validator";

// creating user schema
const user_schema =new Schema({
    Name :{
        type : String,
        require :true,
    },
    Email:{
        type:String,
        require: true,
        unique: true,
        validate : validator.isEmail  //validator to check the input is email or not
    },
    password:{
       type : String,
       require: true
    }
})
const Users = model('Users',user_schema)
export default Users;