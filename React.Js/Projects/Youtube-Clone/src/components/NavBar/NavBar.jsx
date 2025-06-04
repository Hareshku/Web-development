import "./NavBar.css";
import Menu from "../../assets/menu.png"
import Logo from "../../assets/youtube-logo.jpg"
import Search from "../../assets/search.png"
import Upload from "../../assets/upload.png"
import More from "../../assets/more.png"
import Notification from "../../assets/notification.png"
import User_Profile from "../../assets/user-profile5-modified.png"
import { Link } from "react-router-dom";

const NavBar=({setSideBar})=>{
  return <>
  <nav className="flex-div">
    <div className="nav-left flex-div">
     <img className="menu-icon" onClick={()=>setSideBar(prev=>prev===false?true:false)} src={Menu}  alt=""  />
     <Link to='/'><img className="logo" src={Logo} alt="" /></Link>
     
    </div>
    <div className="nav-middle flex-div">
      <div className="search-box flex-div">
        <input type="text" placeholder="Search here"/>
     <img src={Search} alt="" />
      </div>
     
    </div>
    <div className="nav-right flex-div">
      <img src={Upload} alt="" />
      <img src={More} alt="" />
      <img src={Notification} alt="" />
      <img src={User_Profile} alt="" className="user-icon"/>
    </div>
  </nav>
  </>
}

export default NavBar;