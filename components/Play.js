import { EVENT, TIME } from "../libs/constant.js";

function Play({ player, status, $target }) {
    this.init = () => {
        this.$startBtn = $target.querySelectorAll(".start")[0];
        this.$leftBtn = $target.querySelectorAll(".left")[0];
        this.$rightBtn = $target.querySelectorAll(".right")[0];

        this.bindEvents();
    };

    this.bindEvents = () => {
        this.$startBtn.addEventListener(EVENT.CLICK, this.onClickStartPause);
        this.$leftBtn.addEventListener(EVENT.CLICK, this.onClickRollBack);
        this.$rightBtn.addEventListener(EVENT.CLICK, this.onClickRollForward);
    };

    this.onClickStartPause = () => {
        if (status.isStopped() || status.isPaused()) {
            status.play();
            player.playVideo();
            return;
        }
        if (status.isPlaying()) {
            status.pause();
            player.pauseVideo();
            return;
        }
    };

    this.onClickStop = () => {
        if (!status.isStopped()) {
            status.stop();
            player.stopVideo();
        }
    };

    this.onClickRollBack = () => {
        if (status.isLoopStart() || status.isLoopEnd()) return;
        player.rollBack(TIME.ROLL_BACK);
    };

    this.onClickRollForward = () => {
        if (status.isLoopStart() || status.isLoopEnd()) return;
        player.rollForward(TIME.ROLL_FORWARD);
    };

    this.render = () => {
        if (status.isPlaying()) {
            this.$startBtn.innerHTML = "pause";
        }
        if (status.isPaused()) {
            this.$startBtn.innerHTML = "start";
        }
    };

    this.init();
}

export default Play;
