import Head from 'next/head'
import DrawerSocialArt from '../components/social-art/DrawerSocialArt'
import HomeSocialArt from '../components/social-art/HomeSocialArt'
import Layout from '../components/Layout'
import BoardFrames from '../components/social-art/BoardFrames'
import { useState, useRef, useEffect } from 'react'
import dbConnect from "../utils/dbConnect"
import Frame from "../models/Frame"
import DescriptionProject from '../components/DescriptionProject'

export default function Home(props) {
  const width = useGetWidth();
  const canvasRef = useRef(null);
  const frames = props.data;
  
  const descriptionProject= "Social Art is a social network that allows you to draw and show your creativity. You also can give likes to works that you like the most."
  
  const accordionInfo = [
    {
      title: "How was the canvas made?",
      content: "I wanted to show my ability to work with new npm packages. So, I have implemented an interesting npm package (react-canvas-draw). This package allows drawing in different colours, thicknesses, etc. Everything is possible by passing some parameters. To determine these parameters, I have combined it with another package (react-colorful) that allows you to choose the colour in RGBA. I also have added the options of thickness and saving colours by myself.",
    },
    {
      title: "Is my drawing and other information stored in a database?",
      content: "Yes. Drawings and data related to them are stored safely with MongoDB. Something special is that the drawing is saved in two ways. On the one hand, it is saved as an image to be optimized and uploaded to Cloudinary in order to be shown in the social area. On the other hand, the drawing is saved as a string of a Json."
    }
  ];

  return <div>
      <Head>
        <title>Social art - Jonathan Freire</title>
        <meta name="description" content="This is a social media of art" />
      </Head>
      <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/">
        <HomeSocialArt />
        <BoardFrames frames={frames} width={width} />
        <DrawerSocialArt canvasRef={canvasRef} width={width} />
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

export async function getServerSideProps(){
  await dbConnect();
  const data = await Frame.find({});
  const frames = data.map((element) => {
    const frame = element.toObject();
    frame._id = frame._id.toString();
    frame.dataFrame = "";
    return frame;
  })
  return { props: { data: frames}}
}