import React, { useEffect, useState } from "react";
import "./Play_Video.css"
import Video1 from  "../../assets/video.mp4"
import like from  "../../assets/like.png"
import dislike from  "../../assets/dislike.png"
import share from  "../../assets/share.png"
import save from  "../../assets/save.png"
import jack from  "../../assets/jack.png"
import user_profile from  "../../assets/user_profile.jpg"
import {API_KEY, value_Converter} from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const Play_Video= ()=>{
  const {videoId}= useParams();
  const [apiData, setApiData]=useState(null);
  const [channelData, setChannelData]= useState(null);
  const [commentData, setCommentData]=useState([]);

  const fetchVideoData=async ()=> {

    const videoDetails_URL=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_URL).then(response=>response.json()).then(data=>setApiData(data.items[0]));
  }

  const fetchChannelData = async () =>{
    
    const channelData_Url= `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_Url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));

    // Fetching Comment data 

    const comment_data_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_data_url).then(res=>res.json()).then(data=>setCommentData(data.items));
  }

  useEffect(()=>{
    fetchVideoData();
  },[videoId]);

  useEffect(()=>{
    fetchChannelData();
  },[apiData]);


  return (
    <div className="play-video">
        {/* <video src={Video1} controls autoPlay muted></video> */}

        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
          <p>{apiData?value_Converter(apiData.statistics.viewCount):"20K"} &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
          <dir>
            <span><img src={like} alt="" />{apiData?value_Converter(apiData.statistics.likeCount):444}</span>
            <span><img src={dislike} alt="" />10</span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span>
          </dir>
        </div>
        <hr />
        <div className="publisher">
          <img src={channelData?channelData.snippet.thumbnails.default.url: " "} alt="" />
          <div>
            <p>{apiData?apiData.snippet.channelTitle: "Channel Name"}</p>
            <span>{channelData?value_Converter(channelData.statistics.subscriberCount): "2M"}</span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="video-discription">
          {/* <p>Channel that makes learning easy</p> */}
          <p>{apiData?apiData.snippet.description.slice(0, 250) :"Discription here"}</p>
          <hr />
          <h4>{apiData?value_Converter(apiData.statistics.commentCount):"130"}</h4>

          {commentData.map((item,index)=>{
            return(
            <div key={index} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{apiData?moment(apiData.snippet.publishedAt).fromNow():""}</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-actions">
                <img src={like} alt="" />
                <span>{value_Converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
          );
            
          })}
          
        </div>
    </div>
  )
}

export default Play_Video;