const express = require("express");
const dotenv = require("dotenv");
const { chats } = require('./data/data.js');
const connectDB = require("./config/db.js");
const colors = require("colors");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");


dotenv.config();

connectDB();
const app = express();    

app.use(express.json())
    
app.get('/', (req, res) => {
    res.send("API is Running");
});


app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started Successfully` .yellow.bold));