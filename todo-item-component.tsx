import React, { useState } from 'react';
import axios from 'axios';

export const TodoItem = React.forwardRef(({ todo, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = async () => {
    await axios.put(`/api/todos/${todo._id}`, { text });
    setIsEditing(false);
  };

  const handleColorChange = async (color) => {
    await axios.put(`/api/todos/${todo._id}`, { color });
  };

  return (
    <div ref={ref} {...props} className="todo-item" style={{ backgroundColor: todo.color }}>
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
      <ColorPicker onChange={handleColorChange} />
    </div>
  );
});
