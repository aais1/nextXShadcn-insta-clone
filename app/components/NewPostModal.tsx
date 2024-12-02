"use client";
import { useShowAddPostModalContext } from "../contexts/ShowAddPostModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from 'next-cloudinary';
import { useToast } from "@/hooks/use-toast";
import { UploadPost } from "../actions";
import { useSession } from "next-auth/react";

export default function NewPostModal() {
  const { setShowAddPostModal } = useShowAddPostModalContext();
  const [desc, setDesc] = useState<string>(""); // State for description
  const [imagesUrl, setImagesUrl] = useState<string[]>([]); // State for image URLs
  const { toast } = useToast(); // Toast hook for notifications
  const session:any = useSession();
  console.log(session)

  // Function to handle outer click to close the modal
  const handleOuterClick = () => {
    setShowAddPostModal(false);
  };

  // Prevent the click from propagating to the outer div
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the data to be sent to the server
    const postData = {
      desc: desc, // Description of the post
      imagesUrl: imagesUrl, // Array of uploaded image URLs
      uploadedBy: session?.data?.user?.id, // ID of the user who uploaded the post
    };

    try {
      // Call the UploadPost server action with the form data
      console.log('sending req')
      const response = await UploadPost(postData);
      console.log('sent req')
      console.log(response)

      if (response?.message === "Post uploaded successfully!") {
        toast({
          title: response?.message,
          variant: "default",
        });
        setShowAddPostModal(false); // Close the modal on success
      } else {
        toast({
          title: "Error uploading post",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      toast({
        title: "Error uploading post",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      onClick={handleOuterClick}
      className="fixed inset-0 cursor-pointer bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={handleInnerClick}
        className="bg-[#262626] w-[90vw] sm:w-[80vw] md:w-[500px] lg:w-[600px] p-6 rounded-lg shadow-lg flex flex-col items-center justify-start"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-white text-xl font-semibold mb-4 text-center">
            Add a new post
          </h2>

          {/* Description Input */}
          <div className="mb-4 flex flex-col w-full">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              placeholder="Enter post description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
            />
          </div>

          {/* Media Upload */}
          <div className="mb-4 w-full">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="media">
              Media (Images or Videos)
            </label>
            <CldUploadWidget
              onSuccess={(result: any) => {
                console.log('uploaded ', result);
                console.log(result.info.secure_url);
                setImagesUrl((prevImgs: any) => [...prevImgs, result.info.secure_url]);
                toast({
                  title: "Image uploaded successfully",
                  variant: "default",
                });
              }}
              uploadPreset="us5fdilf"
            >
              {({ open }) => (
                <Button onClick={(e) =>{
                  e.stopPropagation(); 
                  open()
                  }}
                  type="button">
                  Upload an Image
                </Button>
              )}
            </CldUploadWidget>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-between w-full mt-6">
            <button
              onClick={() => setShowAddPostModal(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
