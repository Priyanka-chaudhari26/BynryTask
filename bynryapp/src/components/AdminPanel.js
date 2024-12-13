import React, { useState } from 'react';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    contact: '',
    
  });

  const handleAddProfile = () => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setNewProfile({
      name: '',
      photo: '',
      description: '',
      address: '',
      contact: '',
      
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
     
      <button onClick={handleAddProfile}>Add Profile</button>
    </div>
  );
};

export default AdminPanel;
