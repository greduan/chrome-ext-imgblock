'use strict';

// the placeholder img stuff
var imgs = document.getElementsByTagName('img'),
    i;

for (i = 0; i < imgs.length; i += 1) {
    $(imgs[i]).wrap('<div class="imgblock-container"></div>');
    $(imgs[i]).addClass('imgblock-img');
    $(imgs[i]).after('<div class="imgblock-ontop">LOAD</div>');
}

// click event stuff
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function clickEventFunc(e) {
    var target = getEventTarget(e);

    if (target.tagName.toLowerCase() === 'img') {
        console.log(target);
    }
}

document.body.addEventListener('click', clickEventFunc, false);
