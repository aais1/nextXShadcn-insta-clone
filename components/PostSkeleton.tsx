import * as React from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const PostSkeleton = () => {
  return (
    <div className="py-4 flex flex-col border border-gray-200 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex px-4 mb-4 items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
      </div>

      {/* Carousel Skeleton */}
      <div className="relative w-full aspect-square bg-gray-300"></div>
      <div className="py-2 text-center mx-auto flex justify-center w-full text-sm text-gray-400">
        <div className=" bg-gray-300 rounded-md"></div>
      </div>

      {/* Icons Skeleton */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex gap-x-4">
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
      </div>

      {/* Description and Comments Skeleton */}
      <div className="px-4">
        <div className="h-4 w-16 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded-md mb-1"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="mt-2 h-4 w-24 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
