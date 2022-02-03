import Head from 'next/head'
import DrawerSocialArt from '../components/social-art/DrawerSocialArt'
import HomeSocialArt from '../components/social-art/HomeSocialArt'
import Layout from '../components/Layout'
import BoardFrames from '../components/social-art/BoardFrames'
import { useState, useRef, useEffect } from 'react'
import dbConnect from "../utils/dbConnect"
import Frame from "../models/Frame"
import useSWR from "swr"
import { useSession } from 'next-auth/client'
import DescriptionProject from '../components/DescriptionProject'
import LoginRequest from "../components/LoginRequest"
import Loading from "../components/Loading"

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [frameInEdit, setFrameInEdit] = useState();
  const [ session, loading] = useSession();
  const width = useGetWidth();
  const canvasRef = useRef(null);
  const { data: dataFrames, error } = useSWR('/api/frames', fetcher, { initialData: props, revalidateOnMount: true, refreshInterval: 1});
  const frames = dataFrames.data;
  
  const descriptionProject= "Social Art is a social network that allows you to draw and show your creativity. You also can edit or delete them and give likes to works that you like the most."
  
  const accordionInfo = [
    {
      title: "Is my user account safely?",
      content: "Yes, username and password are stored safely with MongoDB like database and NextAuth.js for authentication. Also, the password is encrypted using SHA-2 which is a cryptographic hash function. That makes it impossible to crack. Despite this, it is recommended not to use either weak passwords or passwords used in other apps. Remember, this app is not commercial and is my own project in order to show my abilities to recruiters. So, please do not use real personal data."
    },
    {
      title: "How was the canvas made?",
      content: "I wanted to show my ability to work with new npm packages. So, I have implemented an interesting npm package (react-canvas-draw). This package allows drawing in different colours, thicknesses, etc., even editing a previously made drawing. Everything is possible by passing some parameters. To determine these parameters, I have combined it with another package (react-colorful) that allows you to choose the colour in RGBA. I also have added the options of thickness and saving colours by myself.",
    },
    {
      title: "Is my drawing and other information stored in a database?",
      content: "Yes. Drawings and data related to them are stored safely with MongoDB. Something special is that the drawing is saved in two ways. On the one hand, it is saved as an image to be optimized and uploaded to Cloudinary in order to be shown in the social area. On the other hand, the drawing is saved as a string of a Json which is used when the user wants to edit it. The combination of these two methods boosts the performance of this project."
    },
    {
      title: "If I or other users create a new drawing, do I have to reload the page to see it?",
      content: "No, it is not necessary. The drawings board is updated without reloading the page. To do this, I have used the React Hook SWR and the incremental static regeneration ISR of Next.js. On the one hand, the ISR will revalidate this page with the new information without rebuilding the entire website. On the other hand, SWR allows automatic data fetching without the need for the user to press a single button. In this way, the changes made by one user are shown to others almost magically."
    },
    {
      title: "I am a recruiter. How can I try the combination of ISR and SWR explained in the previous question?",
      content: "I recommend you to have two open windows simultaneously with two different users. Then, make a new drawing or edit an old one. After saving it, you will see the drawing added or edited both in the window where you have done it and in the other window.",
    }
  ];
  
  if(loading){
    return <Loading />
  }
  const user = session && session.user.user;
  const handleOnMouseOver=(e)=>{
    setIsHovered(true);
  }
  const handleOnMouseOut=(e)=>{
    setIsHovered(false);
  }
  const handleEditFrame= (frame)=>{
    setIsEditing(true);
    setFrameInEdit(frame);
    canvasRef.current.loadSaveData(frame.dataFrame);
  }
  const handleIsEditing = (val)=>{
    setIsEditing(val);
  }

  return <div>
      <Head>
        <title>Social art - Jonathan Freire</title>
        <meta name="description" content="This is a social media of art" />
      </Head>
      <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/" isHovered={isHovered}>
        <HomeSocialArt />
        {!session &&
          <LoginRequest id="login-cardframeart" text="You have to be logged in to give likes or edit your art" />
        }
        <BoardFrames frames={frames} onEdit={handleEditFrame} user={user} width={width} />
        <DrawerSocialArt mouseOver={handleOnMouseOver} mouseOut={handleOnMouseOut} onIsEditing={handleIsEditing} frames={frames} canvasRef={canvasRef} isEditing={isEditing} frameInEdit={frameInEdit} width={width} />
        <DescriptionProject title={"Social-Art"} description={descriptionProject} accordionInfo={accordionInfo} />
      </Layout>
    </div>
}
function useGetWidth(){
  const [width, setWidth] = useState();
  useEffect(()=>{
    setWidth(window.visualViewport.width);
    const listener = () => {
        setWidth(window.visualViewport.width);
    };
    window.addEventListener("resize", listener);
    return ()=> window.removeEventListener("resize", listener);
  },[])
  return width;
}

export async function getStaticProps(){
  await dbConnect();
  const data = await Frame.find({});
  const frames = data.map((element) => {
    const frame = element.toObject();
    frame._id = frame._id.toString();
    frame.dataFrame = "";
    return frame;
  })
  return { props: { data: frames}, revalidate: 1}
}