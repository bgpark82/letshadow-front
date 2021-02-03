// import Cookies from "js-cookie";
import {
    fetchNewServerToken,
    fetchUserInfo,
    fetchVideos,
} from "../libs/api.js";
import { getCookie, setCookie } from "../libs/utils.js";

new (function () {
    this.init = () => {
        this.video;
        this.access_token;
        this.refresh_token;

        this.$ul = document.getElementById("list");
        this.$right = document.querySelector(".right");

        this.fetchTokenAndVideo();
    };

    this.fetchTokenAndVideo = async () => {
        // 서버에서 token을 가져올 경우

        if (location.search) {
            const param = new URLSearchParams(location.search);
            const accessToken = param.get("access_token");
            const refreshToken = param.get("refresh_token");
            const expires = param.get("expires_in");
            setCookie("access_token", accessToken, expires);
            setCookie("refresh_token", refreshToken, 60 * 60 * 30);
            location.href = "/";
        }

        // 최초 메인 페이지 접속 시
        this.access_token = getCookie("access_token");
        this.refresh_token = getCookie("refresh_token");

        if (!this.access_token && this.refresh_token) {
            console.log("no access_token, exist refresh token - refresh token");
            const {
                access_token,
                refresh_token,
                expires_in,
            } = await fetchNewServerToken(this.refresh_token);
            this.access_token = access_token;
            this.refresh_token = refresh_token;
            setCookie("access_token", access_token, expires_in);
            setCookie("refresh_token", refresh_token, 60 * 60 * 30);
        }

        if (!this.access_token && !this.refresh_token) {
            const $li = document.createElement("div");
            $li.className = "empty";
            $li.innerHTML = "좋아요한 영상이 없습니다 😥";
            this.$ul.appendChild($li);

            const $loginBtn = document.createElement("button");
            $loginBtn.innerHTML = "로그인";
            $loginBtn.addEventListener("click", () => {
                location.href = "/login.html";
            });
            this.$right.appendChild($loginBtn);
        }

        if (this.refresh_token) {
            this.videos = await fetchVideos(this.access_token);
            this.user = await fetchUserInfo(this.access_token);
            console.log(this.user);

            await this.render();
        }
    };

    this.render = () => {
        if (!this.videos) throw new Error("비디오 리스트가 없습니다");
        const $thumbnail = document.createElement("div");
        $thumbnail.className = "thumbnail";
        const $img = document.createElement("img");
        $img.src = this.user.picture;
        $thumbnail.appendChild($img);

        this.$right.appendChild($thumbnail);
        this.videos.items.reduce((ul, video) => {
            const $li = document.createElement("li");
            $li.addEventListener("click", () => {
                location.href = `/search.html?videoId=${video.id}`;
            });
            $li.innerHTML = `
                <a href='#' class='right' data-duration='12:32'>
                <img src="${video.thumbnails.medium.url}" />
                </a>
                <div class='video-detail'>
                    <a class='title'>${video.title}</a>
                    <a class='channel-name'>${video.channelTitle}</a>
                    <div class='published-at'>${this.parseDate(
                        video.publishedAt
                    )}</div>
                </div>
            `;
            ul.appendChild($li);
            return ul;
        }, this.$ul);
    };

    this.parseDate = (date) => {
        return date.substr(0, 10);
    };

    this.init();
})();
