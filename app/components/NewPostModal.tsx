"use client";
import { useShowAddPostModalContext } from "../contexts/ShowAddPostModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
import { UploadPost } from "../actions";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import { Loader2 } from "lucide-react";


export default function NewPostModal() {
  const { setShowAddPostModal } = useShowAddPostModalContext();
  const [desc, setDesc] = useState<string>(""); // State for description
  const [location, setLocation] = useState<string>("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]); // State for image URLs
  const [loading,setLoading]=useState<boolean>(false);
  const [suggestions,setSuggestions]=useState<string[]>([]);
  const { toast } = useToast(); // Toast hook for notifications
  const [showSuggestions,setShowSuggestions]=useState<boolean>();
  const session: any = useSession();
  console.log(session);

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
      console.log("sending req");
      const response = await UploadPost(postData);
      console.log("sent req");
      console.log(response);

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


  const fetchSuggestions = async (location: string) => {
    setLoading(true)
    try {
      const resp = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`);
      const data = await resp.json();
      if(location.length>0){
        setShowSuggestions(true);
      }
      console.log(data)
      setSuggestions(data.features);
    } catch (error: any) {
      console.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  return (
    <div
      onClick={handleOuterClick}
      className="fixed bg-gray-800 inset-0 cursor-pointer bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={handleInnerClick}
        className="bg-[#262626] w-[90vw] sm:w-[80vw] md:w-[500px] lg:w-[600px] p-6 rounded-lg shadow-lg flex flex-col items-center relative justify-start"
      >
        <button
          onClick={() => setShowAddPostModal(false)}
          className="px-4 py-2 bg-red-500 text-white text-xl font bold absolute top-3 right-3 rounded-md hover:bg-red-600 focus:outline-none"
        >
          X
        </button>

        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-white text-xl font-semibold mb-4 text-center">
            Add a new post
          </h2>

          {/* Description Input */}
          <div className="mb-4 flex flex-col w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <Textarea
              className="w-full px-4 py-2  rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              placeholder="Enter post description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              style={{
                resize: "none",
              }}
            />
          </div>

          <div className="mb-4 flex flex-col w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="description"
            >
              Location
            </label>
            <div className="relative">
              <Input
                className="w-full px-4 py-2  rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="location"
                placeholder="Enter Location"
                value={location}
                onChange={async(e) => {
                  setLocation(e.target.value)
                  debouncedFetchSuggestions(e.target.value);
                }}
              />
              {!loading && location.length > 0 && showSuggestions && (
                <div className="top-1 gap-x-1 text-md text-center max-h-[140px] overflow-y-scroll w-[full] mx-auto rounded-lg bg-black divide-y-2">
                  {
                    suggestions?.length>0 && suggestions.map((suggestion:any,index:any)=>(
                      <p onClick={()=>{
                        setLocation(suggestion.properties.formatted);
                        setShowSuggestions(false);
                      }} className="cursor-pointer bg-white hover:text-white hover:bg-[rgba(20,17,17,0.77)] dark:bg-black dark:hover:bg-[rgba(83,83,83,0.49)] p-2 py-3" key={index}>{suggestion.properties.formatted}</p>
                    ))
                  }
                </div>
              )}
              {
                loading && 
                <div className="top-1 bg-black text-center min-h-[120px]  w-[full] mx-auto rounded-lg  flex items-center justify-center">
                {
                   <Loader2 className="animate-spin mr-2" size={34}/>
                }
              </div>
              }
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-4 w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="media"
            >
              Media (Images or Videos)
            </label>
            <CldUploadWidget
              onSuccess={(result: any) => {
                console.log("uploaded ", result);
                console.log(result.info.secure_url);
                setImagesUrl((prevImgs: any) => [
                  ...prevImgs,
                  result.info.secure_url,
                ]);
                toast({
                  title: "Image uploaded successfully",
                  variant: "default",
                });
              }}
              uploadPreset="us5fdilf"
            >
              {({ open }) => (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className="w-full"
                  type="button"
                >
                  Upload an Image
                </Button>
              )}
            </CldUploadWidget>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-between w-full mt-6">
            <Button type="submit" className="font-bold">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
