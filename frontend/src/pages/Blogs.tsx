import { AppBar } from "../components/AppBar";
import { Avatar, BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
// import { Skeleton } from "../components/skeleton";

export const Blogs = () => {


  let {loading, blogs} = useBlogs()
  // loading = true


  // making dates in this format:: 15 March 2025 from this 2025-03-15T10:28:19.118Z

  if(loading){
    return(
      <>
      <AppBar/>
        <div className="flex h-screen items-center w-full flex-col gap-4 ">
          
           loading
        </div>
        </>
    )
  }

  let modified = blogs?.map((blog) => {
    let dateString = blog.published_date.split("T")[0].toString()
    let date = new Date(dateString)
    dateString = date.toLocaleDateString("en-in", {day:"2-digit",month:'long', year:"numeric"})
    return {
      ...blog,
      published_date: dateString
    }
  } )



  return (
    <>
    <AppBar/>
    <div className="flex justify-center flex-col items-center">
      {
        modified.map(blog=> (
          <BlogCard
          authorName={blog.author.name}
          title={blog.title}
          content={blog.content}
          publishDate={blog.published_date}
          id={blog.id}
          key={blog.id}
          /> 
        )  )
      }
    </div>
      </>
  );
};
