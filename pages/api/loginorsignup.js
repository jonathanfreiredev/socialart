import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export default async function loginorsignup (req, res) {
  const { username, password, image, api } = await req.body
  await dbConnect();

  const user = await User.findOne({username: username});
  //Sig in
  if(api === "signin"){
    try {
      if(user){
        const hash = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex')
        if (user.password !== hash) {
          return res.json({ success: false });
        }
        res.json({name: user.username, image: user.image, success: true});
      }else{
        return res.json({ success: false });
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  //Sign up
  if(api === "signup"){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    try {
      if(!user){
        const newUser = new User({
          id: uuidv4(),
          username: username,
          image: image,
          password: hash,
          salt: salt,
        });
        User.create(newUser);
        res.json({name: newUser.username, image: newUser.image, success: true});
      }else{
        return res.json({ success: false });
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}