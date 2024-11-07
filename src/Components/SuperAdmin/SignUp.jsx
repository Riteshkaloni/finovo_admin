import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { BaseUrl } from '../baseUrl';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
//   const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BaseUrl}/admin/signupSuperAdmin`, { email, password });
    //   setUserId(response.data.data.user_id);

      if (response.status === 200 || response.status === 201) {
        setStep(2);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError(error);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BaseUrl}/admin/verifyEmailOTP/1`, { otp });
      if (response.status === 200 || response.status === 201) {
        navigate('/navbar');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex justify-center items-center my-4 sm:my-10 p-4 h-[100%] w-[100vw]">
      <div className="w-full max-w-sm bg-slate-600 shadow-lg p-8 rounded-lg border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {step === 1 ? 'Login' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <form onSubmit={sendOtp}>
            <div className="mb-4">
              <label className="block text-slate-100 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 font-bold"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-100 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Request OTP
            </button>
            {error && <p className="text-red-600 font-bold text-center mt-6">{error}</p>}
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="mb-4">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1"></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 text-center border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 mx-auto"
                    style={{ fontSize: '24px' }}
                    maxLength={1}
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
            {error && <p className="text-red-600 font-bold text-center mt-6">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
