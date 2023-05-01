const dbConn = require("../connect");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

//register
exports.register = (req,res)=>
{
   //CHECK USER IF EXITS
    const q = `select * from users where username= '${req.body.username}';`
    if(req.body.username.length == 0)
    {
      res.status(409).json("Enter Username");
      return;
    }
    else if(req.body.email.length == 0)
    {
      res.status(409).json("Enter Email");
      return;
    }
    else if(req.body.password.length == 0)
    {
      res.status(409).json("Enter Password");
      return;
    }
    else if(req.body.name.length == 0)
    {
      res.status(409).json("Enter Name");
      return;
    }
    else{
    dbConn.query(q,[req.body.username],(err,data)=>
    {
      if(err){
          res.status(500).json(err)
          return;
      }
      if(data.length)
      {
         res.status(409).json("User already exits");
         return;
      }
        //CREATE A NEW USER 
      //HASH THE PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(req.body.password,salt);

      const q = `insert into users(username,email,password,name) values('${req.body.username}', '${req.body.email}', '${hashedpassword}', '${req.body.name}');`;
      dbConn.query(q,(err,data)=>
      {
         if(err)
         {
            res.status(500).json(err)
            return;
         }
         res.status(200).json("User has been created");
      })
    })
   }
}

//login
exports.login = (req,res)=>
{
   const q = `select * from users where username= '${req.body.username}';`
   dbConn.query(q,(err,data)=>
   {
      if(err)
      {
         res.status(500).json(err);
         return;
      }
      if(data.length === 0)
      {
         res.status(404).json("User not found");
         return;
      }
      const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);
      if(!checkPassword)
      {
         res.status(400).json("Wrong Password or username");
         return;
      }
      const token = jwt.sign({id: data[0].id }, "secretkey");

      const {password, ...others} = data[0]

      res.cookie("accessToken",token,{
         httpOnly: true,
      }).status(200).json(others);

   })
}

exports.logout = (req,res)=>
{
res.clearCookie("accessToken",{
   secure:true,
   sameSite:"none"
}).status(200).json("User has been logout")


}