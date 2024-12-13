import React from 'react';

const ProfileDetails = ({ profile, onClose }) => {
  if (!profile) return 'No Profiles found!'; 

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <img src={profile.photo} className="circular-image mb-3" alt={profile.name} style={{
    width: '130px',
    height: '165px',
    objectFit: 'cover',
    borderRadius: '50%' 
  }}/>
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text">{profile.description}</p>
            <p className="card-text">
              <small className="text-muted">{profile.address}</small>
            </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
