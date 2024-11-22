import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../baseUrl";
import Header from "../../../Header/Header";

const AllFeatures = () => {
  const [features, setFeatures] = useState([]); // List of features with sub-features
  const [selectedFeatures, setSelectedFeatures] = useState([]); // Selected feature IDs
  const [selectedSubFeatures, setSelectedSubFeatures] = useState([]); // Selected sub-feature IDs
  const [expandedFeatures, setExpandedFeatures] = useState([]); // Tracks which features have their sub-feature dropdown open
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [invitationError, setInvitationError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup visibility

  const API_URL = `${BaseUrl}/admin/getAllFeatures`;
  const INVITE_API_URL = `${BaseUrl}/admin/sendInvitationToSubAdmin`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFeatures = async () => {
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
        setError("Failed to fetch features.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [token]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen); // Toggle popup

  const handleFeatureCheckboxChange = (featureId) => {
    setSelectedFeatures((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
  };

  const handleSubFeatureCheckboxChange = (subFeatureId) => {
    setSelectedSubFeatures((prevSelected) =>
      prevSelected.includes(subFeatureId)
        ? prevSelected.filter((id) => id !== subFeatureId)
        : [...prevSelected, subFeatureId]
    );
  };

  const toggleFeatureDropdown = (featureId) => {
    setExpandedFeatures((prevExpanded) =>
      prevExpanded.includes(featureId)
        ? prevExpanded.filter((id) => id !== featureId)
        : [...prevExpanded, featureId]
    );
  };

  const handleSendInvitation = async () => {
    setInvitationError("");
    setSuccessMessage("");

    if (!email || !role || selectedFeatures.length === 0) {
      setInvitationError(
        "Please fill in all fields and select at least one feature."
      );
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

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Invitation sent successfully!");
        setEmail("");
        setRole("");
        setSelectedFeatures([]);
        setSelectedSubFeatures([]);
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

          <div className="max-w-3xl mx-auto bg-blue-100 shadow-md rounded-lg p-6 mt-3">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              Invite Manager or Editor
            </h2>

            <div className="mb-6">
              <button
                onClick={togglePopup}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Select Features
              </button>
            </div>

            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full mb-4 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="2">Sub-Admin</option>
                <option value="2">Manager</option>
                <option value="3">Editor</option>
              </select>

              {invitationError && (
                <p className="text-red-600 mb-4">{invitationError}</p>
              )}
              {successMessage && (
                <p className="text-green-600 mb-4">{successMessage}</p>
              )}
            </div>

            <button
              onClick={handleSendInvitation}
              className="w-full p-3 text-white bg-blue-600 border-2 rounded-xl cursor-pointer hover:bg-blue-700"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Popup for Selecting Features */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Select Features and Sub-Features
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature) => (
                <div key={feature.feature_id}>
                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedFeatures.includes(feature.feature_id)}
                        onChange={() =>
                          handleFeatureCheckboxChange(feature.feature_id)
                        }
                      />
                      <span className="text-blue-800">
                        {feature.featureName}
                      </span>
                    </label>
                    <button
                      onClick={() => toggleFeatureDropdown(feature.feature_id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {expandedFeatures.includes(feature.feature_id)
                        ? "Hide Sub-Features"
                        : "Show Sub-Features"}
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
                            checked={selectedSubFeatures.includes(
                              subFeature.subFeature_id
                            )}
                            onChange={() =>
                              handleSubFeatureCheckboxChange(
                                subFeature.subFeature_id
                              )
                            }
                          />
                          <span className="text-blue-600">
                            {subFeature.subFeatureName}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={togglePopup}
              className="mt-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
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
