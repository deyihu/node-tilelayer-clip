const fetch = require('node-fetch');

const AjaxUtil = (module.exports = {});


AjaxUtil.getJson = function (url) {
    return fetch(url, {})
        .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.json();
        })
        .then(function (json) {
            return json;
        })
        .catch(function (error) {
            // throw new Error('There has been a problem with your fetch operation: ' + error.message);
            console.error(error.message);
            return {};
        });
};


AjaxUtil.getImage = function (url) {
    return fetch(url, {})
        .then(function (response) {
            if (response.ok) {
                return response.buffer();
            }
            return undefined;
        })
        .then(function (buffer) {
            if (!buffer) return;
            const base64 = buffer.toString('base64');
            return base64;
        })
        .catch(function (error) {
            throw new Error('There has been a problem with your fetch operation: ' + error.message);
        });
};