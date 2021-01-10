import loadAPI from "./init.js";

(function (window) {
    loadAPI();

    function YL(id, options) {
        if (!(this instanceof YL)) {
            return new YL(id, options);
        }

        this.player;
        this.State;

        window.onYouTubeIframeAPIReady = () => {
            this.player = new YT.Player(id, options);
            this.State = YT.PlayState;
        };
    }

    YL.fn = YL.prototype;

    YL.fn.playVideo = function () {
        return this.player.playVideo();
    };

    YL.fn.pauseVideo = function () {
        return this.player.pauseVideo();
    };

    YL.fn.stopVideo = function () {
        return this.player.stopVideo();
    };

    YL.fn.seekTo = function (time) {
        return this.player.seekTo(time);
    };

    YL.fn.getCurrentTime = function () {
        return this.player.getCurrentTime();
    };

    YL.fn.rollBack = function (sec) {
        const curr = this.player.getCurrentTime();
        this.player.seekTo(Math.abs(curr - sec));
    };

    YL.fn.rollForward = function (sec) {
        const curr = this.player.getCurrentTime();
        this.player.seekTo(Math.abs(curr + sec));
    };

    YL.fn.isPlaying = function (data) {
        return data === YL.State.PLAYING;
    };

    YL.fn.isPaused = function (data) {
        return data === YL.State.PAUSED;
    };

    YL.fn.isStopped = function (data) {
        return data === YL.State.ENDED;
    };

    YL.fn.getCurrentTimestamp = function () {
        const timestamp = this.player.getCurrentTime();
        const min = Math.floor(timestamp / 60);
        const sec = Math.floor(timestamp % 60);
        const minStr = min < 10 ? "0" + min : min;
        const secStr = sec < 10 ? "0" + sec : sec;
        return minStr + ":" + secStr;
    };

    window.YL = YL;
})(window);

// TODO : 불변 객체 만들기
YL.State = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
};

export default YL;
