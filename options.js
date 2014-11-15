;(function () {
    'use strict';

    var opts = {};

    document.addEventListener('DOMContentLoaded', function () {
        chrome.storage.sync.get(function (obj) {
            opts.parentLimit = obj.options.parentLimit || 2;
            opts.fileWhitelist = obj.options.fileWhitelist || '';
            opts.websiteWhitelist = obj.options.websiteWhitelist || '';

            document.getElementsByName('parentLimit')[0].value = opts.parentLimit;
            document.getElementsByName('fileWhitelist')[0].value = opts.fileWhitelist;
            document.getElementsByName('websiteWhitelist')[0].value = opts.websiteWhitelist;
        });
    });

    document.getElementsByName('save')[0].addEventListener('click', function () {
        var parentLimit = document.getElementsByName('parentLimit')[0].value,
            fileWhitelist = document.getElementsByName('fileWhitelist')[0].value,
            websiteWhitelist = document.getElementsByName('websiteWhitelist')[0].value;

        chrome.storage.sync.set({ // save settings
            options: {
                parentLimit: parentLimit,
                fileWhitelist: fileWhitelist,
                websiteWhitelist: websiteWhitelist
            }
        }, function () { // show "settings saved" notice thing
            document.getElementById('saved').style.display = 'block';
            window.setTimeout(function () {
                document.getElementById('saved').style.display = 'none';
            }, 1000);
        });
    });

}());
