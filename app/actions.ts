"use server"
import Post from '@/models/Post';
import { dbConnect } from "@/lib/utils";
import {UploadPostProps} from '@/app/types'

export const UploadPost = async ({desc,imagesUrl,uploadedBy}:UploadPostProps) => {
  dbConnect();
  try{
    const newPost=new Post({
      description: desc,
      imagesUrl,
      uploadedBy
    })
    await newPost.save();
    return { message: "Post uploaded successfully!" };
  }catch{
    return { error: "Post not uploaded successfully!" };
  }

};

