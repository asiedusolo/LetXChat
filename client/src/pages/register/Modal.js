import React, {useEffect} from 'react';

const Modal = ({ isValidUser, hideModal }) => {
    
    useEffect(() => {
        setTimeout(() => {
            hideModal()
        }, 3000)
    }, [])
    return <div>
        <h3>{isValidUser ? 'New user created successfully' : 'Staff Email or Username already exist'}</h3>
  </div>;
};

export default Modal
