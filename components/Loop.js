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
        this.$startArrow = this.$loopBtn.children[0];
        this.$endArrow = this.$loopBtn.children[1];

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
        if (status.isLoopStart()) {
            this.$startTime.style.color = "#845ef7";
            this.$startArrow.style.color = "#845ef7";
        }
        this.$endTime.innerHTML = getTimestamp(this._end);
        if (status.isLoopEnd()) {
            this.$endTime.style.color = "#845ef7";
            this.$endArrow.style.color = "#845ef7";
        }
        if (status.isLoopOff()) {
            this.$startTime.style.color = "#ddd";
            this.$startArrow.style.color = "#ddd";
            this.$endTime.style.color = "#ddd";
            this.$endArrow.style.color = "#ddd";
        }
    };

    this.init();
}

export default Loop;
