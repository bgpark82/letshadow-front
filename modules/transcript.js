class Transcript {
    constructor({ player, captions, render }) {
        if (!(player instanceof YL))
            throw new Error(`player ${player} is not type of YL`);
        this.player = player;
        this.captions = captions;
        console.log("caption", this.captions);

        // 자막 리스트 index
        this.index = 0;
        // 동영상의 timestamp
        this.timestamp = 0;
        // timestamp 시간 부터 현재 자막 종료까지의 시간
        this.timeout = -1;
        // setTimeout
        this.timeoutKey;
        // 외부에서온 text 렌더링 함수
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
        this.index = this.findCaptionIndex();
        const { start } = this.getCaption(this.index);

        if (this.timestamp < start) {
            this.timeout = start - this.timestamp;
        }
        if (this.timestamp >= start) {
            this.timeout = this.calculateTimeout();
        }
        console.log(
            "index, timestamp, timeout",
            this.index,
            this.timestamp,
            this.timeout
        );

        this.setTimeout();
    }

    showNextCaption() {
        this.index++;
        this.timestamp = this.player.getCurrentTime();
        this.timeout = this.calculateTimeout();

        if (this.index <= this.captions.length) {
            this.setTimeout();
        }
    }

    setTimeout() {
        if (this.timeout < 0) return;
        console.log(
            "index, start, timestamp, timeout",
            this.index,
            this.timestamp,
            this.timeout
        );

        this.renderCaption();
        clearTimeout(this.timeoutKey);
        this.timeoutKey = setTimeout(() => {
            this.showNextCaption();
        }, this.timeout * 1000);
    }

    renderCaption() {
        const { text, start } = this.getCurrentCaption();
        const offset = start > this.timestamp ? start - this.timestamp : 0;
        // this.offsetKey = setTimeout(() => {
        this.render(text);
        // }, offset * 1000);
    }

    calculateTimeout() {
        const { start, duration } = this.getCaption(this.index);
        return start + duration - this.timestamp;
    }

    findCaptionIndex() {
        const size = this.captions.length;
        let index = 0;
        for (; index < size; index++) {
            const { start, duration } = this.getCaption(index);
            const end = start + duration;

            // 현재 시간이 시작시간 보다 작을 때
            if (this.timestamp < start) break;
            // 현재 시간이 시작시간과 종료시간 사이에 있을 때
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
        return this.captions[this.index];
    }

    checkNumber(timestamp) {
        if (typeof timestamp != "number")
            throw new Error(`${timestamp} is not number`);
    }
}

export default Transcript;
