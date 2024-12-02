import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    imagesUrl: {
      type: [String],
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId], 
      ref: 'User',
      default: [],
    },
    comments: {
      type: [
        {
          text: { type: String, required: true },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
          createdAt: { type: Date, default: Date.now }, 
        },
      ],
      default: [],
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
