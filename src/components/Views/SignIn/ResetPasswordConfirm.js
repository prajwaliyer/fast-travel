import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../../actions/auth';

const ResetPassword = ({reset_password_confirm }) => {
  const {requestSent, setRequestSent} = useState(false);
  const [formData, setFormData] = useState({
    new_password:'',
    re_new_password:''
  });

  const {new_password, re_new_password} = formData;

  // GETTING THE UID AND TOKEN
  let location = useLocation();
  const params=location.pathname.split('/')
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();
      const uid=params[4];
      const token=params[5];
      console.log("uid: ",uid);
      console.log("token: ",token);
      reset_password_confirm(uid,token,new_password, re_new_password);
      setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to='/login' />
  }

  return (
    <div className='container mt-5'>
            <h2> Welcome to Password Reset</h2>
            Submit the form and check your email for a confirmation
            <form onSubmit={e => onSubmit(e)}>
                <br/>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                  />
                </div>
                <br/>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                  />
                </div>
                <p></p>
                <button className='btn btn-primary' to='/' type='submit'>Reset Password</button>
            </form>
        </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPassword);