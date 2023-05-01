const dbConn = require("../connect");
const jwt = require("jsonwebtoken");
const  moment = require("moment");

exports.getComments = (req,res)=>
{
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userid)
    WHERE c.postid = ? ORDER BY c.createdAt DESC
    `;

  dbConn.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

exports.addComments = (req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO comments(`desc`, `createdAt`, `userid`, `postid`) VALUES (?)";
      const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postid
      ];
  
      dbConn.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
      });
    });   
} 
 