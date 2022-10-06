import dbConnect from '../../../utils/dbConnect'
import Frame from '../../../models/Frame'
import { decompressFromUTF16, compressToUTF16 } from 'lz-string'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  
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
        const frame = await Frame.create(req.body); /* create a new model in the database */
        return res.status(201).json({ success: true, data: frame });
      } catch (error) {
        res.status(400).json({ success: true })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}