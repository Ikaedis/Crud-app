import React, { useState } from "react";

export default function PostComponent({ text, postId, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (isEditing) {
      setIsLoading(true);
      try {
        await onEdit(postId, editedText);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to edit post:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="single-post">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          disabled={isLoading}
        />
      ) : (
        <p>{text}</p>
      )}
      <span className="options">
        <button onClick={handleEdit} disabled={isLoading}>
          {isEditing ? (isLoading ? "Saving..." : "Save") : "Edit"}
        </button>
        <button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </span>
    </div>
  );
}
