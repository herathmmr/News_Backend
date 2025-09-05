import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req, res) {
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password,10);

    const newUser = new UserModel(userData);

    newUser.save()
        .then(() => {
            res.status(201).json({
                message: "User added successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "User registration failed",
                error: error.message
            });
        });
}
export function loginUser(req,res){

    const userData=req.body;
    UserModel.findOne({
    
        email : userData.email

    }).then((user)=>{
        if(user==null){
            res.status(404).json({
                error:"user not found"
            })
        }
        else{
            
            const isPasswordCorrect = bcrypt.compareSync(userData.password,user.password);
            if(isPasswordCorrect){

                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture:user.profilePicture, 
                    phone : user.phone,      
                                      },process.env.SECRET_KEY) 
                res.json({message :" login successfull",token:token,user:user});
            }else{
                res.status(404).json({error:"login fail"})
            }
        }
    })
}
export function isItAdmin(req){
    
    let isAdmin = false;
    if(req.user != null && req.user.role == "admin"){
        return isAdmin = true;
    }
    return isAdmin;
}
export function isItCustomer(req){

let isCustomer = false;
if(req.user != null && req.user.role == "customer"){
    return isCustomer = true;
}return isCustomer;}

export async function getAllUsers(req,res){
    try{
        if(isItAdmin(req)){
            const users = await UserModel.find()
            res.json(users)

        }else{
            res.json({message : "your not authorize"})
        }
    }catch(error){
         res.json({ message: "failed to get users", error: error.message });
    }
}

/*export async function BlockOrUnblock(req, res) {
  const email = req.params.email; 

  try {
    if (isItAdmin(req)) {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isBlocked = !user.isBlocked;

      await UserModel.updateOne(
        { email },
        { $set: { isBlocked } }
      );

      return res.json({
        message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
        user: { email, isBlocked }
      });
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
}*/
