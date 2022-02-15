import dbConnect from '../../../utils/dbConnect'
import Frame from '../../../models/Frame'
import User from '../../../models/User'
import { decompressFromUTF16, compressToUTF16 } from 'lz-string'
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  const session = await getSession({ req });
  
  switch (method) {
    case 'GET':
      try {
        const dataFrames = await Frame.find({}) /* find all the data in our database */
        const frames = dataFrames.map((frame) => {
          frame.dataFrame = decompressFromUTF16(frame.dataFrame);
          return frame;
        })
        res.status(200).json({ success: true, data: frames })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      req.body.dataFrame = compressToUTF16(req.body.dataFrame);
      try {
        if(session){
          const frame = await Frame.create(req.body); /* create a new model in the database */
          await User.updateOne({"id": session.user.user.id}, {$push: {"drawings": frame.id}});
          return res.status(201).json({ success: true, data: frame });
        }
          res.status(403).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: true })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}