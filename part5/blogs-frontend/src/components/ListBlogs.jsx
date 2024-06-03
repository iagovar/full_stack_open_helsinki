import { useState, useEffect } from "react"

import axiosInstance from "../services/axiosInstance";

import AddBlog from "./AddBlog";

export default function ListBlogs() {

    const [blogList, setBlogList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(undefined);

    function handleDeleteBlog(blogId) {
        // Ask for confirmation
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }
        setErrorMsg(undefined);
        axiosInstance.delete(`/api/blogs/${blogId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }).catch(error => {
            console.error(error);
            setErrorMsg(error.response.data.error);
        }).then((response) => {
            if (response.status === 204) {
                setBlogList(blogList.filter(blog => blog.id !== blogId));
                setErrorMsg("Blog deleted successfully");
            }
        })
    }

    useEffect(() => {
        (async () => {
            console.log("Getting blog list data...");
            const response = await axiosInstance.get("/api/blogs");
            setBlogList(response.data);
        })();
    }, []);

    return (
        <div className="listBlogs">
            {errorMsg && setTimeout(() => setErrorMsg(undefined), 3000) && <div className="errorMsg">{errorMsg}</div>}
            <ul>
                {blogList.length > 0 && blogList.map(blog => <li key={blog.id}>{blog.title} - <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button></li>)}
            </ul>
            <AddBlog props={{blogList, setBlogList}} />
        </div>
    )
}