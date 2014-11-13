'use strict';

var patterns = ['http://*/*', 'https://*/*'],
    tempWhitelist = [],
    opts;

chrome.storage.sync.get('options', function (obj) {
    opts = obj.options;
});

// listen for message to add to temporary whitelist
chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
    // if we were told to add to whitelist
    if (req.addToWhitelist) {
        // add it to the tempWhitelist
        tempWhitelist.push(req.url);
        // acknowledge
        sendRes({ done: 'yes' });
    }
});

// listen for web request
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    // I wouldn't have this here, but it's required it seems
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }

    console.log(details);

    // very crude website URL whitelist feature
    // if (opts.websiteWhitelist.split('\n').indexOf() >= 0) {
    //     //
    // }

    // very crude file URL whitelist feature
    // if (opts.fileWhitelist.split('\n').indexOf(details.url) >= 0) {
    //     return { cancel: false };
    // }

    // if the tempWhitelist isn't empty
    if (tempWhitelist.length !== 0) {
        // if the first element of the array is the same as the request
        if (tempWhitelist[0] === details.url) {
            // remove it from the whitelist
            tempWhitelist.shift();
            // do NOT cancel the request
            return { cancel: false };
        }
    }

    // cancel the request otherwise
    return { cancel: true };
}, { urls: patterns, types: ['image'] }, ['blocking']);
