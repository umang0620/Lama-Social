import "./post.scss";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
//import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Comments from "../comments/Comments";
import { useState,useContext } from "react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";


export const Post = ({post}) => {
 const [commentOpen,setCommentOpen] = useState(false);
 const [menuOpen,setMenuOpen] =useState(false);

 const { currentUser } = useContext(AuthContext); 

 const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid="+post.id).then((res) => {
      return res.data;
    }) 
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postid=" + post.id);
      return makeRequest.post("/likes", { postid: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postid) => {
      return makeRequest.delete("/posts/" + postid);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

   const handleLike = ()=>
   {
    mutation.mutate(data.includes(currentUser.id));
   }

   const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
console.log(post);
  return (
    <div className="post">  
    <div className="container">
  <div className="user">
    <div className="userInfo">
       <img src={post.profilePic} alt="" />
       <div className="details">
        <Link to={`profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
          <span className="name">{post.name}</span>
        </Link>
        <span className="date">{moment(post.createdAt).fromNow()}</span>
       </div>
    </div>
    <MoreHorizIcon  onClick={()=>setMenuOpen(!menuOpen)}/>
    {menuOpen && post.userid === currentUser.id && (<button onClick={handleDelete}>delete</button>)}
  </div>
  <div className="content">
    <p>{post.desc}</p>
    <img src={ "/upload/"+ post.img} alt="" />
  </div>
  <div className="info">
    <div className="item">
        {isLoading
        ? "loading"
        :data.includes(currentUser.id) ?(
        <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>)
        :(<FavoriteBorderOutlinedIcon onClick={handleLike}/>)}
        {data?.length}Likes  
      </div>  
      <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
         <TextsmsOutlinedIcon/>
           Comments
      </div>  
     <div className="item">
         <ShareOutlinedIcon/>
       Share
     </div>  
    </div>
    {commentOpen  && <Comments  postid={post.id}/>}
  </div>
</div>
  ) 
}
   
export default Post
