import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { connect } from 'react-redux';
import {checkAuthenticated, load_user, } from '../actions/auth';

const Layout = (props) => {
    // let location = useLocation();
    useEffect (() => {
        // const values = queryString.parse(location.search);
        // const state = values.state ? values.state : null;
        // const code = values.code ? values.code : null;

        // console.log('State: '+state)
        // console.log('Code: '+code)

        // if (state && code){
        //     props.googleAuthenticate(state,code);
        // } else{
            
        // }
        props.checkAuthenticated();
        props.load_user();
    },[]);
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
};

export default connect(null, {checkAuthenticated, load_user})(Layout);