;(function () {
    'use strict';

    document.getElementsByName('save')[0].addEventListener('click', function () {
        var parentLimit = document.getElementsByName('parentLimit')[0].value;

        chrome.storage.sync.set({
            options: {
                parentLimit: parentLimit
            }
        }, function () {
            document.getElementById('saved').style.display = 'block';
            window.setTimeout(function () {
                document.getElementById('saved').style.display = 'none';
            }, 1000);
        });
    });

}());
