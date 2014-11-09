'use strict';

// the placeholder img stuff
var imgs = document.getElementsByTagName('img'),
    i,
    curImg,
    parent;

for (i = 0; i < imgs.length; i += 1) {
    curImg = $(imgs[i]),
    parent = curImg.parent();

    // check if the img is immediately surrounded by an anchor
    // if it is then we want to do some stuff with the anchor, not the img
    if (parent.get(0).tagName.toLowerCase() === 'a') {
        parent.wrap('<div class="imgblock-container"></div>');
        parent.addClass('imgblock-onbottom');
        parent.after('<div class="imgblock-ontop"></div>');
    } else {
        curImg.wrap('<div class="imgblock-container"></div>');
        curImg.addClass('imgblock-onbottom');
        curImg.after('<div class="imgblock-ontop"></div>');
    }
    curImg.addClass('imgblock-img');
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
            console.log('click yo');
        }
    }
}

document.body.addEventListener('click', clickEventFunc, false);
