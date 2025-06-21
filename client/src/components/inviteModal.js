// components/InviteModal.js
import React, { useState } from 'react';
import { FiX, FiUserPlus, FiMail, FiUsers } from 'react-icons/fi';
import axios from 'axios';

const InviteModal = ({ isOpen, onClose, currentUser }) => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [chatName, setChatName] = useState('');
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(e => e !== emailToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        if (isGroupChat) {
            // create chat room
            console.log("Group chat")
            const chatRoomCreationPayload = {
                creatorId: currentUser._id,
                chatRoomName: chatName
            };
            const chatRoomResponse = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/chatRooms`,
                chatRoomCreationPayload
            );

            console.log({ chatRoomResponse });

            const chatRoomId = chatRoomResponse.data._id;

            const invitePromises = emails.map(async (email) => {
                const payload = {
                    inviterId: currentUser._id,
                    chatRoomId,
                    email: email 
                };

                return axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/auth/invite`,
                    payload
                );
            });

            await Promise.all(invitePromises);

            setMessage('Chat room created and invitations sent successfully!');
        } else {
            console.log("Single chat")
            console.log("email", email)
            const chatRoomCreationPayload = {
                creatorId: currentUser._id,
                chatRoomName: email.split('@')[0]
            };
            const chatRoomResponse = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/chatRooms`,
                chatRoomCreationPayload
            );

            console.log({ chatRoomResponse });

            const chatRoomId = chatRoomResponse.data._id;
            const payload = {
                inviterId: currentUser._id,
                chatRoomId,
                email: email
            };

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/auth/invite`,
                payload
            );

            setMessage('Single chat room created and invitation sent successfully!');
        }

        setTimeout(() => {
            onClose();
            resetForm();
        }, 1500);
    } catch (error) {
        setMessage(error.response?.data?.msg || 'Failed to send invitation');
    } finally {
        setIsLoading(false);
    }
};

  const resetForm = () => {
    setEmail('');
    setEmails([]);
    setChatName('');
    setIsGroupChat(false);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {isGroupChat ? <FiUsers className="inline mr-2" /> : <FiUserPlus className="inline mr-2" />}
            {isGroupChat ? 'New Group Chat' : 'New Chat'}
          </h3>
          <button onClick={() => { onClose(); resetForm(); }} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <button
            onClick={() => setIsGroupChat(!isGroupChat)}
            className={`mr-3 px-3 py-1 rounded-md ${isGroupChat ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
          >
            {isGroupChat ? 'Group Chat' : '1:1 Chat'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isGroupChat && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Our Awesome Group"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isGroupChat ? 'Add Email Addresses' : "Recipient's Email"}
            </label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                placeholder="friend@example.com"
                required={emails.length === 0}
              />
              {isGroupChat && (
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="px-3 bg-gray-100 border-t border-r border-b border-gray-300 rounded-r-md hover:bg-gray-200"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {isGroupChat && emails.length > 0 && (
            <div className="mb-4 bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Inviting:</h4>
              <ul className="space-y-1">
                {emails.map((email) => (
                  <li key={email} className="flex justify-between items-center">
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => { onClose(); resetForm(); }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || (isGroupChat ? emails.length === 0 : !email)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  <FiMail className="mr-2" />
                  {isGroupChat ? 'Create Group' : 'Start Chat'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal