// import Cookies from "js-cookie";
import { fetchVideos } from "./libs/api.js";
import { getCookie, log, setCookie } from "./libs/utils.js";

new (function () {
    this.init = () => {
        this.video;
        this.access_token;
        this.refresh_token;

        this.$list = document.getElementById("list");
        this.$ul = document.getElementById("list");

        this.fetchTokenAndVideo();
    };

    this.fetchTokenAndVideo = async () => {
        if (location.search) {
            const param = new URLSearchParams(location.search);
            const accessToken = param.get("access_token");
            const refreshToken = param.get("refresh_token");
            const expires = param.get("expires_in");
            setCookie("access_token", accessToken, expires);
            setCookie("refresh_token", refreshToken, 60 * 60 * 30);
            location.href = "/";
        }

        this.access_token = getCookie("access_token");
        log("access_token", this.access_token);

        if (!this.access_token) location.href = "/login.html";

        this.videos = await fetchVideos(this.access_token);
        log("video", this.videos);
        await this.render();
    };

    this.render = () => {
        this.videos.items.reduce((ul, video) => {
            const $li = document.createElement("li");
            $li.addEventListener("click", () => {
                location.href = `/search.html?videoId=${video.id}`;
            });
            $li.innerHTML = `
                <div>${video.id}</div>
                <div>${video.snippet.localized.title}</div>
                <img src="${video.snippet.thumbnails.default.url}" />
            `;
            ul.appendChild($li);
            return ul;
        }, this.$ul);
    };

    this.init();
})();
