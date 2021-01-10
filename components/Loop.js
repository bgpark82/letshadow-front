import { EVENT } from "../libs/constant.js";
import { getTimestamp } from "../libs/utils.js";

function Loop({ player, status, $target }) {
    this.init = () => {
        this._start;
        this._end;
        this._duration;

        this.$startTime = $target.querySelectorAll(".start")[0];
        this.$endTime = $target.querySelectorAll(".end")[0];
        this.$loopBtn = $target.querySelectorAll(".btn")[0];

        this.bindEvents();
    };

    this.bindEvents = () => {
        this.$loopBtn.addEventListener(EVENT.CLICK, this.onClickLoop);
    };

    this.onClickLoop = () => {
        if (!status.isPlaying()) return;
        /* start */
        if (status.isLoopOff()) {
            this._start = player.getCurrentTime();
            status.loopStart();
            this.render();
            return;
        }
        /* end */
        if (status.isLoopStart()) {
            this._end = player.getCurrentTime();
            this.setDuration();
            this.restart();
            status.loopEnd();
            this.render();
            return;
        }
        /* off */
        if (status.isLoopEnd()) {
            console.log(status.loopEnd());
            status.loopOff();
            return;
        }
    };

    this.start = () => {
        if (!this.getDuration()) return;
        if (status.isLoopOff()) return;
        setTimeout(this.restart, this._duration * 1000);
    };

    this.restart = () => {
        player.seekTo(this._start);
    };

    this.getDuration = () => {
        return this._duration;
    };

    this.setDuration = () => {
        this._duration = Math.abs(this._start - this._end);
    };

    this.render = () => {
        this.$startTime.innerHTML = getTimestamp(this._start);
        this.$endTime.innerHTML = getTimestamp(this._end);
    };

    this.init();
}

export default Loop;
