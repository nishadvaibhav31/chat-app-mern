import { createClient } from "redis";

const client = createClient({
    url: process.env.redisUrl
});

const connectToRedis = async () => {
	try {
		await client.connect();
		console.log("Connected to Redis Cloud"); 
	} catch (error) {
		console.log("Error connecting to Redis", error.message);
	}
};

export { client };
export default connectToRedis;