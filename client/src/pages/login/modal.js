import React, {useEffect} from 'react';

const Modal = ({ isValidUser, hideModal }) => {
    
    useEffect(() => {
        setTimeout(() => {
            hideModal()
        }, 1000)
    }, [hideModal])
    return <div>
        <h3>{isValidUser ? 'User logged in successfully' : 'Please enter valid credentials'}</h3>
  </div>;
};

export default Modal
