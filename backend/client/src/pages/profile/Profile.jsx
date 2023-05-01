import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { useState,useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Update from "../update/Update";


 
 export const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext); 

  const userid = parseInt(useLocation().pathname.split("/")[2]); 
  const { isLoading, error, data } = useQuery(["user"], () =>
     makeRequest.get("/users/find/"+userid).then((res) => {
       return res.data;
     }) 
   )
   const {  isLoading: rIsLoading,data :relationshipData } = useQuery(["relationship"], () =>
     makeRequest.get("/relationships?followedUserid="+userid).then((res) => {
       return res.data;
     }) 
   )
   const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userid=" + userid);
      return makeRequest.post("/relationships", { userid });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

   const handleFollow = ()=>
   {
    mutation.mutate(relationshipData.includes(currentUser.id));
   }
  return (
    <div className="profile">
      {isLoading ? ("loading"):(<><div className="images">
        <img
          src={data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>  
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />  
                <span>{data.website}</span>
              </div>
            </div>
          {rIsLoading
          ?"loading"
          : userid === currentUser.id ?

          (<button onClick={()=>
            setOpenUpdate(true)}>update</button>)
          
          :(<button onClick={handleFollow}>

            {relationshipData.includes(currentUser.id)
            ? "Following"
            : "Follow"}
            
            </button>)

          }
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userid ={userid}/>
      </div></>
      )}
    {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;