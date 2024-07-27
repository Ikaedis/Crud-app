import { useState, useEffect } from "react";
import "./App.css";
import PostComponent from "./components/PostComponent";

function App() {
  const [posts, setPosts] = useState([{ text: "text1", id: 1 }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById("input").value;
    const newPostData = { text: text, id: Date.now() };
    setPosts([...posts, newPostData]);
  };

  useEffect(() => {
    console.log(posts);
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
            <textarea name="post" id="input" cols="30" rows="10"></textarea>
            <br />
            <br />
            <div id="msg"></div>
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="right">
          <h3>Your posts here</h3>
          <div id="posts">
            {posts.map((post, index) => (
              <PostComponent
                key={index}
                ownPost={post}
                setPosts={setPosts}
                postsState={posts}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
