import express from "express";
import {createUser, deleteUser, updateUser,getUser, getUsers} from "../controllers/user.js"; 
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router =express.Router();

// router.get("/checkauthentication",verifyToken,(removeEventListener,res,next)=>{
//     res.send("hello user, you are logged in ");
// });

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete all account");
// });


//create
//used async because it is going to connect to database
router.post("/", createUser);

//update
router.put("/:id",verifyUser,updateUser);


//delete
router.delete("/:id", verifyUser,deleteUser);
//get
router.get("/:id", verifyUser,getUser);
//getAll

router.get("/",verifyAdmin ,getUsers);



export default router;