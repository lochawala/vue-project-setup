// JS file to handle all network calls and user interactions with server
import axios from 'axios';
import axiosConfig from './axiosconfig';

export default {
    post(uri, requestData, json) {
        if (json) {
            requestData = JSON.stringify(requestData);
        }
        return new Promise((resolve, reject) => {
            axios.post(uri, requestData)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    put(uri, requestData) {
        return new Promise((resolve, reject) => {
            axios.put(uri, requestData)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    get(uri) {
        return new Promise((resolve, reject) => {
            axios.get(uri)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete(uri) {
        return new Promise((resolve, reject) => {
            axios.delete(uri)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
};

axios.interceptors.request.use(config => {
    config.headers.common.crossDomain = true;
    if (axiosConfig.blackListed(config.url)) {
        config.headers.common.withCredentials = false;
    } else {
        config.headers.common.withCredentials = true;
        var token = '';
        if (localStorage[btoa(btoa('AuthKey'))]) {
            token = localStorage[btoa(btoa('AuthKey'))];
            config.headers.common['Authorization'] = atob(atob(token));
        }
    }
    config.url = process.env.API + config.url;
    return config;
});