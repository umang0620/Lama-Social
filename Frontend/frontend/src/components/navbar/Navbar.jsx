import './navbar.scss';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from '../../context/authContext';


 export const Navbar = () => {
  const {darkMode, toggle} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  
  return (
    <div className='navbar'>
       <div className='left'>
        <Link to="/" style={{textDecoration:"none"}}>
        <span>LamaSocial</span>
        </Link> 
        <HomeOutlinedIcon/>
        {
          darkMode ?(<WbSunnyOutlinedIcon onClick={toggle}/> ): (<DarkModeOutlinedIcon onClick={toggle}/>)
        }
    
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text"  placeholder='Serch...'/>
        </div>
       </div>
       <div className='right'>
        <Person2OutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsNoneOutlinedIcon/>
        <div className="user">
           <img src={currentUser.profilePic } alt="" />
          <span>{currentUser.name}</span>
        </div>
       </div>
    </div>
  )
}

export default Navbar
