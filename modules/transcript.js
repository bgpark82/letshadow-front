class Transcript {
    constructor({ player, captions, render }) {
        if (!(player instanceof YL))
            throw new Error(`player ${player} is not type of YL`);
        this.player = player;
        this.captions = captions;
        console.log("caption", this.captions);

        this.currentIndex = 0;
        this.nextIndex = 0;

        // 동영상에서 체크된 시간
        this.timestamp = 0;
        // 종료 시간
        this.timeout = -1;
        // setTimeout
        this.timeoutKey;
        this.offsetKey;

        this.render = render;
    }

    play() {
        this.timestamp = this.player.getCurrentTime();
        this.showCaption();
    }

    pause() {
        clearTimeout(this.timeoutKey);
        clearTimeout(this.offsetKey);
    }

    showCaption() {
        this.nextIndex = this.findCaptionIndex();
        this.currentIndex = this.nextIndex;
        const { start } = this.getCaption(this.nextIndex);

        if (this.timestamp < start) {
            this.timeout = start - this.timestamp;
        }
        if (this.timestamp >= start) {
            this.timeout = this.calculateTimeout();
        }
        console.log(
            "current currentIndex, nextIndex, timestamp, timeout",
            this.currentIndex,
            this.nextIndex,
            this.timestamp,
            this.timeout
        );

        this.setTimeout();
    }

    showNextCaption() {
        this.currentIndex = this.nextIndex;
        this.nextIndex++;

        this.timestamp = this.player.getCurrentTime();
        this.timeout = this.calculateTimeout();

        this.renderCaption();

        console.log(
            "next currentIndex, nextIndex, start, timestamp, timeout",
            this.currentIndex,
            this.nextIndex,
            this.timestamp,
            this.timeout
        );
        if (this.nextIndex <= this.captions.length) {
            this.setTimeout();
        }
    }

    renderCaption() {
        const { text, start } = this.getCurrentCaption();
        const offset = start > this.timestamp ? start - this.timestamp : 0;

        this.offsetKey = setTimeout(() => {
            this.render(text);
        }, offset * 1000);
    }

    setTimeout() {
        if (this.timeout < 0) return;
        clearTimeout(this.timeoutKey);
        this.timeoutKey = setTimeout(() => {
            this.showNextCaption();
        }, this.timeout * 1000);
    }

    calculateTimeout() {
        const { start, duration } = this.getCaption(this.currentIndex);
        return start + duration - this.timestamp;
    }

    findCaptionIndex() {
        console.log("caption", this.captions);
        const size = this.captions.length;
        let index = 0;
        for (; index < size; index++) {
            const { start, duration } = this.getCaption(index);

            // 현재 시간이 시작시간 보다 작을 때
            if (this.timestamp < start) break;
            // 현재 시간이 시작시간과 종료시간 사이에 있을 때
            const end = start + duration;
            if (this.timestamp >= start && this.timestamp < end) {
                break;
            }
        }
        return index;
    }

    getCaption(index) {
        return this.captions[index];
    }

    getCurrentCaption() {
        return this.captions[this.currentIndex];
    }

    checkNumber(timestamp) {
        if (typeof timestamp != "number")
            throw new Error(`${timestamp} is not number`);
    }
}

export default Transcript;
