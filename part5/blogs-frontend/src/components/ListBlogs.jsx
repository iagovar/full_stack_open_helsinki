import { useState, useEffect } from "react"

import axiosInstance from "../services/axiosInstance";

export default function ListBlogs() {

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("Getting blog list data...");
            const response = await axiosInstance.get("/api/blogs");
            setBlogList(response.data);
        })();
    }, []);

    return (
        <ul>
            {Array.isArray(blogList) && blogList.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
    )
}