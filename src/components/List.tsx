import GaugeChart from "@/components/GaugeChart";
import { CommentWithMeta } from "@/pages/[page]";
import { FC } from "react";

type ListProps = {
  comments: CommentWithMeta[];
};

const List: FC<ListProps> = ({ comments }) => {
  return (
    <ul>
      {comments.map(({ id, name, email, body, wordNumber }) => (
        <li key={id} className="p-4 bg-white rounded-lg shadow-md mb-4 block">
          <div className="flex items-center gap-4">
            <GaugeChart value={wordNumber} max={35} />
            <div>
              <h2 className="font-semibold text-sm">{name}</h2>
              <div className="text-sm text-gray-500">{email}</div>
            </div>
          </div>
          <p className="text-sm leading-loose text-gray-500 mt-4">{body}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
