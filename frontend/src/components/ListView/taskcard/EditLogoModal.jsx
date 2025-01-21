import React, { useState, useEffect } from "react";
import axios from "axios";

function EditLogoModal({ task, show, onClose }) {
  const currentSrc = task?.custom_fields?.["Profile Picture"]?.value || "";
  const [customSrc, setCustomSrc] = useState(currentSrc);
  const [customFields, setCustomFields] = useState({});

  // Update custom fields when `currentSrc` changes
  useEffect(() => {
    if (currentSrc) {
      setCustomFields({ "Profile Picture": currentSrc });
    }
  }, [currentSrc]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCustomSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTaskUpdate = async (event) => {
    setCustomFields({ "Profile Picture": customSrc });
    event.preventDefault(); // Prevent the default form submission

    try {
      if (Object.keys(customFields).length > 0) {
        // Update task custom field
        const response = await axios.post(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/updateTaskCustomFields/${task.task_id}`, { newId:customSrc ,customFieldId:23});
        console.log("Custom fields updated:");
      } else {
        // Add new custom fields
        const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/addTaskCustomFields`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 23: customSrc, "newTaskId":task.task_id }),
        });
        console.log("Custom fields added:", response.data);
      }

      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update the task. Please try again.");
    }
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile Image</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleFileUpload} />
            </div>
            <div className="mb-3">
              <label className="form-label">Paste Image URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://example.com/image.jpg"
                value={customSrc}
                onChange={(e) => setCustomSrc(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleTaskUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLogoModal;
