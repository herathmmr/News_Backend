import Article from "../models/artical.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function createArticle(req, res) {
    try {
        if(isItAdmin(req)){
        const data = req.body;
        data.author =req.user.firstName;
            const  newArticle = new Article(data);
            await newArticle.save();
            res.json({message : "inquiry added successfully",
                
            });
            console.log(data)
            
        }else{
            res.status(401).json({message :"inquery add unsuccessfull"})        }

    }catch(error){
        
        res.status(500).json({message : "inquiry add failed",error : error.message});
    }
}