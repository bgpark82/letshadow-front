import YL from "../modules/youtube-loop.js";
import Loop from "../components/Loop.js";
import Play from "../components/Play.js";
import Status from "../libs/status.js";
import { fetchTimedText, fetchTranslate } from "../libs/api.js";
import Transcript from "../modules/transcript.js";
import loadAPI from "../modules/init.js";

new (function () {
    this.init = () => {
        loadAPI();

        this.subtitle;
        this.transcript;
        this.videoId;
        this.$subtitle;

        this.videoId = location.search.substring(
            location.search.lastIndexOf("=") + 1
        );

        this.$video = document.getElementById("video");
        this.$caption = document.getElementById("caption");
        this.$word = document.getElementById("word");
        this.setTranscript();

        this.player = YL("player", {
            videoId: this.videoId,
            width: "100%",
            height: "100%",
            playerVars: {
                playsinline: 1,
            },
            events: {
                onReady: this.onReadyVideo,
                onStateChange: this.onStateChangeVideo,
            },
        });

        this.status = new Status();

        this.play = new Play({
            player: this.player,
            status: this.status,
            $target: document.getElementById("play"),
        });

        this.loop = new Loop({
            player: this.player,
            status: this.status,
            $target: document.getElementById("loop"),
        });
    };

    this.setTranscript = async () => {
        const response = await fetchTimedText(this.videoId);
        if (!response) {
            console.log("자막이 존재하지 않습니다");
            return;
        }

        const parser = new DOMParser();
        const captionXML = await parser.parseFromString(response, "text/xml");
        const textXML = captionXML.querySelectorAll("text");

        this.subtitle = [...textXML].map((t) => ({
            start: new Number(t.getAttribute("start")),
            duration: new Number(t.getAttribute("dur")),
            text: t.innerHTML,
        }));

        this.transcript = new Transcript({
            player: this.player,
            captions: this.subtitle,
            render: this.renderCaption,
        });
    };

    this.renderCaption = (text) => {
        this.appendCaption(text);
    };

    this.appendCaption = (text) => {
        this.$caption.innerHTML = "";

        const $subtitle = text.split(" ").reduce(($caption, word) => {
            const $word = document.createElement("span");
            $word.innerHTML = word;
            this.onClickWord($word, word);
            $caption.appendChild($word);
            return $caption;
        }, this.$caption);

        this.$video.appendChild($subtitle);
    };

    this.onClickWord = ($span, word) => {
        $span.addEventListener("click", async (e) => {
            const response = await fetchTranslate(word);
            if (response.length > 1)
                throw new Error("두개 이상의 번역이 있습니다");
            const korean = response[0].translatedText;
            this.appendWord(word, korean);
        });
    };

    this.appendWord = (origin, korean) => {
        this.$word.innerHTML = "";

        const $word = document.createElement("div");
        $word.className = "word";
        $word.innerHTML = `${origin} : ${korean}`;

        this.$word.appendChild($word);
    };

    this.onReadyVideo = () => {
        console.log("ready!");
    };

    this.onStateChangeVideo = ({ data }) => {
        if (this.player.isPlaying(data)) {
            console.log("playing");
            this.status.play();
            this.loop.start();
            this.transcript?.play();
        }
        if (this.player.isPaused(data)) {
            console.log("paused");
            this.status.pause();
            // 자막이 없으면 this.transcript 존재x
            this.transcript?.pause();
        }

        this.play.render();
        this.loop.render();
    };

    this.init();
})();
