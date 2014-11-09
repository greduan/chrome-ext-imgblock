'use strict';

// the placeholder img stuff
var imgs = document.getElementsByTagName('img'),
    i;

for (i = 0; i < imgs.length; i += 1) {
    // check if the img is immediately surrounded by an anchor
    // if it is then we want to do some stuff with the anchor, not the img
    if ($(imgs[i]).parent().get(0).tagName.toLowerCase() === 'a') {
        $(imgs[i]).parent().wrap('<div class="imgblock-container"></div>');
        $(imgs[i]).parent().addClass('imgblock-onbottom');
        $(imgs[i]).parent().after('<div class="imgblock-ontop">LOAD</div>');
    } else {
        $(imgs[i]).wrap('<div class="imgblock-container"></div>');
        $(imgs[i]).addClass('imgblock-onbottom');
        $(imgs[i]).after('<div class="imgblock-ontop">LOAD</div>');
    }
    $(imgs[i]).addClass('imgblock-img');
}

// click event stuff
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function isStringInArray(array, string) {
    var i = array.indexOf(string);
    if (i < 0) {
        return false;
    } else if (i >= 0) {
        return true;
    }
}

function clickEventFunc(e) {
    var target = getEventTarget(e);

    if (target.tagName.toLowerCase() === 'div'
        && isStringInArray(target.className.split(' '), 'imgblock-ontop')) {
        // TODO: don't assume it's the first child
        if (isStringInArray(target.parentElement.firstChild.className.split(' '), 'imgblock-img')) {
        }
    }
}

document.body.addEventListener('click', clickEventFunc, false);
