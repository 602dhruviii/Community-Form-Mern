// src/components/RequestList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestForm from './RequestForm';

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/requests/${id}/like`);
      fetchRequests();
    } catch (error) {
      console.error('Error liking request:', error);
    }
  };

  return (
    <div className="request-list-container">
      <RequestForm onAddRequest={(newRequest) => setRequests([newRequest, ...requests])} />
      <ul className="request-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <p className="resident-name">{request.residentName}</p>
            <p className="request-content">{request.content}</p>
            {/* Display the image if it exists */}
            {request.image && <img src={`http://localhost:5000/${request.image}`} alt="Request" className="request-image" width="200px" height="300px"/> }
            <p className="likes">Support: {request.likes}</p>
            <button className="like-button" onClick={() => handleLike(request._id)}>Support</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
