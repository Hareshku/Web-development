import "./Recommended.css"
import { useEffect, useState } from "react"
import { API_KEY, value_Converter } from "../../data"
import { Link } from "react-router-dom"

const Recommended=({categoryId})=>{

  const [apiData, setApiData]=useState([]);

  const fetchRelatedVideos = async () =>{
    const relatedVideos_Url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    await fetch(relatedVideos_Url).then(res=>res.json()).then(data=>setApiData(data.items));
  }

  useEffect(()=>{
    fetchRelatedVideos();
  },[])

  return(
<div  className="recommended">
  {apiData.map((item, index)=>{
       return(
    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
     <img src={item.snippet.thumbnails.medium.url
     } alt="" className="images"/>
     <div className="video-info">
       <h4>{item.snippet.title}</h4>
       <p>{item.snippet.channelTitle}</p>
       <p>{value_Converter(item.statistics.viewCount)} Views</p>
     </div>
     </Link>
    );
  })}

  </div>
  );
}

export default Recommended;