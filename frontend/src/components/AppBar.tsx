import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
  return (
    <div>
        <div className="flex justify-between p-4 mb-3 border-b-1 border-gray-500 mx-2">
            <Link to={'/'}>
            <div className="text-2xl text-black-700 font-medium">Medium</div>
            </Link>
            <div>
                <Avatar authorName="Yash"/>
            </div>
        </div>
    </div>
  )
}
