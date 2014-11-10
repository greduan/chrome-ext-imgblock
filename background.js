'use strict';

var patterns = ['http://*/*', 'https://*/*'],
    whitelist = [];

chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
    if (req.addToWhitelist) {
        whitelist.push(req.url);
        sendRes({ done: 'yes' });
    }
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }

    if (whitelist.length !== 0) {
        if (whitelist[0] === details.url) {
            whitelist.shift();
            return { cancel: false };
        }
    }

    return { cancel: true };
}, { urls: patterns, types: ['image'] }, ['blocking']);
