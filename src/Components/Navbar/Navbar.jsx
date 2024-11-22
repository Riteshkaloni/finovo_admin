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

  const API_URL = `${BaseUrl}/admin/getAllFeatures`;

  const fetchFeaturesData = async () => {
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

  useEffect(() => {
    if (token) {
      fetchFeaturesData();
    } else {
      setError('No token found in local storage.');
    }
  }, [token]);

  const handleFeatureClick = (featureName) => {
    switch (featureName) {
      case 'Dashboard':
        navigate('/Dashboard');
        break;
      case 'User and Permission':
        navigate('/allfeatures');
        break;
      default:
        console.error('Unknown feature:', featureName);
        break;
    }
  };

  return (
    <div className="w-[270px] rounded-s-lg">
      <aside>
        <div className="px-3 py-4 h-[100vh] bg-blue-900 ml-2 rounded-xl overflow-x-auto">
          <div className="flex justify-center p-2 text-white">
            <div className="flex justify-start p-1">
              <MdDashboard />
            </div>
            <span className="ml-2">FINOVO ADMIN</span>
          </div>

          <hr className="border-t border-blue-700 my-2" />

          <button className="text-white text-center w-full mb-2 bg-blue-700 hover:bg-blue-800 py-2 rounded-md">
            Ritesh
          </button>
          <hr className="border-t border-blue-700 my-2" />

          <div className="mt-4">
            <h3 className="text-blue-300 mb-2">Features List</h3>
            {loading && <p className="text-blue-300">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-7">
              {features.length === 0 && !loading && (
                <p className="text-blue-300">No features found</p>
              )}
              {features.map((feature) => (
                <li
                  key={feature.feature_id}
                  className="flex items-center p-2 text-white bg-blue-700 border-2 border-blue-600 rounded-xl cursor-pointer hover:bg-blue-800 mt-7"
                  onClick={() => handleFeatureClick(feature.featureName)}
                >
                  <BiCustomize className="mr-2" />
                  <span>{feature.featureName}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="text-white text-center w-full mb-2 bg-blue-700 hover:bg-blue-800 py-2 rounded-md mt-5"
            onClick={() => handleFeatureClick('User and Permission')}
          >
            User and Permission
          </button>
          <hr className="border-t border-blue-700 my-2" />
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
