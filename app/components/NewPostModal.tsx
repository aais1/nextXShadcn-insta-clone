import { useShowAddPostModalContext } from "../contexts/ShowAddPostModal";

export default function NewPostModal() {
  const { showAddPostModal, setShowAddPostModal } = useShowAddPostModalContext();

  const handleOuterClick = () => {
    setShowAddPostModal(false);
  };

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      onClick={handleOuterClick} 
      className="fixed inset-0 cursor-pointer bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={handleInnerClick} // This prevents the modal from closing when clicking the inner content
        className="bg-[#262626] w-[80vw] md:w-[400px] h-[400px] flex items-center justify-center rounded-lg"
      >
        <h2 className="text-white">Add a new post</h2>
      </div>
    </div>
  );
}
