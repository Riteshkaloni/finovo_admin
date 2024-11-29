import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../baseUrl";
import Header from "../../../Header/Header";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AllFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedSubFeatures, setSelectedSubFeatures] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [invitationError, setInvitationError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const API_URL = `${BaseUrl}/admin/getAllFeatures`;
  const INVITE_API_URL = `${BaseUrl}/admin/sendInvitationToSubAdmin`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeatures(response.data?.features || []);
      } catch (err) {
        setError("Failed to fetch features.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [token]);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const handleFeatureCheckboxChange = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubFeatureCheckboxChange = (subFeatureId) => {
    setSelectedSubFeatures((prev) =>
      prev.includes(subFeatureId)
        ? prev.filter((id) => id !== subFeatureId)
        : [...prev, subFeatureId]
    );
  };

  const toggleFeatureDropdown = (featureId) => {
    setExpandedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSendInvitation = async () => {
    setInvitationError("");
    setSuccessMessage("");

    if (!email || !role || selectedFeatures.length === 0) {
      setInvitationError("Please fill in all fields and select at least one feature.");
      return;
    }

    const payload = {
      email,
      role: [Number(role)],
      featureIds: selectedFeatures,
      subFeatureIds: selectedSubFeatures,
    };

    try {
      const response = await axios.post(INVITE_API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(".............",response.data.token)
      const subAdminToken =response.data.token

      if ([200, 201].includes(response.status)) {
        setSuccessMessage("Invitation sent successfully!");
        setEmail("");
        setRole("");
        setSelectedFeatures([]);
        setSelectedSubFeatures([]);
        localStorage.setItem('subToken', subAdminToken)

      } else {
        setInvitationError("Failed to send the invitation.");
      }
    } catch (err) {
      setInvitationError("An error occurred while sending the invitation.");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-0">
      <div className="flex">
        <div className="flex-1 w-[80vw]">
          <div className="flex items-center p-4 bg-blue-50">
            <Header />
          </div>
          <div className="max-w-4xl mx-auto bg-[#07553B] shadow-md rounded-lg p-6 mt-3">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#CED46A]">
              Invite Manager or Editor
            </h2>
            <div className="mb-6 flex justify-between items-center">
  <div className="flex space-x-2">
    <button
      onClick={togglePopup}
      className="px-4 py-2 text-white bg-[#CED46A] rounded hover:bg-blue-700"
    >
      Select Features
    </button>
    <button
      onClick={() => navigate("/SubAdminProfile")}
      className="px-4 py-2 text-white bg-[#CED46A] rounded hover:bg-blue-700"
    >
       Staff List
    </button>
  </div>
  <button
    className="px-4 py-2 text-white bg-[#CED46A] rounded hover:bg-blue-700"
  >
    Add Staff
  </button>
</div>

            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full mb-4 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CED46A]"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 p-3 border border-[#CED46A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CED46A]"
              >
                <option value="">Select Role</option>
                <option value="1">Sub-Admin</option>
                <option value="2">Manager</option>
                <option value="3">Editor</option>
              </select>
              {invitationError && <p className="text-red-600 mb-4">{invitationError}</p>}
              {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            </div>
            <button
              onClick={handleSendInvitation}
              className="w-full p-3 text-white bg-[#CED46A] border-2 rounded-xl cursor-pointer"
            >
              Send Invitation
            </button>
          </div>
          {selectedFeatures.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Selected Features:</h3>
              <ul className="list-disc pl-6">
                {features
                  .filter((feature) => selectedFeatures.includes(feature.feature_id))
                  .map((feature) => (
                    <li key={feature.feature_id} className="text-black">
                      {feature.featureName}
                      <ul className="pl-6">
                        {feature.subFeatures
                          ?.filter((subFeature) =>
                            selectedSubFeatures.includes(subFeature.subFeature_id)
                          )
                          .map((subFeature) => (
                            <li key={subFeature.subFeature_id} className="text-blue-400">
                              {subFeature.subFeatureName}
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#07553B] p-6 rounded-lg shadow-lg w-4/5 max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-[#CED46A]">
              Select Features and Sub-Features
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature) => (
                <div key={feature.feature_id}>
                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-[#CED46A]"
                        checked={selectedFeatures.includes(feature.feature_id)}
                        onChange={() => handleFeatureCheckboxChange(feature.feature_id)}
                      />
                      <span className="text-[#CED46A]">{feature.featureName}</span>
                    </label>
                    <button
                      onClick={() => toggleFeatureDropdown(feature.feature_id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {expandedFeatures.includes(feature.feature_id) ? (
                        <FaArrowUpLong />
                      ) : (
                        <FaArrowDownLong />
                      )}
                    </button>
                  </div>
                  {expandedFeatures.includes(feature.feature_id) && (
                    <div className="ml-6 mt-2">
                      {feature.subFeatures?.map((subFeature) => (
                        <label
                          key={subFeature.subFeature_id}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-400"
                            checked={selectedSubFeatures.includes(subFeature.subFeature_id)}
                            onChange={() =>
                              handleSubFeatureCheckboxChange(subFeature.subFeature_id)
                            }
                          />
                          <span className="text-blue-600">{subFeature.subFeatureName}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={togglePopup}
              className="mt-4 px-4 py-2 text-white bg-[#CED46A] rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFeatures;
