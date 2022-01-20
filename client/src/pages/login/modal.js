import React, {useEffect} from 'react';

const Modal = ({ hideModal }) => {
    
    useEffect(() => {
        setTimeout(() => {
            hideModal()
        }, 1000)
    }, [hideModal])
    return <div>
        <h3>Please enter valid credentials</h3>
  </div>;
};

export default Modal
