const loop = new Loop();

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: "M7lc1UVf-VE",
        events: {
            onReady: onPlayerReady,
            onStateChange: loop.onPlayerStateChange,
            onPlaybackQualityChange: onPlaybackQualityChange,
            onPlaybackRateChange: onPlaybackRateChange,
            onError: onError,
            onApiChange: onApiChange,
        },
    });
}

const $startBtn = document.getElementById("start");
const $loopBtn = document.getElementById("loop");
const $leftBtn = document.getElementById("left");
const $rightBtn = document.getElementById("right");

$startBtn.addEventListener("click", loop.onStart);
$loopBtn.addEventListener("click", loop.onLoop);
$leftBtn.addEventListener("click", loop.onLeft);
$rightBtn.addEventListener("click", loop.onRight);

function onPlayerReady() {
    console.log("ready!");
}

function onPlayerStateChange(data) {
    console.log(data);
    console.log("state changed!");
}

onPlaybackRateChange.prototype.click = () => {
    console.log(hello);
};

function onPlaybackQualityChange(data) {
    console.log(data);
    console.log("quality changed!");
}

function onPlaybackRateChange() {
    console.log("playback rate changed!");
}

function onError(data) {
    console.log(data);
    console.log("error!");
}

// player가 모듈을 로딩했는지 나타냄
function onApiChange(data) {
    console.log(data);
    console.log((player.getOptions("captions").fontSize = 3));
    console.log("api changed!");
}
