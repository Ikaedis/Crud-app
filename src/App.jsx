import React, { useState, useEffect } from "react";
import "./App.css";
import PostComponent from "./components/PostComponent";

// Simulated API functions
const api = {
  getPosts: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem("posts") || "[]"));
      }, 500);
    }),

  createPost: (post) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem("posts") || "[]");
        const newPost = { ...post, id: Date.now() };
        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
        resolve(newPost);
      }, 500);
    }),

  updatePost: (id, updates) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem("posts") || "[]");
        const postIndex = posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          posts[postIndex] = { ...posts[postIndex], ...updates };
          localStorage.setItem("posts", JSON.stringify(posts));
          resolve(posts[postIndex]);
        } else {
          reject(new Error("Post not found"));
        }
      }, 500);
    }),

  deletePost: (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem("posts") || "[]");
        const newPosts = posts.filter((post) => post.id !== id);
        if (newPosts.length < posts.length) {
          localStorage.setItem("posts", JSON.stringify(newPosts));
          resolve();
        } else {
          reject(new Error("Post not found"));
        }
      }, 500);
    }),
};

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await api.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = document.getElementById("input");
    const text = input.value.trim();
    if (!text) return;

    setIsLoading(true);
    setError(null);
    try {
      const newPost = await api.createPost({ text });
      setPosts((prevPosts) => [...prevPosts, newPost]);
      input.value = "";
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newText) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPost = await api.updatePost(id, { text: newText });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    } catch (err) {
      setError("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Social Media App</h1>
      {error && <div className="error">{error}</div>}
      <div className="container">
        <div className="left">
          <form id="form" onSubmit={handleSubmit}>
            <label htmlFor="post">Write your post here</label>
            <br />
            <br />
            <textarea name="post" id="input" cols="30" rows="10"></textarea>
            <br />
            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
        <div className="right">
          <h3>Your posts here</h3>
          {isLoading && <div>Loading...</div>}
          <div id="posts">
            {posts.map((post) => (
              <PostComponent
                key={post.id}
                text={post.text}
                postId={post.id}
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
