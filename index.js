import YL from "./modules/index.js";
import Loop from "./components/Loop.js";
import Play from "./components/Play.js";
import Status from "./libs/status.js";

new (function () {
    this.init = () => {
        this.videoId = location.search.substring(
            location.search.lastIndexOf("=") + 1
        );
        console.log(this.videoId);

        this.player = YL("player", {
            videoId: this.videoId,
            width: "100%",
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

    this.onReadyVideo = () => {
        console.log("ready!");
    };

    this.onStateChangeVideo = (event) => {
        const { data } = event;

        if (this.player.isPlaying(data)) {
            this.status.play();
            this.loop.start();
        }
        if (this.player.isPaused(data)) {
            this.status.pause();
        }

        this.play.render();
        this.loop.render();
    };

    this.init();
})();
