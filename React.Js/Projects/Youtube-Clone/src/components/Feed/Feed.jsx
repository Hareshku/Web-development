import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import { Link } from "react-router-dom";
import {API_KEY} from "../../data";
import { useEffect, useState } from "react";
import { value_Converter } from "../../data";
import moment from "moment";

const Feed=({category})=>{
  const [data, setData]= useState([]);
  const fetchData= async () =>{
    await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`).then((res)=>res.json()).then(data=>setData(data.items));
  }

  useEffect(()=>{
    fetchData();
  },[category])

  return(
      <div className="feed">
        {data.map((item, index)=>{
          return(
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_Converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
          )
        })}
        
        {/* <div className="card">
          <img src={thumbnail2} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail3} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail4} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail5} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail6} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail7} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail8} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail1} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail2} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail3} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail4} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail5} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail6} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail7} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail8} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail5} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail6} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail7} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div>
        <div className="card">
          <img src={thumbnail8} alt="" />
          <h2>Learn React from kgcoding to became a expert in web development</h2>
          <h3>KgCoding</h3>
          <p>190k views &bull; 3 days ago</p>
        </div> */}
      </div>
  );
}

export default Feed;