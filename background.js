'use strict';

var patterns = ["*://*/*"];

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }

    return { cancel: true };
}, { urls: patterns, types: ["image"] }, ["blocking"]);
