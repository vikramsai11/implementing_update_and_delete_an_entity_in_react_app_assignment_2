import React from "react";

const Item = ({ item, deleteItem }) => {

  // Render a single item
  // Add a Delete and Edit button
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <div className="item">
      <p>{item.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};


export default Item;