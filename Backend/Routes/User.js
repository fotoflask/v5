const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const  multer = require('multer');
const Datemod = require('../Modals/Date')
const SECRETKEY = process.env.SECRET_KEY;

const { body, validationResult } = require('express-validator');
const User = require('../Modals/User');
const { verifytoken } = require('../middleware/verifytoken');
const Post = require('../Modals/Post');


// ROUTE-1 :- CREATE NEW USER 
// METHOD USED :- POST
router.post("/create/user", async (req, res) => {

    console.log(req.body);
    // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);
        // check if user with given email already exists

        let user1 = await User.findOne({ email: req.body.email });
        let user2 = await User.findOne({ username: req.body.username });
        if (user1 || user2) {
            console.log('user already exists');
            return res.status(400).json("A USER WITH THIS EMAIL/USERNAME ALREADY EXISTS , PLEASE LOGIN")
        }

        console.log('user does not exists');

        // generate salt for password hashing
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body);

        // if no user exists -> create new user
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
            phonenumber: req.body.phonenumber,
            profilepicture: req.body.profilepicture,
            type: req.body.Utype,
        })

        user.save();

        const jwttoken = jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        // await user.save();
        console.log(user);

        res.status(200).json({ msg: "NEW USER CREATED SUCCESSFULLY", user,jwttoken });

    } catch (error) {
        console.log('error in create user');
        console.log(error);
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /create/user route:" + error)
    }

})


// ROUTER-2:- USER LOGIN

router.post("/login", [
    body('email', 'EMAIL MUST HAVE MINIMUM LENGTH 5').isLength({ min: 5 }),
    body('password', 'USERNAME MUST HAVE MINIMUM LENGTH 3').isLength({ min: 3 })], async (req, res) => {
        console.log(req.body);
        // check if any errors in validation
        const errors = validationResult(req); // USE req NOT req.body HERE
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{

            // if we are using .select("-password") -> i.e not selecting passsword from database
            // then we will we unable to use bcrypt.compare as it require user.passsword to compare
        // const user = await User.findOne({email:req.body.email}).select("-password");
        
        // THEREFORE ALSO SELECT PASSWORD FROM DATABASE
         const user = await User.findOne({email:req.body.email});
        
        if(!user){
           return res.status(400).json("NO USER EXISTS WITH GIVEN EMAIL ID");
        }

        const comparePassword = await bcrypt.compare(req.body.password,user.password);

        if(!comparePassword){
            console.log("INCORRECT PASSWORD");
            return res.status(400).json("INCORRECT PASSWORD");
        }

        const jwttoken = await jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        return res.status(200).json({msg:"USER FOUND",user,jwttoken});
    }catch(error){
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /login route:" + error)
    }
    })

// ROUTER-3:- follow user

router.put("/follow/:id" , verifytoken , async(req , res)=>{
    console.log("follow route");
    console.log(req.params.id, req.body.user);
    if(req.params.id !== req.body.user){
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

        if(!user.followers.includes(req.body.user)){
            await user.updateOne({$push:{followers:req.body.user}});
            await otheruser.updateOne({$push:{following:req.params.id}});
            return res.status(200).json("User has followed");
        }else{
            await user.updateOne({$pull:{followers:req.body.user}});
            await otheruser.updateOne({$pull:{following:req.params.id}});
            return res.status(200).json("User has Unfollowed");
        }
    }else{
        return res.status(400).json("You can't follow yourself")
    }
})

// ROUTER-4:- followings posts

router.get("/followingposts/:id", verifytoken, async (req, res) => {
    try {
      const user2 = await User.findById(req.params.id);
  
      const followingPosts = await Promise.all(
        user2.following.map((each_following_user_account) => {
          return Post.find({ user: each_following_user_account });
        })
      );
  
      const your_posts = await Post.find({ user: user2._id });

      let allPosts = your_posts.concat(...followingPosts);
  
      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      res.status(200).json(allPosts);
    } catch (error) {
      return res.status(400).json("SOME ERROR OCCURRED IN try-catch in /follow/ " + error);
    }
  });
  
  // ROUTER-5:- update user details
  
