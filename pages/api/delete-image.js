
export default async function deleteImage(req, res) {
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        await cloudinary.uploader.destroy(req.body,{
            upload_preset: "socialart-cards"
        }, (error, result)=>{
            if(error){
                console.log(error);
            }else{
                res.status(200).send(result);
            }
        });
    } catch (error) {
      res.send(error.message);
    }
}