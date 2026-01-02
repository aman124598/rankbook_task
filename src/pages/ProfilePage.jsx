import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiCalendar, FiCamera, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser, userProfile, updateUserProfile, uploadProfilePicture, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || '',
    phone: userProfile?.phone || '',
    licenseNumber: userProfile?.licenseNumber || '',
    licenseExpiry: userProfile?.licenseExpiry || '',
    address: userProfile?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(currentUser.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile?.fullName || '',
      phone: userProfile?.phone || '',
      licenseNumber: userProfile?.licenseNumber || '',
      licenseExpiry: userProfile?.licenseExpiry || '',
      address: userProfile?.address || ''
    });
    setIsEditing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    try {
      await uploadProfilePicture(currentUser.id, file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Always navigate home, even if there's an error
      // State is cleared immediately in logout()
      navigate('/');
    }
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="page flex-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <div className="container">
        <div className="profile-header-section">
          <div className="profile-cover">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {userProfile.profilePicture ? (
                  <img src={userProfile.profilePicture} alt="Profile" />
                ) : (
                  <span>{userProfile.fullName?.charAt(0) || 'U'}</span>
                )}
              </div>
              <button 
                className="avatar-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                <FiCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                hidden
              />
            </div>
          </div>
          
          <div className="profile-header-info">
            <h1>{userProfile.fullName}</h1>
            <p>{currentUser.email}</p>
            <span className="member-since">Member since {new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                  <FiEdit2 /> Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-ghost btn-sm" onClick={handleCancel}>
                    <FiX /> Cancel
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={loading}>
                    <FiSave /> {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form">
              <div className="form-grid">
                <div className="profile-field">
                  <label>
                    <FiUser /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input"
                    />
                  ) : (
                    <p>{userProfile.fullName}</p>
                  )}
                </div>

                <div className="profile-field">
                  <label>
                    <FiMail /> Email
                  </label>
                  <p>{currentUser.email}</p>
                </div>

                <div className="profile-field">
                  <label>
                    <FiPhone /> Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  ) : (
                    <p>{userProfile.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="profile-field">
                  <label>
                    <FiCreditCard /> License Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="form-input"
                    />
                  ) : (
                    <p>{userProfile.licenseNumber || 'Not provided'}</p>
                  )}
                </div>

                <div className="profile-field">
                  <label>
                    <FiCalendar /> License Expiry
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="licenseExpiry"
                      value={formData.licenseExpiry}
                      onChange={handleChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() + 20)).toISOString().split('T')[0]}
                    />
                  ) : (
                    <p>{userProfile.licenseExpiry ? new Date(userProfile.licenseExpiry).toLocaleDateString() : 'Not provided'}</p>
                  )}
                </div>

                <div className="profile-field full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-input"
                      rows={3}
                    />
                  ) : (
                    <p>{userProfile.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-aside">
            <div className="quick-links">
              <h3>Quick Links</h3>
              <button onClick={() => navigate('/bookings')} className="quick-link">
                View My Bookings
              </button>
              <button onClick={() => navigate('/favorites')} className="quick-link">
                My Favorites
              </button>
              <button onClick={() => navigate('/vehicles')} className="quick-link">
                Browse Vehicles
              </button>
            </div>

            <div className="danger-zone">
              <h3>Account Actions</h3>
              <button onClick={handleLogout} className="btn btn-outline logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
