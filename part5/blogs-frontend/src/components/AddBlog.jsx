import axiosInstance from "../services/axiosInstance"

export default function AddBlog(props) {

    const { blogList, setBlogList } = props.props;

    function handleAddBlog(event) {
        event.preventDefault();
        const title = event.target.closest("form").title.value;
        const author = event.target.closest("form").author.value;
        const url = event.target.closest("form").url.value;
        axiosInstance.post("/api/blogs", { title, author, url }, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((response) => {
            setBlogList([...blogList, response.data]);
            console.log("Blog added successfully");
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className="addBlog">
            <h2>Add new blog</h2>
            <form>
                <label>
                    Title
                    <input type="text" name="title" />
                </label>
                <label>
                    Author
                    <input type="text" name="author" />
                </label>
                <label>
                    URL
                    <input type="text" name="url" />
                </label>
                <button type="submit" onClick={handleAddBlog}>Add</button>
            </form>
        </div>
    )
}