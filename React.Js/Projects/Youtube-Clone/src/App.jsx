import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
const App= ()=>{

  const [sideBar, setSideBar]= useState(true);

  return( 
  <div className="main">
  <NavBar setSideBar={setSideBar}/>
  <Routes>
    <Route path="/" element={<Home sideBar={sideBar} />} />
    <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
  </Routes>
  </div>
  )
}

export default App;