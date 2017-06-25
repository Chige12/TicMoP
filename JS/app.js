var v = document.getElementById("video");
var stopTimes = [1.6, 6, 9.8, 13.5, 18, 21.2, 23, 27.8, 33, 35, 40];

//[9.4, 10.2, 13.7, 15.1, 17.7, 18.6, 59.0, 60.7, 62.7, 67.3, 67.6, 70.7, 77.3, 82.4]

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
	console.log("pause");
}

var timeout_id = null;

function autoStopVideo () { //自動で動画を停止
	var currentTime = v.currentTime + 0.02; //現在の時間
	var nextStopTime = stopTimes[lower_bound(stopTimes, currentTime)]; //次に止まる時間
	if (nextStopTime) {
		timeout_id = setTimeout(function () { v.pause(); console.log("pause1"); }, (nextStopTime - v.currentTime) * 1000); //次に止まる時間を予約
		console.log("setTimeout");
	}
}
function autoJampVideo() { //動画再生中に次の場所へジャンプ
	var currentTime = v.currentTime + 0.02; //現在の時間
	var nextStopTime = stopTimes[lower_bound(stopTimes, currentTime)]; //次に止まる時間
	if (currentTime < nextStopTime) {
		if(timeout_id !== null){
			clearTimeout(timeout_id); //次に止まる時間をキャンセル
			timeout_id = null;
		}
		v.currentTime = nextStopTime + 0.04; //止まる時間までジャンプ
		var nextStopTime = stopTimes[lower_bound(stopTimes, currentTime) + 1];
		if (nextStopTime) {
			timeout_id = setTimeout(function () { v.pause(); console.log("pause2");}, (nextStopTime - v.currentTime + 0.1) * 1000); //次の次に止まる時間を予約
		}
		console.log("autoJamp");
	}

}

function lower_bound(arr, n) { //現在時間nを取得して次に止まる時間の配列番号を返す。
	var first = 0, last = arr.length - 1, middle;
	while (first <= last) {
		middle = 0 | (first + last) / 2;
		if (arr[middle] < n) first = middle + 1;
		else last = middle - 1;
	}
	return first;
};

function upVolume() {
	//音量を上げる
	v.volume = v.volume + 0.25;
}
function downVolume() {
	//音量を下げる
	v.volume = v.volume - 0.25;
}

console.log(v.readyState);

window.onkeydown = function(e) {  //keyboardのイベント取得
	keyCode = window.event.keyCode;
	if (keyCode == 13 || keyCode == 39){ //Enter or Right 再生とジャンプ
		if (v.paused) { //停止していればtrue
			playVideo();
		}
		else {
			autoJampVideo();
		}
	}
	else if (keyCode == 8 || keyCode == 37){ //BackSpace or Left 前に戻る

	}
	else if (keyCode == 32){ //Space 再生と停止
		if (v.paused) { //停止していればtrue
			playVideo();
		}
		else {
			pauseVideo();
		}
	}
	else {
		console.log(v.paused);
		console.log(keyCode);
	}

};
