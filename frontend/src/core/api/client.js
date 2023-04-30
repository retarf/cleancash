import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BASE_URL}`;

async function Request (method, url, data="", headers={}) {
    return await axios.request({
        method: method,
        baseURL: baseURL,
        url: url,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        data: data,
    })
}

export default Request;