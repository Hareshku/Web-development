import "./home.css";
import "./about_container_text.css";
import "./Technology.css";
import "./Solution.css";
import "./Industry_Exp.css";
import "./Awards.css";
import "./Client_feedback.css";
import "./FAQs.css";
import { IoMdAdd } from "react-icons/io";
const Home=()=>{
  return<>
  <center className="home">
    <div className="righ">
      <div className="content">
        <h1>Digital Transformation<br/>with the right agency</h1>
        <p>Helping businesses stand out and succeed with effective digital solutions that drive high returns on investment</p>
        <button className="Lets_talk">let's Talk</button>
      </div>
    </div>
    <div className="left">
      <img src="./home_img.webp" alt="" />
    </div>
  </center>
  <div className="slide_bar">
    <h3>Trusted by companies all over the world.</h3>
    <div className="slider">
      <img src="./download.png" alt="" />
      <img src="./EMAAR.png" alt="" />
      <img src="./EMAAR.png" alt="" />
      <img src="./EMAAR.png" alt="" />
      <img src="./hp.png" alt="" />
      <img src="./Nonoheal.png" alt="" />
      <img src="./Toshiba.png" alt="" />
      <img src="./truecom.jpg" alt="" />
      <img src="./Worldho.png" alt="" />
    </div>
  </div>
  <div className="projects_list">
    <div className="container">
    <div className="title">
      <h2>Latest Projects</h2>
      <p>Explore our projects that have led our clients to real-world success.</p>
    </div>
    <ul>
      <li className="Card_1">
        <a href="">
          <div className="item_img">
            <img src="./item-img1.webp" alt="" />
          </div>
          <div className="item_caption">
            <h3>Gamzuli</h3>
            <p>UX/UI Design, Admin Portal, Front-end & Back-end Development</p>
          </div>
        </a>
      </li>
      <li className="Card_2">
        <a href="">
          <div className="item_img">
            <img src="./item_img2.webp" alt="" />
          </div>
          <div className="item_caption">
            <h3>Gharpedia</h3>
            <p>Front-end & Back-end Development, Integrated Headless CMS</p>
          </div>
        </a>
      </li>
      <li className="Card_3">
        <a href="">
          <div className="item_img">
            <img src="./item_img3.webp" alt="" />
          </div>
          <div className="item_caption">
            <h3>Lubi</h3>
            <p>Design, Wordpress, Technology, Consulting</p>
          </div>
        </a>
      </li>
    </ul>
    <button className="View_work">View All Work</button>
    </div>
  </div>
  <div className="container_wrap">
   <div className="row">
    <div className="left">
      <div className="about">
        <h1>Who We Are!</h1>
        <p>Established in 2008, with a vision to transform digital experiences for businesses globally. We provide modern web design, development, digital products, and marketing solutions to customers worldwide. We have achieved a lot in advancing technology, thanks to the most creative minds leading the way. Up until now, we have offered our specialized knowledge to a variety of clients from different industries.</p>
        <button>more about us</button>
      </div>
    </div>
    <div className="right">
      <div className="container_box">
        <ul>
        <li>
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
          <li className="Li_2">
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
          <li>
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
          <li className="Li_4">
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
          <li>
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
          <li>
            <div className="title">
               <h1>14+</h1>
               <p>Years of Experience</p>
            </div>
            <div className="img_box">
            <img src="./box-bg.svg" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
   </div>
  </div>
  <div className="container_services">
   <div className="row">
    <div className="left">
      <div className="about">
        <h1>Capabilities</h1>
        <p>n today’s digital age, almost everything, including healthcare, basic needs, and consumer demands, is moving online. To succeed in the market, you need the right technological infrastructure, industry experts, a high-performing website, digital products, and an effective marketing strategy. This marketing strategy generates comprehensive results to succeed or stand out in the market.

We have 14 years of experience and can help businesses achieve digital excellence with our solutions. Our areas of expertise include UI/UX design, web design, custom development, technology consulting, and inbound marketing.</p>
        <button>more about us</button>
      </div>
    </div>
    <div className="right">
      <div className="container_box">
        <h1><img src="" alt="" />Web Development</h1>
        <p>Having a profound understanding of technology and adhering to standards can significantly enhance your brand’s competitive advantage. Advanced digital technologies can optimize your website for better sales and instant results.</p>
        <button>Red More</button>
      </div>
      <div className="container_box">
        <h1><img src="" alt="" />Web Development</h1>
        <p>Having a profound understanding of technology and adhering to standards can significantly enhance your brand’s competitive advantage. Advanced digital technologies can optimize your website for better sales and instant results.</p>
        <button>Red More</button>
      </div>
      <div className="container_box">
        <h1><img src="" alt="" />Web Development</h1>
        <p>Having a profound understanding of technology and adhering to standards can significantly enhance your brand’s competitive advantage. Advanced digital technologies can optimize your website for better sales and instant results.</p>
        <button>Red More</button>
      </div>
      <div className="container_box">
        <h1><img src="" alt="" />Web Development</h1>
        <p>Having a profound understanding of technology and adhering to standards can significantly enhance your brand’s competitive advantage. Advanced digital technologies can optimize your website for better sales and instant results.</p>
        <button>Red More</button>
      </div>
    </div>
   </div>
  </div>
  <div className="technologies_div">
    <div className="text_div">
      <div className="text"><h1>Start your journey towards Digital Transformation with us!</h1></div>
      <div className="button"> <button>Let's Talk</button></div>
      
     
    </div>
    
    <h1>Technologies</h1>
    <p>Empowering your businesses with the latest technologies we use</p>
    <div className="Tech_list">
        <li>Front End</li>
        <li>Back End</li>
        <li>CMS</li>
        <li>eCommerce</li>
        <li>Databases</li>
        <li>Cloud</li>
        <li>Platforms</li>
        </div>
        <div className="tech_img">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        </div>
  </div>

  <div className="our_solution">
    <h1>Our Solutions</h1>
    <p>Enabling businesses with efficient software and technology solutions in diverse industries.</p>
    <div className="main_card">
      <div className="side_card">
       <ul>
        <li>CRM</li>
        <li>ERP</li>
        <li>eLearning</li>
        <li>WebPortal</li>
        <li>Sypply Chain</li>
        <li>Financial Management</li>
       </ul>
      </div>
      <div className="content">
          <div className="text">
            <h1>CRM</h1>
            <p>If your business is struggling to engage with customers or prospects, it may have a negative impact on your company’s growth. Implementing a Customer Relationship Management system can improve customer experience, automate processes and manage data. Our expert team helps you set up a CRM to achieve your business goals.</p>
            <button>View more...</button>
          </div>
          <div className="img">
            <img src="./CRM-1.webp" alt="" />
          </div>
      </div>
    </div>
  </div>

  <div className="industry_experties">
    <div className="title">
      <h1>Industry Expertise</h1>
    <p>Putting forth our more than 14 years of expertise to transform businesses digitally regardless of the industry. We believe your unique perspective will be an add-on to our valuable industry insights delivering beneficial solutions.</p>
    </div>
    <div className="categories">
      <div className="cat-1">
        <h1>Manufacturing</h1>
        <p>A manufacturing website with a poor user experience is just like a product without a user manual! Take your business to the next level leaving an impact.</p>
      </div>
      <div className="cat-2">
        <h1>Government</h1>
        <p>Authorizing the government sector digitally enables you to provide better services to citizens while increasing efficiency, cost-effectiveness, and accountability. Go digital building an online portal for citizens to access government information, benefits, and services.</p>
        </div>
      <div className="cat3">
        <h1>Retails</h1>
        <p>We understand the evolving complexity of the retail industry and its requirement for a more advanced approach to custom IT solutions. Our custom solutions enable you with increased efficiency, higher productivity, and a customer-centric experience.</p>
      </div>
    </div>
    
  </div>

  <div className="awards">
    <div className="title">
      <h1>Awards and Recognition</h1>
      <p>Making a difference through these legacies of excellence!</p>
    </div>
    <div className="title-img">
      <ul>
        <li><img src="./Logo9.svg" alt="" /></li>
        <li><img src="./Logo9.svg" alt="" /></li>
        <li><img src="./Logo9.svg" alt="" /></li>
        <li><img src="./Logo1.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
        <li><img src="./Logo2.svg" alt="" /></li>
       
      </ul>
      
    
      
      
      
    </div>
  </div>

  <div className="client-feedback">

  


    <div className="text-div">
      <div className="title-wrap">
        <h1>Client Feedback</h1>
      <p>Delve into the feedback from our valued customers!</p>
      </div>
      <p>“They provide excellent quality of work, and their services are both time and cost-efficient.”</p>
    <div className="bio">
      <h3>EliZabeth</h3>
      <p>CEO, Boutique Creative agency</p>
    </div>
    <div className="reviews">
      <ul>
        <li><img src="./Clutch.svg" alt="" /></li>
        <li className="google-img"><img src="./Google-Reviews-1-1.svg" alt="" /></li>
        <li><img src="./Good-Firms-1-1.svg" alt="" /></li>
      </ul>
    </div>
    </div>
    
    <div className="next-previous"><span>Next </span> <span>Previous</span></div>
  </div>

  <div className="faqs">
    <div className="faq-title">
      <h1>FAQs</h1>
      <p>We hope these questions and answers help you find the best digital transformation partner for your business.</p>
    </div>
    <div className="faq-container">
    <div className="faq-1">
    <button><span><IoMdAdd/></span><p>How long has webx been in the business</p></button>
      <p>KrishaWeb has been a trusted partner in digital transformation since 2008, accumulating over 14 years of experience in delivering exceptional digital solutions to businesses worldwide. Our longevity in the industry is a testament to our expertise, reliability, and commitment to client success.</p></div>
    </div>
    

  </div>
    </>
}

export default Home;