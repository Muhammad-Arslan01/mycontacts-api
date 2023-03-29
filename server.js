
const express=require("express");
const connectDb = require("./Config/dbConnection");
const errorHandler=require('./middleware/errorHandler');
const dotenv=require("dotenv").config();
const port=process.env.port || 5000;
connectDb();
const app=express();
app.listen(port,()=>{
console.log(`server running on port ${port}`);
});
app.use(express.json());//This is middleware to accept data in json from body of request from client
app.use('/api/contacts',require('./routes/contactRoutes.js'));
app.use('/api/users',require('./routes/userRoutes.js'));                   //app.use are known as middlewares
app.use(errorHandler);

