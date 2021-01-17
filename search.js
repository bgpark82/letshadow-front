// import Cookies from "js-cookie";
import {
    fetchGoogleToken,
    fetchGoogleCode,
    fetchGoogleEmail,
    fetchVideos,
    fetchServerToken,
} from "./libs/api.js";
import { log } from "./libs/utils.js";

new (function () {
    this.init = () => {
        this.video;
        this.email;
        this.google_access_token;
        this.google_refresh_token;
        this.server_access_token;
        this.server_refresh_token;

        this.$loginBtn = document.getElementById("login");
        this.$list = document.getElementById("list");

        this.renderVideos();
        this.bindEvents();
    };

    this.bindEvents = () => {
        this.$loginBtn.addEventListener("click", this.onClickLogin);
    };

    this.renderVideos = async () => {
        this.google_access_token = this.getCookie("google_access_token");
        this.google_refresh_token = this.getCookie("google_refresh_token");
        this.server_access_token = this.getCookie("server_access_token");
        this.server_refresh_token = this.getCookie("server_refresh_token");

        log("google_access_token", this.google_access_token);
        log("google_refresh_token", this.google_refresh_token);
        log("server_access_token", this.server_access_token);
        log("server_refresh_token", this.server_refresh_token);

        if (location.search && this.google_access_token == "undefined") {
            await this.getGoogleToken();
        }
        // if (this.google_token) this.$loginBtn.style.display = "none"
        // if (!this.server_access_token || !this.server_refresh_token) {
        //     await this.getServerToken();
        // }
        if (this.google_access_token) {
            await this.getVideos();
            await this.render();
        }
    };

    this.render = () => {
        const $ul = document.getElementById("list");
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
        }, $ul);
    };

    this.getServerToken = async () => {
        const server_token = await fetchServerToken();
        this.server_access_token = server_token.access_token;
        this.server_refresh_token = server_token.refresh_token;
        log("server token", server_token);

        document.cookie =
            "server_access_token=" + JSON.stringify(this.server_access_token);
        document.cookie =
            "server_refresh_token=" + JSON.stringify(this.server_refresh_token);
    };

    this.getGoogleToken = async () => {
        const param = new URLSearchParams(location.search);
        const code = param.get("code");

        const google_token = await fetchGoogleToken(code);
        this.google_access_token = google_token.access_token;
        this.google_refresh_token = google_token.refresh_token;

        const check_token = await fetchGoogleEmail(this.google_access_token);
        this.email = check_token.email;

        this.setCookie(
            "google_access_token",
            this.google_access_token,
            google_token.expires_in
        );
        this.setCookie(
            "google_refresh_token",
            this.google_refresh_token,
            60 * 60 * 30
        );
        this.setCookie("email", this.email, google_token.expires_in);

        log("google token", google_token);
        log("google email", this.email);
    };

    this.getVideos = async () => {
        console.log("check");
        this.videos = await fetchVideos(this.google_access_token);
    };

    this.onClickLogin = () => {
        fetchGoogleCode();
    };

    this.setCookie = (name, cookie, expire) => {
        const now = new Date();
        const time = now.getTime();
        const newTime = expire * 1000 + time;
        const newDate = new Date(newTime);
        document.cookie = `${name}=${JSON.stringify(
            cookie
        )};expires=${newDate}`;
    };

    this.getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    this.init();
})();
