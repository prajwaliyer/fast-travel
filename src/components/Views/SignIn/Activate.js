import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    let location = useLocation();
    const params=location.pathname.split('/')
    console.log(params)
    const verify_account = e => {
        const uid=params[2];
        const token=params[3];
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Navigate to='/' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '300px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);