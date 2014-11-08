'use strict';

var patterns = ["*://*/*", "*://*/*"];

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }
    console.log('blocked');
    return { cancel: true };
}, { urls: patterns, types: ["image"] }, ["blocking"]);
