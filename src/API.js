import axios from 'axios';

export default axios.create({
    baseURL: "https://fast-travel-staging.herokuapp.com/api/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})