import { useState } from "react";

export default function PostComponent({ text, postId, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(postId, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="single-post">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{text}</p>
      )}
      <span className="options">
        <i className="fas fa-edit" onClick={handleEdit}></i>
        <i className="fas fa-trash-alt" onClick={() => onDelete(postId)}></i>
      </span>
    </div>
  );
}
