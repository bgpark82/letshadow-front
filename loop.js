function Loop() {
    this.TIME_UNIT_SEC = 1000;
    this.TIME_UNIT_ROLL = 60;

    this.isStarted = false;
    this.isClicked = false;
    this.start;
    this.end;
    this.duration;

    this.hasStarted = () => {
        return this.isStarted;
    };

    this.onStart = (e) => {
        if (!this.isStarted) {
            e.target.innerHTML = "pause";
            player.playVideo();
        } else {
            e.target.innerHTML = "start";
            player.pauseVideo();
        }
        this.isStarted = !this.isStarted;
    };

    this.onLoop = () => {
        if (!this.isClicked) {
            this.start = player.getCurrentTime();
        }
        if (this.isClicked) {
            this.end = player.getCurrentTime();
            this.restartVideoLoop();
            this.duration = Math.abs(this.start - this.end);
        }
        this.isClicked = !this.isClicked;
    };

    this.onLeft = () => {
        player.seekTo(player.getCurrentTime() - this.TIME_UNIT_ROLL);
    };

    this.onRight = () => {
        player.seekTo(player.getCurrentTime() + this.TIME_UNIT_ROLL);
    };

    this.onPlayerStateChange = (event) => {
        if (event.data == YT.PlayerState.PLAYING) {
            if (!this.duration) return;
            setTimeout(
                this.restartVideoLoop,
                this.duration * this.TIME_UNIT_SEC
            );
        }
    };

    this.restartVideoLoop = () => {
        player.seekTo(this.start);
    };
}
