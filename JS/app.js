var v = document.getElementById("video");
var stopTimes = [1.6, 4];

v.addEventListener("timeupdate", function () {
	document.getElementById("ichi").innerHTML = v.currentTime;
}, false);
v.addEventListener("ended", function () {
	document.getElementById("kanryou").innerHTML = "動画の再生が完了しました。";
}, false);

function getDuration() {
	//動画の長さ（秒）を表示
	document.getElementById("nagasa").innerHTML = v.duration;
}

function playVideo() {
	// 動画を再生する
	document.getElementById("kanryou").innerHTML = "";
	v.play();
	autoStopVideo();
}
function pauseVideo() {
	//動画を一時停止
	v.pause();
}
function autoStopVideo () {
	var currentTime = v.currentTime + 0.02; //現在の時間
	var nextStopTime = lower_bound(stopTimes, currentTime); //次に止まる時間
	if (nextStopTime) {
		setTimeout(function () { v.pause(); }, (nextStopTime - v.currentTime) * 1000); //次に止まる時間まで予約
	}
	//  if (currentTime < nextStopTime) {
	//v.currentTime = nextStopTime + 0.02;
	//}
}

function lower_bound(arr, n) {
	var first = 0, last = arr.length - 1, middle;
	while (first <= last) {
		middle = 0 | (first + last) / 2;
		if (arr[middle] < n) first = middle + 1;
		else last = middle - 1;
	}
	return arr[first];
};

function upVolume() {
	//音量を上げる
	v.volume = v.volume + 0.25;
}
function downVolume() {
	//音量を下げる
	v.volume = v.volume - 0.25;
}

window.onkeyup = function(e) {
	if (v.onplay) {
		pauseVideo();
	}
	else {
		playVideo();
	}
};