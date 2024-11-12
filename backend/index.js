import express, { json } from 'express'
import cors from 'cors'
import connectToMongo from './database.js';
import auth from './routes/authentication.js';
import tasks from "./routes/tasks.js";


const app = express()
const port = process.env.PORT || 3000


connectToMongo();

//parse requests of content type - application/json
app.use(json());
//Middleware to access this server data from all origins //Gopi@456//jaggu@167
app.use(cors());

app.use('/auth', auth);
app.use('/task', tasks);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
