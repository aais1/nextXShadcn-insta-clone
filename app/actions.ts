"use server"
import Post from '@/models/Post';
import { dbConnect } from "@/lib/utils";

export const UploadPost = async ({desc,imagesUrl,uploadedBy}) => {
  dbConnect();
  try{
    console.log("Post Data Received: ", desc, imagesUrl );
    console.log(Array.isArray(imagesUrl))
    console.log(imagesUrl)
    imagesUrl.forEach((url)=>console.log(url))
    const newPost=new Post({
      description: desc,
      imagesUrl,
      uploadedBy
    })
    await newPost.save();
    return { message: "Post uploaded successfully!" };
  }catch(error:any){
    console.error(error.message)
    return { error: "Post not uploaded successfully!" };
  }

};

