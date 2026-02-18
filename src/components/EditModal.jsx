import { useState } from 'react';

export default function EditModal({ todo, onSave, onCancel }) {
  // We initialize the input state with the EXISTING task details
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.description);

  const handleSubmit = () => {
    // Send the updated data back up to the parent
    onSave(todo.id, title, desc);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Task</h3>
        
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title"
        />
        
        <input 
          type="text" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          placeholder="Description"
        />
        
        <div className="modal-buttons">
          <button id="save-edit-btn" onClick={handleSubmit}>
            Save Changes
          </button>
          
          <button 
            id="cancel-edit-btn" 
            onClick={onCancel} 
            style={{ backgroundColor: '#6c757d' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}