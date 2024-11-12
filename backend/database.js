import { connect } from "mongoose";
import 'dotenv/config';


const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    await connect(mongoURI);
}

export default connectToMongo;