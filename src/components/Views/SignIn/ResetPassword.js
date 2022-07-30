import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../../actions/auth';

const ResetPassword = ({reset_password }) => {
  const {requestSent, setRequestSent} = useState(false);
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const {email} = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();
      //LOGIN FUNCTION
      reset_password(email);
      setRequestSent(true);
  };

  //is user auth done
  if (requestSent) {
    return <Navigate to='/' />
    }

  return (
    <div className='container mt-5'>
            <h1>Forgot Your Password? Fast Travel To The Rescue</h1>
            <p>Enter your email and you shall receive a reset request if the account exists</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <button className='btn btn-primary' type='submit'>Reset</button>
            </form>
        </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);