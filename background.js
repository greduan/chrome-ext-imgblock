'use strict';

var patterns = ['http://*/*', 'https://*/*'],
    tempImgWhitelist = [],
    opts,
    cancelPage;

chrome.storage.sync.get('options', function (obj) {
    opts = obj.options;
});

// listen for message to add to temporary whitelist
chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
    // if we were told to add to whitelist
    if (req.addToWhitelist) {
        // add it to the tempWhitelist
        tempImgWhitelist.push(req.imgUrl);
        // acknowledge
        sendRes({ done: 'yes' });
    }
});

// listen for pages
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    // I wouldn't have this here, but it's required it seems
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }

    // not an image so we don't have to worry
    if (details.type !== 'image') {
        return { cancel: false };
    }

    // it is an image, logic goes here
    if (details.type === 'image') {
        // very crude file URL whitelist feature
        if (opts.fileWhitelist.split('\n').indexOf(details.url) >= 0) {
            return { cancel: false };
        }

        // if the tempWhitelist isn't empty
        if (tempImgWhitelist.length !== 0) {
            // if the first element of the array is the same as the request
            if (tempImgWhitelist[0] === details.url) {
                // remove it from the whitelist
                tempImgWhitelist.shift();
                // do NOT cancel the request
                return { cancel: false };
            }
        }

        // cancel the request otherwise
        return { cancel: true };
    }
}, { urls: patterns }, ['blocking']);
