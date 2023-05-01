import './leftbar.scss';
import Friends from "../../assests/1.png";
import Groups from "../../assests/2.png";
import Market from "../../assests/3.png";
import Watch from "../../assests/4.png";
import Memories from "../../assests/5.png";
import Events from "../../assests/6.png";
import Gaming from "../../assests/7.png";
import Gallery from "../../assests/8.png";
import Videos from "../../assests/9.png";
import Message from "../../assests/10.png";
import Tutorial from "../../assests/11.png";
import Courses from "../../assests/12.png";
import Fund from "../../assests/13.png";
import { useContext } from "react";
import { AuthContext } from '../../context/authContext';
import { Link } from "react-router-dom";

export const Leftbar = () => {

  const {currentUser} = useContext(AuthContext);
  return (<>
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <div className="user">
          <img src={currentUser.profilePic} alt="" />

          <span>{currentUser.name}</span>
          
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shorcurt</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Message} alt="" />
            <span>Messages</span>
          </div>

        </div>
        <hr />
        <div className="menu">
          <span>Your Shorcurt</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorial} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Leftbar
