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
        
            
            const news = await News.find().sort({ createdAt: -1 });
            res.json(news);
        
        
    } catch (error) {
        res.status(500).json({ message: "fetching news failed", error: error.message });
    }
}

export async function deleteNews(req,res){
    try{
        const id= req.params.id;
        if(isItAdmin(req)){
            const news = await News.findOne({id:id})
           
                 await News.deleteOne({id:id})
                res.json({message : "delete successfully"})
    
       
        }else{
            res.json({message : " your not authorize to perform this"})
        }
        
       

    }catch(error){
        res.status(500).json({message :"News delete failed",error : error.message})

    }
}

export async function updateNews(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        if (isItAdmin(req)) {
            
            const result = await News.updateOne({ id: id }, data);
           
            res.json({ message: "news article update successfully" });
        } else {
            res.status(403).json({
                message: "you are not authorize to access this action"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "news article update fail", error: error.message });
    }
}