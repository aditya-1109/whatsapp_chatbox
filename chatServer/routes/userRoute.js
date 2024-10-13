import userModel from "../Schema/userSchema.js";
import { Router } from "express";
import chatModel from "../Schema/chatSchema.js";

const userRouter = Router();

// Sign Up Route
userRouter.post("/signUp", async (req, res) => {
    const { name, number, photo } = req.body;

    try {
        const getUser = await userModel.findOne({ name, number });
        if (getUser) {
            return res.status(409).send("User already exists");
        }

        const user = new userModel({ name, number, photo, contacts: [] });
        await user.save(); // Corrected to call the function
        res.status(201).send("Successfully registered");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Login Route
userRouter.post("/postLogin", async (req, res) => {
    const { name, number } = req.body;

    try {
        const getUser = await userModel.findOne({ name, number });
        if (getUser) {
            return res.json({ id: getUser._id });
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Get Contact Route
userRouter.get("/getContact/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) return res.status(404).send("User not found");

        const contact = user.contacts;
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

userRouter.post("/findme", async(req, res)=>{
    const {id}= req.body;
    try{
        const me= await userModel.findOne({_id:id});
        res.json(me)
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

userRouter.post("/changeDp", async(req, res)=>{
    const {id, photo}= req.body;
    try{
        const me= await userModel.findOne({_id:id});
        me.photo= photo;
        await me.save();
        res.send("successfully updated");
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})

userRouter.post("/findContact", async(req, res)=>{
    const {contact, id}= req.body;
    try{

        const me = await userModel.findOne({_id: id});
        if(me){
            const user= me.contacts.find((cont)=> cont.name==contact);
            res.send(user);
        }else{
            res.send("User not found")
        }
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})

// Add Contact Route
userRouter.post("/addContact", async (req, res) => {
    const { number, id } = req.body;

    try {
        const user = await userModel.findOne({ number });
        const me = await userModel.findOne({ _id: id });

        if (!user) return res.send("User is not using our app");

        const contact= me.contacts.find((cont)=> cont.number==number);
        if(!contact){
        me.contacts.push(user);
        await me.save(); // Save the updated user
        res.send("Successfully added contact");
        }else{
            res.send("already added");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Get Chat Route
userRouter.get("/getChat/:id", async (req, res) => {
  const { id } = req.params;
  const myId = req.query.myId; // Assuming you're sending the sender's ID in query params

  try {
    const chats = await chatModel.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    }).sort({ timestamp: 1 });
    if(chats){

    res.json(chats);
    }else{
        res.send([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


export default userRouter;