router.put("/update/:id",verifytoken, async (req, res) => {

    try {
        if(req.params.id === req.user.id){

        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        req.body.password=securePassword;
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        });
        await updateuser.save();
        res.status(200).json({msg:"PASSWORD UPDATED SUCCESSFULLY",updateuser});
        }
    }else{
        return res.status(400).json("YOU CANNOT UPDATE OTHERS PROFILE");
    }

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /update/:id " + error );
    }

})

  // ROUTER-6:- delete user

router.delete("/delete/:id",verifytoken, async (req, res) => {

    try {

        if(req.params.id !== req.user.id){
            return res.status(400).json("CANNOT DELETE OTHERS ACCOUNT");
        }

      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json({msg:"ACCOUNT DELETED SUCCESSFULLY",user});


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /delete/:id " + error );
    }

})


  // ROUTER-7:- post user details

router.get("/post/user/details/:id",async(req,res)=>{
    try{
    const user = await User.findById(req.params.id);
    if(!user){
        req.status(400).send("CAN'T GET USER FOR A POST");
    }
    const {email,password,phonenumber,...others}= user._doc;
    res.status(200).send(others);
}catch(error){
    return res.status(400).send("SOME ERROR IN TRY_ CATCH (get user for a post)")
}

})

// GET USER DETAILS WITH USERID
  // ROUTER-8:- user details by id

router.get("/user/details/:id",verifytoken,async(req,res)=>{
    try{
    const user = await User.findById(req.params.id);
    if(!user){
        req.status(400).send("CAN'T GET USER FOR A POST");
    }
    const {email,password,phonenumber,...others}= user._doc;
    console.log(others);
    res.status(200).send({user: others});
}catch(error){

    return res.status(400).send("SOME ERROR IN TRY_ CATCH (get user for a post)")
}

})

 // ROUTER-9:- get all users

router.get("/all/user/:id", verifytoken, async (req, res) => {
    try {
        const allUsersInDb = await User.find();
        const current_user = await User.findById(req.params.id);

        const followingsOfCurrent_user = current_user.following.map((item) => item.toString());

        let UsersNotFollowed = allUsersInDb.filter((val) => {
            // Exclude the own user account from suggestions
            return val._id.toString() !== req.params.id &&
                !followingsOfCurrent_user.includes(val._id.toString());
        });

        let SuggestedForYouList = UsersNotFollowed.map((item) => {
            const { email, phonenumber, password, followers, following, ...others } = item._doc;
            return others;
        });

        res.status(200).send(SuggestedForYouList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

 // ROUTER-10:- get followings list of logged in user

router.get("/get/followings/:id",verifytoken, async(req,res)=>{
    try{
        console.log("get followings route",req.params.id);
        const user = await User.findById(req.params.id);
        const followings = await Promise.all(
            user.following.map((item)=>{
                return User.findById(item);
            })
        )

        let followingList =[];

        followings.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            followingList.push({others})
        })


        return res.status(200).send(followingList)
    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})


// GET FOLLOWERS LIST OF LOGGED IN USER
 // ROUTER-11:- get followers list of logged in user

router.get("/get/followers/:id",async(req,res)=>{
    try{

        const user = await User.findById(req.params.id);
        const FFollowers = await Promise.all(
            user.followers.map((item)=>{
                return User.findById(item);
            })
        )

        let FFollowersList =[];

        FFollowers.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            FFollowersList.push({others})
        })


        return res.status(200).send(FFollowersList)

    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})

 // ROUTER-12:- liked posts

router.put("/likedpost/:id", async (req, res) => {
    try {
        const liked_user = await User.findById(req.body.user);

        if (!liked_user) {
            return res.status(404).send("User not found");
        }

        console.log(liked_user);

        if (!liked_user.Likedposts.includes(req.params.id)) {
            await liked_user.updateOne({ $push: { Likedposts: req.params.id } });
        } else {
            await liked_user.updateOne({ $pull: { Likedposts: req.params.id } });
        }

        return res.status(200).send("Update successful");
    } catch (error) {
        return res.status(400).send("ERROR IN User.js route likedposts: " + error);
    }
});


// get users from following who are having stories

 // ROUTER-13:- get followings with stories

router.get("/get/followings_with_stories/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        
        const followings = await Promise.all(
            user.following.map((item)=>{
                return User.findById(item);
            })
        )

        let followingList =[];

        const {email,passsword,phonenumber,followers,following,...others}=user._doc;
        if(others.Stories.length!==0){
            followingList.push({others})
        }

        followings.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            if(others.Stories.length!==0){
                followingList.push({others})
            }

        })

        // console.log(followingList);


        res.status(200).send(followingList)


    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})

 // ROUTER-14:- add story


