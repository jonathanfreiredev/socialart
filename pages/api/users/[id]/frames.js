import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getSession({ req });
  const user = await User.findOne({id: session.user.user.id});
  switch (method) {
    case 'GET' /* Edit a model by its ID */:
      try {
        if(user){
          // User uthentication
          if(user.id === req.query.id){
            const obj = await User.findOne({id: req.query.id});
            return res.status(200).json({ success: true, data: obj.drawings })
          }
        }else{
          res.status(400).json({ success: false });
        }
      } catch (error) {
        console.log("error: ",error)
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}