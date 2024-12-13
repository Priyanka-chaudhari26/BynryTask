import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';



const ProfileCard = ({ profile, index, onEdit, onDelete, onView }) => {
  return (
    <div className=" col-8 col-md-4 mb-4" key={index}>
      <div className="card text-center">
     
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <img src={profile.photo} className="circular-image mb-3" alt={profile.name} style={{
    width: '130px',
    height: '135px',
    objectFit: 'cover',
    borderRadius: '50%' 
  }} />
        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">{profile.description}</p>
          <p className="card-text">
            <small className="text-muted">{profile.address}</small>
          </p>
          
          <div className="d-flex justify-content-center gap-4">
            
            <button className="btn-hover color-1" onClick={() => onEdit(index)}>Edit</button>
            
            <button className="btn-hover color-11" onClick={() => onDelete(index)}>Delete</button>
           
            <button className="btn-hover color-7" onClick={() => onView(index)}>View</button>
          </div>
          
          <button className="btn-hover color-4">Summary</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileCard;
