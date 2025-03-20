import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface Blog{
    id: string
    title: string,
    content: string,
    author: {
        name: string
    },
    published_date: string,

}

export const useBlogs = ()=> {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])



    useEffect(()=> {
        let token = "Bearer " + localStorage.getItem("token");
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization: token
            }
        })
        .then(res => {
            
            setBlogs(res.data.posts ) 
            setLoading(false)
        })
    },[])
    return{
        loading,
        blogs
    }
}