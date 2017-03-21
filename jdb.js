console.log('hi! it works');

window.onbeforeunload = function (e) {
    var e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Are you sure you want to leave the site?';
    }

    // For Safari
    return 'Are you sure you want to leave the site?';
};