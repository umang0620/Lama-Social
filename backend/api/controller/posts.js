const dbConn = require("../connect");
const jwt = require("jsonwebtoken");
const  moment = require("moment");

exports.getPosts = (req,res)=>
{
  const userid = req.query.userid;
  const token = req.cookies.accessToken;
   if(!token)
   {
    res.status(409).json("User not loggedin")
   }
   jwt.verify(token,"secretkey",(err,userInfo)=>
   { 
    if(err)
    {
      res.status(403).json(err)
      console.log("token error")
    }
    const q = userid !== "undefined"
    ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts as p JOIN users as u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createdAt DESC`
    : `SELECT p.*, u.id AS userId, name, profilePic FROM posts as p JOIN users as u ON (u.id = p.userid)
   LEFT JOIN relationships as r ON(p.userid = r.followedUserid ) WHERE r.followerUserid= ? OR p.userid= ?
   ORDER BY p.createdAt DESC;`;

   const values = userid !== "undefined" ? [userid] :[userInfo.id,userInfo.id];
   dbConn.query(q,values,(err,data)=>
   {
    if (err)
    {   
        res.status(500).json(err)
        console.log("query error" + userInfo.id)
        return
    }
    return res.status(200).json(data);

   })
   })     
} 

exports.addPost = (req,res)=>
{
  const token = req.cookies.accessToken;
   if(!token)
   {
    res.status(409).json("User not loggedin")
   }
   jwt.verify(token,"secretkey",(err,userInfo)=>
   {
    if(err)
    {
      res.status(403),json(err)
      console.log("token error")
    }
    const q =
    "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
     
    ]
   dbConn.query(q,[values],(err,data)=>
   {
    if (err)
    {   
        res.status(500).json(err)
        return
    } 
    return res.status(200).json("Post has been created");

   })
   })     
} 

exports.deletePost = (req,res)=>
{
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userid` = ?";

    dbConn.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
}