import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { BiCustomize } from 'react-icons/bi';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featureName, setFeatureName] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [addFeatureError, setAddFeatureError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // For storing profile picture URL

  // Fetch profile picture
  const fetchProfilePicture = async () => {
    const API_URL = `${BaseUrl}/admin/getProfilePictureAdmin
`;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProfilePicture(response.data.profilePictureUrl); // Assuming API returns the image URL
      }
    } catch (err) {
      console.error('Failed to fetch profile picture:', err);
      setError('Failed to load profile picture.');
    }
  };

  const fetchFeaturesData = async () => {
    const API_URL = `${BaseUrl}/admin/getAllFeatures`;
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const featuresData = response.data?.features || [];
      setFeatures(featuresData);
    } catch (err) {
      console.error('Failed to fetch features:', err);
      setError('Failed to fetch features.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = async () => {
    if (!token) {
      setAddFeatureError('No token found in local storage.');
      return;
    }

    const apiUrl = `${BaseUrl}/admin/addNewFeature`;
    const featureData = { featureName };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(featureData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setAddFeatureError(errorResult.message || 'Failed to add feature.');
        return;
      }

      const result = await response.json();
      setResponseData(result);
      setAddFeatureError('');

      fetchFeaturesData();
    } catch (error) {
      setAddFeatureError('An error occurred while adding the feature.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFeaturesData();
      fetchProfilePicture(); // Fetch profile picture on component mount
    } else {
      setError('No token found in local storage.');
    }
  }, [token]);

  const handleFeatureClick = (featureName) => {
  switch (featureName) {

    case 'User and Permission':
      navigate('/allfeatures');
      break;
    case 'Dashboard':
      navigate('/dashboard');
      break;
    case 'UserManagement':
      navigate('/userManagement'); // Adjust the route if needed
      break;
    default:
      console.error('Unknown feature:', featureName);
      break;
  }
};


  return (
    <div className="w-[270px] rounded-s-lg">
      <aside>
        <div className="px-3 py-4 h-[100vh] bg-[#07553B] ml-2 rounded-xl overflow-x-auto">
          <div className="flex justify-center p-2 text-white">
            <div className="flex justify-start p-1">
              <MdDashboard />
            </div>
            <span className="ml-2 font-xl">FINOVO ADMIN</span>
          </div>

          <hr className="border-t border-[#CED46A] my-2" />

          {/* Profile Picture */}
          <div className="text-center mb-2">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto"
              />
            ) : (
              <p className="text-[#CED46A]">Loading profile...</p>
            )}
          </div>

          <hr className="border-t border-[#CED46A] my-2" />

          <div className="mt-4">
            <h3 className="text-[#CED46A] mb-2">Features List</h3>
            {loading && <p className="text-[#CED46A]">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-7">
              {features.length === 0 && !loading && (
                <p className="text-[#CED46A]">No features found</p>
              )}
              {features.map((feature) => (
                <li
                  key={feature.feature_id}
                  className="flex items-center p-2 text-white bg-[#CED46A] border-2 border-[#CED46A] rounded-xl cursor-pointer hover:bg-blue-800 mt-7"
                  onClick={() => handleFeatureClick(feature.featureName)}
                >
                  <BiCustomize className="mr-2" />
                  <span>{feature.featureName}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-[#CED46A] mb-2">Add New Feature</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter feature name"
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                className="w-full p-2 rounded"
              />
            </div>
            <button
              onClick={handleAddFeature}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Feature
            </button>
            {responseData && (
              <div className="mt-4 text-green-500">
                <p>Feature added successfully!</p>
                <p>
                  <strong>ID:</strong> {responseData.newFeature.feature_id}
                </p>
                <p>
                  <strong>Name:</strong> {responseData.newFeature.featureName}
                </p>
              </div>
            )}
            {addFeatureError && (
              <p className="mt-2 text-red-500">{addFeatureError}</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
