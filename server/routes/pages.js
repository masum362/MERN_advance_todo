import express from 'express';
import { homePage,register,login,addTodo,updateTodo, deleteTodo, getAllTodo,searchTodo,getCompletedTodo,filterWithPriority} from '../controllers/controllers.js';
import userAuth from '../middleware/authentication.js';

const router = express.Router();

router.get("/",homePage)
router.post("/register",register)
router.post("/login",login)
router.get("/getalltodo",userAuth , getAllTodo)
router.get("/completed_todo",userAuth , getCompletedTodo)
router.get("/search?:searchQuery",userAuth , searchTodo)
router.get("/priority?:priority",userAuth , filterWithPriority)
router.post("/add_todo",userAuth ,addTodo)
router.put("/update_todo/:id",userAuth ,updateTodo)
router.delete("/delete_todo/:id",userAuth ,deleteTodo)


export default router;