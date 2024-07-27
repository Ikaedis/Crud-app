import { useState } from "react";

export default function PostComponent(props) {
  const { ownPost, setPosts, postsState } = props;
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    if (isEditing === false) {
      console.log(
        postsState.map((post) => {
          return post.id === id ? { ...post, hola: "hola" } : post;
        })
      );
    }
  };

  const handleDelete = () => {
    console.log("deleted");
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== ownPost.id));
  };

  return (
    <div className="single-post">
      {isEditing ? <textarea></textarea> : <p>{ownPost.text}</p>}
      <span className="options">
        <i
          className="fas fa-edit"
          onClick={() => {
            handleEdit(ownPost.id);
          }}
        ></i>
        <i
          className="fas fa-trash-alt"
          onClick={() => {
            handleDelete();
          }}
        ></i>
      </span>
    </div>
  );
}
