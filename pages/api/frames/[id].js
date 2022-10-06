import dbConnect from '../../../utils/dbConnect'
import Frame from '../../../models/Frame'
import { compressToUTF16 } from "lz-string"

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

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
      if(req.body.dataFrame){
        req.body.dataFrame = compressToUTF16(req.body.dataFrame)
      }
      try {
        const frame = await Frame.findOneAndUpdate({id: req.query.id}, {$set: req.body}, {
          new: true,
          runValidators: true,
        });
        if (!frame) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: frame })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}