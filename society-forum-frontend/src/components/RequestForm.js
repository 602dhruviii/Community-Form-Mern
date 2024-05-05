// src/components/RequestForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RequestForm.css';

const RequestForm = ({ onAddRequest }) => {
  const [residentName, setResidentName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('residentName', residentName);
      formData.append('content', content);
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onAddRequest(response.data);
      setResidentName('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div className="request-form-container">
      
      <form onSubmit={handleSubmit} className="request-form">
      <h2 className="form-title">Create a Request</h2>
        <div className="form-group">
          <label htmlFor="residentName" className="form-label">Resident Name:</label>
          <input
            id="residentName"
            type="text"
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-input"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
