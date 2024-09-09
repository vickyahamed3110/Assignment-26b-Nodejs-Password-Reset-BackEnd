import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const cloudCluster = process.env.DB_CLUSTER || ""
const dbUsername = process.env.DB_USERNAME || ""
const dbPassword = process.env.DB_PASSWORD || ""
const dbName = process.env.DB_NAME || ""
const cloudUri = `mongodb+srv://${dbUsername}:${dbPassword}@${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(cloudUri)
const db = client.db(dbName);
const connectToDb=async()=>{
try{
    await client.connect();
    console.log("mongodb connect successfully")
}
catch(err){
    console.log("err",err)
    process.exit(1)
}
}
export {client,db}
export default connectToDb

