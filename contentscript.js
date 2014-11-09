'use strict';

var imgs = document.getElementsByTagName('img'),
    i;

for (i = 0; i < imgs.length; i += 1) {
}

// click detecting stuff
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function clickEventFunc(e) {
    var target = getEventTarget(e);

    if (target.tagName.toLowerCase() === 'img') {
        console.log('click img');
    }
}

document.body.addEventListener('click', clickEventFunc, false);
