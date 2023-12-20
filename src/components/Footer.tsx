import { toggleColor } from "@/stores/colorStore";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white flex items-center justify-between px-4 py-2 shadow-md">
      <button
        onClick={() => dispatch(toggleColor())}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Toggle color
      </button>
    </footer>
  );
};

export default Footer;
