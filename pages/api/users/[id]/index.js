import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { getSession } from "next-auth/client"
import crypto from "crypto"

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getSession({ req });
  const user = await User.findOne({id: session.user.user.id});
  switch (method) {
    case 'PUT' /* Edit a model by its ID */:
      try {
        let body;
        let hash;
        /* Change Username */
        if(req.body.username){
          const userWithNewName = await User.findOne({username: req.body.username});
          if(req.body.username !== session.user.name){
            if(!userWithNewName){
              body = req.body;
            }else{
              return res.status(403).json({ success: false, message: "There is a user with this chosen username. Please, choose another one." })
            }
          }else{
            return res.status(403).json({ success: false, message: "This username is the same as the previous one. Please, choose another one." })
          }
          /* Change Password */
        }else if(req.body.password){
          const salt = crypto.randomBytes(16).toString('hex');
          hash = crypto
              .pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512')
              .toString('hex');

          const oldPassword = crypto
              .pbkdf2Sync(req.body.lastPassword, user.salt, 1000, 64, 'sha512')
              .toString('hex');
          if(user.password === oldPassword){
            body = {password: hash, salt: salt};
          }else{
            return res.status(403).json({ success: false, message: "You have introduce the current password wrong." });
          }
        }
        if(user){
          // User uthentication
          if(user.id === req.query.id){
            await User.updateOne({id: req.query.id}, {$set: body});
            return res.status(200).json({ success: true})
          }
        }else{
          res.status(400).json({ success: false });
        }
      } catch (error) {
        console.log("error: ",error)
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        if(user){
          // User uthentication
          if(user.id === req.query.id){
            await User.deleteOne({"id":req.query.id});
            return res.status(200).json({ success: true});
          }
        }else{
          res.status(400).json({ success: false });
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