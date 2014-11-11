;(function () {
    'use strict';

    var opts = {};

    document.addEventListener('DOMContentLoaded', function () {
        chrome.storage.sync.get(function (obj) {
            opts.parentLimit = obj.options.parentLimit || 2;
            opts.whitelist = obj.options.whitelist || '';

            document.getElementsByName('parentLimit')[0].value = opts.parentLimit;
            document.getElementsByName('whitelist')[0].value = opts.whitelist;
        });
    });

    document.getElementsByName('save')[0].addEventListener('click', function () {
        var parentLimit = document.getElementsByName('parentLimit')[0].value,
            whitelist = document.getElementsByName('whitelist')[0].value;

        chrome.storage.sync.set({
            options: {
                parentLimit: parentLimit,
                whitelist: whitelist
            }
        }, function () {
            document.getElementById('saved').style.display = 'block';
            window.setTimeout(function () {
                document.getElementById('saved').style.display = 'none';
            }, 1000);
        });
    });

}());
