import User from "../models/user.model.js";
import { client } from "../db/connectToRedis.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id.toString();
        const cacheKey = "all_users"; 

       
        const cachedUsers = await client.get(cacheKey);
        let allUsers = [];

        if (cachedUsers) {
            console.log("redis working for side bar user");
			
            allUsers = JSON.parse(cachedUsers);
        } else {
            
            allUsers = await User.find({}).select("-password");
           
            await client.setEx(cacheKey, 3600, JSON.stringify(allUsers));
        }

        
        const filteredUsers = allUsers.filter(user => user._id.toString() !== loggedInUserId);

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};