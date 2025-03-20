import { Link } from "react-router-dom";

export interface BlogInputs {
  authorName: string;
  publishDate: string;
  title: string;
  content: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  publishDate,
  title,
  content,
  id
}: BlogInputs) => {
  return (
    <Link to={`/blog/${id}`} className="p-4 max-w-full mx-3 md:max-w-1/2 min-w-1/2 shadow-xl rounded-b-xl mt-1 cursor-pointer">
    <div className="p-4 max-w-full ">
      <div className="flex ">
        <div className="flex flex-col justify-center">
          <Avatar authorName={authorName} />
        </div>
        <div className="font-bold">{authorName}</div>
        <div className="flex flex-col justify-center px-4">
          <Dot />
        </div>
        <div className="text-slate-500 font-thin">{publishDate}</div>
      </div>

      <div className="text-2xl font-semibold">{title}</div>
      <div className="text-xl font-extralight">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-xs pt-3 text-slate-500 font-thin ">
        {Math.ceil(content.length / 100) + " minute(s) to read"}
      </div>

      <div className="w-full h-0.5  bg-slate-200 mt-4"></div>
    </div>
    </Link>
  );
};

export const Avatar = ({ authorName }: { authorName: string }) => {
  let name = authorName[0];
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name}
      </span>
    </div>
  );
};

const Dot = () => {
  return <div className="bg-black w-1 h-1 border-2  rounded-full"></div>;
};
