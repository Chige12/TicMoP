var v = document.getElementById("video");
var stopTimeIndex = 0;
var stopTimes = [1.6, 3.9];

v.onplay = function() {
    if (stopTimeIndex == stopTimes.length) { return; }
    setTimeout(function() { v.stop() }, stopTimes[stopTimeIndex]);
    stopTimeIndex++;
}
