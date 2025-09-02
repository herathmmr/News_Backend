import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
email:{
    type : String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
},

password: {
    type : String,
    required : true,
    unique : true,
},
role :{
    type: String,
    enum: ['customer', 'admin'],
    required : true,
    default :"customer"
},

firstName :{
    type :String,
    required:true,
},
lastName : {
    type : String,
    required: true,
},

address : {
    type :String,
    required :true,
},

phone : {
    type : String,
    required :true,
},
profilePicture:{
    type : String,
    required : true,
    default : "https://images.app.goo.gl/kP5SNwBts5ZFh5UJA"
}

});
const UserModel =mongoose.model("users",userSchema);


export default UserModel;



