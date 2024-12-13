import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileDetails from './components/ProfileDetails';
import SearchFilter from './components/SearchFilter';
import ProfileCard from './components/ProfileCard';
import { Navbar, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import MapComponent from './components/MapComponent';

const ProfileForm = ({ handleAddProfile, profile, handleInputChange, handleFileChange, address, setAddress, handleGeocode, location }) => {
  
  return (
    <form onSubmit={handleAddProfile}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={profile.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={profile.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          value={profile.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          className="form-control"
          value={profile.contact}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="photo">Profile Photo</label>
        <input
          type="file"
          id="photo"
          className="form-control"
          onChange={handleFileChange}
        />
        {profile.photo && (
          <img
            src={profile.photo}
            alt="Profile Preview"
            className="mt-2 circular-image"
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}}
          />
        )}
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProfile, setNewProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    contact: ''
  });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);

  const handleInputChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (jpg or png).');
        
        console.log('invalid file type: ' + file.type);
        return; 
      }
  
     
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        alert('File size is too large. Please upload a smaller image (max 5MB).');
        console.log('Invalid file size:', file.size);
        return; 
      }
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        photo: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.description && newProfile.address && newProfile.contact) {
      setProfiles([...profiles, newProfile]);
      setNewProfile({ name: '', photo: '', description: '', address: '', contact: ''});
      setShowForm(false);
    }
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  
  );

  const handleViewProfile = async (profile) => {
    setSelectedProfile(profile);
    setShowProfileDetails(true);


  };

  const handleCloseProfileDetails = () => {
    setShowProfileDetails(false);
    setSelectedProfile(null);
  };

  
  const handleDeleteProfile = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
  };

 
  const handleEditProfile = (index) => {
    const profileToEdit = profiles[index];
    setNewProfile(profileToEdit);
    handleDeleteProfile(index); 
    setShowForm(true);
  };
  const getGeocode = async (address) => {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;

    try {
      const response = await axios.get(url, {
        params: {
          address,
          key: apiKey,
        },
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return{lat, lng};
        // setLocation({ lat, lng });
      } else {
        alert('No results found for the given address');
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };

  const handleGeocode = async (address) => {
    if (address.trim()) {
      try{
        const result = await getGeocode(address);
        setLocation(result);
      }catch (error) {
        alert("Failed to fetch location");
      }
      
    } else {
      alert('Please enter a valid address');
    }
  };

  return (
    <div className="App">
      <Navbar class="navbar navbar-light" style={{backgroundColor:'#739dc8e4'}}>
        <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
        <Button
          variant="light"
          onClick={() => setShowForm(!showForm)}
        >
          Add Profile
        </Button>
      </Navbar>

      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {showForm && (
        <div className="container mt-4">
          <ProfileForm
            profile={newProfile}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleAddProfile={handleAddProfile}
            setAddress={setAddress}
            
          />
        </div>
      )}

      <div className="profile-list mt-4">
        <div className="container">
          <div className="row">
            {filteredProfiles.map((profile, index) => (
              
      <ProfileCard
        key={index}
        profile={profile}
        index={index}
        onEdit={() => {         
          handleEditProfile(index);
        }}
        onDelete={() => {
          handleDeleteProfile(index);
        }}
        onView={() => {handleViewProfile(profile)}} 
        onSummary={() => {handleGeocode(profile.address)}}
      />
    
            ))}
          </div>
        </div>
      </div>

      {showProfileDetails && (
        <Modal show={showProfileDetails} onHide={handleCloseProfileDetails}>
         
          <Modal.Body>
            <ProfileDetails profile={selectedProfile} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProfileDetails}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default App;
