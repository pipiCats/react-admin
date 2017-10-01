import axios from 'axios';

export function get(url, param, successCallback, failCallback) {
    return axios.get(url, {
        params: param,
        timeout: 5000
    }).then((res) => {
        successCallback(res);
    }).catch((err) => {
        failCallback(err);
    });
}