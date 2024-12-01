"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn Button component
import { Input } from "@/components/ui/input";   // Assuming you have shadcn Input component
import { Textarea } from "@/components/ui/textarea"; // Assuming you have shadcn Textarea component
const Page = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handlePostSubmit = () => {
    // Handle the post submission logic
    console.log("Post submitted with caption:", caption);
    if (image) {
      console.log("Image file:", image);
    }
  };

  return (
    <div className="w-screen md:w-[80vw] mx-auto mt-4 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Create a New Post</h2>

      <div className="space-y-4">
        {/* Post Caption */}
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your caption..."
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Image Upload */}
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="file:border-none file:bg-gray-200 file:text-gray-700 file:rounded-md file:py-2 file:px-4 cursor-pointer"
          />
          {image && (
            <div className="w-16 h-16 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }} />
          )}
        </div>

        {/* Post Button */}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handlePostSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 w-full py-2 rounded-md"
          >
            Post
          </Button>

          
        </div>
      </div>
    </div>
  );
};

export default Page;
