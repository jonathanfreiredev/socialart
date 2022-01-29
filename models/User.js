import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  image: String,
  password: String,
  salt: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
