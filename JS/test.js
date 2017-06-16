var v = document.getElementById("video");
var stopTimes = [1.6, 3.9];

function lower_bound(arr, n) {
    var first = 0, last = arr.length - 1, middle;
    while (first <= last) {
        middle = 0 | (first + last) / 2;
        if (arr[middle] < n) first = middle + 1;
        else last = middle - 1;
    }
    return arr[first];
};
console.log(v.currentTime);
v.onplay = function() {
    var currentTime = v.currentTime + 0.02;
    console.log(currentTime);
    var nextStopTime = lower_bound(stopTimes, currentTime);
    console.log(nextStopTime);
    if (nextStopTime){
      setTimeout(function() { v.pause(); }, (nextStopTime-v.currentTime)*1000);
    }
}
