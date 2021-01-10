function Status() {
    this.PLAY = "PLAY";
    this.PAUSE = "PAUSE";
    this.STOP = "STOP";

    this.LOOP_START = "LOOP_START";
    this.LOOP_END = "LOOP_END";
    this.LOOP_OFF = "LOOP_OFF";
    this.LOOP_TERMINATE = "LOOP_TERMINATE";

    this._play = this.STOP;
    this._loop = this.LOOP_OFF;

    /* play */

    this.play = () => {
        this._play = this.PLAY;
    };

    this.pause = () => {
        this._play = this.PAUSE;
    };

    this.stop = () => {
        this._play = this.STOP;
    };

    this.isPlaying = () => {
        return this._play === this.PLAY;
    };

    this.isPaused = () => {
        return this._play === this.PAUSE;
    };

    this.isStopped = () => {
        return this._play === this.STOP;
    };

    /* loop */

    this.loopStart = () => {
        this._loop = this.LOOP_START;
    };

    this.loopEnd = () => {
        this._loop = this.LOOP_END;
    };

    this.loopOff = () => {
        this._loop = this.LOOP_OFF;
    };

    this.isLoopOff = () => {
        return this._loop === this.LOOP_OFF;
    };

    this.isLoopStart = () => {
        return this._loop === this.LOOP_START;
    };

    this.isLoopEnd = () => {
        return this._loop === this.LOOP_END;
    };
}

export default Status;
