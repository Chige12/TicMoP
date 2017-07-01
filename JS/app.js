var v = document.getElementById("video");
var m = 60, m2 = 120, m3 = 180;
var stopTimes = [9.4, 10.2, 13.7, 15.1, 17.7, 20.15, 60.45, 62.2, 64.16, 68.7,//title
m+9, m+12.2, m2+6.2, m2+6.5, m2+8.45, m2+15.1, m2+20.2,
m2+20.5, m2+21.15, m2+21.7, m2+22.3, m2+22.83, m2+23.48, m2+24,//いいことあるの？
m2+24.23, m2+26.1, m2+26.76, m2+26.96, m2+27.13, m2+28.1, m2+28.55, m2+30.26, m2+32.4,m2+32.63,
m2+40.63, m2+40.9, m2+41.13, m2+54.3, m3+3.4, m3+19.3, m3+20.6, m3+21.9, m3+22.8, m3+23.7];

//color-slide2.mp4--[1.6, 6, 9.8, 13.5, 18, 21.2, 23, 27.8, 33, 35, 40]

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
	v.volume = v.volume + 0.20;
}
function downVolume() {
	//音量を下げる
	v.volume = v.volume - 0.20;
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
	else if (keyCode == 38){upVolume();}
	else if (keyCode == 40){downVolume();}
	else {
		console.log(v.paused);
		console.log(keyCode);
	}

};
