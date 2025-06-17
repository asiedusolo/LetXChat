import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('No verification token provided');
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email`, {
            params: { token }
          }
        );
        if (response.data.success) {
          setStatus('success')
          setMessage('Your email has been verified successfully!');
        }
        else if(response.data.alreadyVerified){
            setStatus('success')
            setMessage('Your email has been already verified!')
        }
        else if(response.data.expiredToken){
            setStatus('error')
            setMessage('This verification link has expired. Please request a new one.')
        } 
        else if(response.data.invalidToken){
            setStatus('error')
            setMessage('This verification link has already been used or has expired.')
        } 
        else {
          setStatus('error');
          setMessage(response.data.msg || 'Email verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.msg ||
          'An error occurred during verification. Please try again.'
        );
        console.error('Verification error:', error);
      }
    };

    verifyEmailToken();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Let<span className="text-blue-600">X</span>Chat
        </h2>
        <p className="text-center text-sm text-gray-600">
          Email Verification
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center">
            {status === 'verifying' && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-700">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <FiCheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Verification Successful!
                </h3>
                <p className="text-gray-700 text-center mb-6">{message}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue to Login
                </button>
              </>
            )}

            {status === 'error' && (
              <>
                <FiXCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Verification Failed
                </h3>
                <p className="text-gray-700 text-center mb-6">{message}</p>
                <div className="space-y-3 w-full">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            onClick={() => navigate('/')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Return to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;