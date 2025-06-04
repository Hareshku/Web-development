import { useState } from "react";
import Feed from "../../components/Feed/Feed";
import SideBar from "../../components/sideBar/SideBar";
import "./Home.css";
const Home=({sideBar})=>{

  const [category, setCategory]=useState(0);
  return(
  <>
   <SideBar sideBar={sideBar} category={category} setCategory={setCategory} key={category}/>
   <div className={`container ${sideBar?"":"large-container"}`}>
    <Feed category={category} key={category}/>
   </div>
  </>
  )
}

export default Home;