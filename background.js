'use strict';

var patterns = ['http://*/*', 'https://*/*'],
    on = false;

if (on) {
    chrome.webRequest.onBeforeRequest.addListener(function (details) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }

        return { cancel: true };
    }, { urls: patterns, types: ['image'] }, ['blocking']);
}
