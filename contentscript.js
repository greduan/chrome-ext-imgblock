'use strict';

//
// the stuff that happens on page load
//
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

//
// click event stuff
//

// gets the element that activated event
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

// quick util function, not really necessary, just nice
function isStringInArray(array, string) {
    var i = array.indexOf(string);
    if (i < 0) {
        return false;
    } else if (i >= 0) {
        return true;
    }
}

// gets called at every click
function clickEventFunc(e) {
    var target = getEventTarget(e),
        message;

    // make sure we pickup the right clicks
    if (isStringInArray(target.className.split(' '), 'imgblock-boop')) {
        // message to send to background
        message = {
            addToWhitelist: true,
            url: target.getAttribute('data-imgblock-src')
        };
        // switch with new url and do magic call for it to not be blocked
        chrome.runtime.sendMessage(message, function (res) {
            target.src = message.url;
            target.classList.remove('imgblock-boop');
        });

        // prevent a click on an anchor/link to redirect you somewhere
        if (target.parentElement.tagName.toLowerCase() === 'a') {
            e.preventDefault();
            return false;
        }
    }
}

// event delegation, look it up
document.body.addEventListener('click', clickEventFunc, false);
