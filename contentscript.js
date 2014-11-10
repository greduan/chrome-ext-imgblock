'use strict';

// the placeholder img stuff
var imgs = document.getElementsByTagName('img'),
    i,
    curImg,
    parent,
    bgImg = chrome.extension.getURL('images/imgblock-bg.png');

for (i = 0; i < imgs.length; i += 1) {
    curImg = $(imgs[i]),
    parent = curImg.parent();

    curImg.addClass('imgblock-boop');
    curImg.attr('data-imgblock-src', curImg.attr('src'));
    curImg.get(0).src = bgImg;
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

    if (isStringInArray(target.className.split(' '), 'imgblock-boop')) {
        console.log('click yo');
    }
}

document.body.addEventListener('click', clickEventFunc, false);
