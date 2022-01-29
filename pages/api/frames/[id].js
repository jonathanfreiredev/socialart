import dbConnect from '../../../utils/dbConnect'
import Frame from '../../../models/Frame'
import User from '../../../models/User'
import { compressToUTF16 } from "lz-string"
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getSession({ req });
  const user = await User.findOne({username: session.user.name});

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const frame = await Frame.findOne({id: req.query.id})
        if (!frame) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: frame })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      req.body.dataFrame = compressToUTF16(req.body.dataFrame)
      try {
        if(user){
          const frame = await Frame.findOneAndUpdate({id: req.query.id}, req.body, {
            new: true,
            runValidators: true,
          });
          if (!frame) {
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: frame })
        }else{
          res.status(403).json({ success: false })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        if(user){
          const deletedFrame = await Frame.deleteOne({id: req.body.id})
          if (!deletedFrame) {
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: {} })
        }else{
          res.status(403).json({ success: false })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}