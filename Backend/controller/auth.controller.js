import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup= async (req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password not Matching.."})
        }

        const user=await User.findOne({username});
        if (user) {
            return res.status(400).json("User already Exists..");
        }

        //Hashing of passwords
        const salt=await bcrypt.genSalt(10);//Higher the value safer it is but at same time time taking...
        const hashedPassword=await bcrypt.hash(password,salt);

        //assigning profile pictures
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser=new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilepic:gender==="male"?boyProfilePic:girlProfilePic
        })
        //This will save data of newuser in database as per userschema
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save()
        //this status denotes record created in database
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic
        })
    } catch (error) {
        console.log("Error in SignUp Controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}
export const signin=async (req,res)=>{
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullname,
        username: user.username,
        profilePic: user.profilepic,
    });
} catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
}
export const signout=(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}