router.post("/add/story",verifytoken,async(req,res)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(400).send("USER NOT FOUND ");
    }
    console.log(user);

    if(user.Stories.length==0){
        await user.updateOne({$push:{Stories:req.body.newstory},
                             $set:{StoryDescription:req.body.description}})
      
        res.status(200).send("STORY ADDED")
    }else if(user.Stories.length==1){
        await user.updateOne({$pull:{Stories:user.Stories[0]},$set:{StoryViewers:[]}})
        await user.updateOne({$push:{Stories:req.body.newstory},$set:{StoryDescription:req.body.description}})
        console.log("check story description : "+ user.StoryDescription);
        res.status(200).send("OLD STORY REMOVED AND NEW STORY ADDED")
    }
    else{
        return res.status(400).send("ONLY ONE STORY IS ALLOWED")
    }
})

// get story of a user from his id
 // ROUTER-15:- view story

router.get("/viewstory/:id",async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(400).send("USER NOT FOUND TO FETCH STORY")
    }
    console.log("user story here : "+user.Stories[0])
    return res.status(200).json({Image:user.Stories[0],Description:user.StoryDescription});
})

 // ROUTER-16:- get all users

router.get("/get/allusers",async(req,res)=>{
    console.log("all users route");
    try{
        const allUsers = await User.find();
        let allUsersList =[];

        allUsers.map((person)=>{
            const {password,...others}=person._doc;
            allUsersList.push(others)

        })
        // console.log(allUsersList);
        return res.status(200).json({allUsersList : allUsersList})
    }catch(error){
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})

 // ROUTER-17:- get story viewers

// get story viewers(their username , profile picture) (array) of logged in user in leftbar

router.get("/getstoryviewers",verifytoken,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
          }

        console.log("user bro here: "+user.StoryViewers)
     
        const Viewers = await Promise.all(
            user.StoryViewers.map((item)=>{
                return User.findById(item);
            })
        )



        let ViewersList =[];

        Viewers.map((person)=>{
            const {email,password,phonenumber,followers,following,StoryViewers,Likedposts,Stories,...others}=person._doc;
            ViewersList.push({others})
        })
        console.log("viewers : "+Viewers)

        res.status(200).send(ViewersList)

    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch in story Viewers"+error)
    }
})


// addd viewer when they viewed your story 
 // ROUTER-18:- add viewer

router.put("/:id/addviewer",verifytoken,async(req,res)=>{
 
    try{
     
     const story_Owner = await User.findById(req.params.id);
     console.log(story_Owner);
 
    if(!story_Owner.StoryViewers.includes(req.user.id)){
        await story_Owner.updateOne({$push:{StoryViewers:req.user.id}});  
        return res.status(200).json("Viewer added successfully");
    }else{
        return res.status(200).json("You have already viewed the story ");
    }
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in adding story viewer"+error );
}

});

 // ROUTER-19:- upload profile photo
// Profile Photo Upload

router.post("/upload/profilepic",verifytoken,async(req,res)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(400).send("USER NOT FOUND ");
    }
    
    try{
        console.log(req.body);
        const update = await User.findByIdAndUpdate(req.user.id,{
            $set:{profilepicture:req.body.image}
        });
        await update.save();
        res.status(200).send("PROFILE PICTURE UPDATED SUCCESSFULLY");
    }catch(error){
        return res.status(400).send("SOME ERROR OCCURED IN try-catch in updating profile picture"+error);
    }
}
);

// ROUTER-20:- get exploreposts of logged in user, posts that are not followed by logged in user

router.get("/exploreposts/:id", verifytoken, async(req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const allPosts = await Post.find();
      const notFollowingPosts = allPosts.filter((val) => {
        return !user.following.includes(val.user) && val.user.toString() !== req.params.id;
      });
      res.status(200).send(notFollowingPosts);
    } catch(error) {
      return res.status(400).json("SOME ERROR OCCURED IN try-catch in adding story viewer" + error);
    }
  });

 





module.exports = router;
