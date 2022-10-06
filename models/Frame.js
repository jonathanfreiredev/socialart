import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const FrameSchema = new mongoose.Schema({
    id: String,
    user: String,
    userImage: String,
    dataImage: {
        url: String,
        public_id: String
    },
    likes: Number,
    dataFrame: String,
})

export default mongoose.models.Frame || mongoose.model('Frame', FrameSchema)