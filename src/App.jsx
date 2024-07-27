import { useState, useEffect } from "react";
import "./App.css";
import PostComponent from "./components/PostComponent";

function App() {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = function (event) {
    event.preventDefault();
    const inputValue = document.getElementById("input").value;

    if (inputValue === "") {
      alert("The post you're trying to submit is empty");
    } else {
      const data = { text: inputValue, postId: Date.now() };

      setPosts((prevPosts) => [...prevPosts, data]);
      setInputValue(""); // Clear the input after posting
    }
  };

  const handleDelete = function (id) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== id));
  };

  const handleEdit = function (id, newText) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === id ? { ...post, text: newText } : post
      )
    );
  };

  useEffect(() => {
    console.log(posts); // Log posts after state has been updated
  }, [posts]);

  return (
    <div className="App">
      <h1>Social Media App</h1>
      <div className="container">
        <div className="left">
          <form id="form" onSubmit={handleSubmit}>
            <label htmlFor="post">Write your post here</label>
            <br />
            <br />
            <textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              name="post"
              id="input"
              cols="30"
              rows="10"
            ></textarea>
            <br />
            <br />
            <div id="msg"></div>
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="right">
          <h3>Your posts here</h3>
          <div id="posts">
            {posts.map((post) => (
              <PostComponent
                key={post.postId}
                text={post.text}
                postId={post.postId}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
