import News from "../models/news.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function createNews(req, res) {
    try {
        if(isItAdmin(req)){
        const data = req.body;
        data.author =req.user.firstName;
            const  newNews = new News(data);
            await newNews.save();
            res.json({message : "News added successfully",
                
            });
            console.log(data)
            
        }else{
            res.status(401).json({message :" News add unsuccessfull"})        }

    }catch(error){
        
        res.status(500).json({message : "News add failed",error : error.message});
    }
}


