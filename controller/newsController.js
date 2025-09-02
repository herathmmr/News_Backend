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
export async function getAllNews(req, res) {
    try {
        if (isItCustomer(req) || isItAdmin(req)) {
            
            const news = await News.find().sort({ createdAt: -1 });
            res.json(news);
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        res.status(500).json({ message: "fetching news failed", error: error.message });
    }
}

export async function deleteNews(req,res){
    try{
        const id= req.params.articleId;
        if(isItAdmin(req)){
            const news = await News.findOne({articleId:id})
            if(news == null){
                res.json({message :" news article  not found"})
                return;
              
            }else{
                 await News.deleteOne({articleId:id})
                res.json({message : "delete successfully"})
    }
       
        }else{
            res.json({message : " your not authorize to perform this"})
        }
        
       

    }catch(error){
        res.status(500).json({message :"News delete failed",error : error.message})

    }
}