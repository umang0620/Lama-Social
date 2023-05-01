const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");
const userRoutes = require("./routes/users");
const relationshipRoutes = require("./routes/relationship");
const dbConn = require("./connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");


//Middleware
app.use((req,res,next)=>
{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
))
app.use(cookieParser())
app.use(express.json())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  });


//Routes
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/users",userRoutes);
app.use("/api/relationships", relationshipRoutes);



app.listen(4000,()=>
{
    console.log("Server is Runnig");
})