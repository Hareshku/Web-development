import { useParams } from "react-router-dom";
import Play_Video from "../../components/Play_Video/Play_Video";
import Recommended from "../../components/Recommended/Recommended";
import "./Video.css";
const Video=()=>{

  const {videoId, categoryId}=useParams();
  return(
    <div className="play-container">
      <Play_Video/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video;