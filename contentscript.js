'use strict';

//
// the stuff that happens on page load
//

var imgs = document.getElementsByTagName('img'),
    i,
    curImg,
    parent,
    bgImg = chrome.extension.getURL('images/imgblock-bg.png'),
    opts;

chrome.storage.sync.get('options', function (obj) {
    opts = obj.options;
});

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

// checks if the specified parent tag can be found with a certain limit
function findNearestParent(element, parentTag, limit) {
    var parent = element.parentElement;
 
    if (limit < 0) {
        return { foundIt: false };
    }

    if (element.tagName.toLowerCase() === parentTag) {
        return { element: element, foundIt: true };
    }
 
    return findNearestParent(parent, parentTag, limit - 1);
}

// gets called at every click
function clickEventFunc(e) {
    var target = getEventTarget(e),
        message;

    // make sure we pickup the right clicks
    if (target.className.split(' ').indexOf('imgblock-boop') >= 0) {
        // message to send to background
        message = {
            addToWhitelist: true,
            imgUrl: target.getAttribute('data-imgblock-src')
        };

        // switch with new URL and do magic call for it to not be blocked
        chrome.runtime.sendMessage(message, function (res) {
            target.src = message.imgUrl;
            target.classList.remove('imgblock-boop');
        });

        // prevent a click on an anchor/link to redirect you somewhere
        if (findNearestParent(target, 'a', opts.parentLimit).foundIt) {
            e.preventDefault();
            return false;
        }
    }
}

// event delegation, look it up
document.body.addEventListener('click', clickEventFunc, false);
