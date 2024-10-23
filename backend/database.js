import { connect } from "mongoose";

const mongoURI = "mongodb+srv://praveen1619:77320384@task-manager-cluster.ak48g.mongodb.net/?";

const connectToMongo = async () => {
    await connect(mongoURI);
}

export default connectToMongo;