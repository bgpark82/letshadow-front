export const getTimestamp = (timestamp) => {
    if (!timestamp) return "00:00";

    const min = Math.floor(timestamp / 60);
    const sec = Math.floor(timestamp % 60);
    const minStr = min < 10 ? "0" + min : min;
    const secStr = sec < 10 ? "0" + sec : sec;
    console.log("timestamp: ", timestamp, min, sec);
    return minStr + ":" + secStr;
};

export const log = (message, ...data) => {
    console.log(`[ INFO ] ${message} : `, ...data);
};

export const setCookie = (name, value, days) => {
    var d = new Date();
    d.setTime(d.getTime() + 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};

export const getCookie = (name) => {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
};

// const renderVideos = async () => {
//     this.email = this.getCookie("email");
//     this.google_access_token = this.getCookie("google_access_token");
//     this.google_refresh_token = this.getCookie("google_refresh_token");
//     this.server_access_token = this.getCookie("server_access_token");
//     this.server_refresh_token = this.getCookie("server_refresh_token");

//     log("google_access_token", this.google_access_token);
//     log("google_refresh_token", this.google_refresh_token);
//     log("server_access_token", this.server_access_token);
//     log("server_refresh_token", this.server_refresh_token);

//     if (location.search) {
//         await this.getGoogleToken();
//     }
//     // if (this.google_token) this.$loginBtn.style.display = "none"
//     if (
//         (this.server_access_token == "undefined" &&
//             this.server_refresh_token == "undefined") ||
//         (!this.server_access_token && !this.server_refresh_token)
//     ) {
//         await this.getServerToken();
//     }
//     if (this.google_access_token) {
//         await this.getVideos();
//         await this.render();
//     }
// };

// const getServerToken = async () => {
//     const server_token = await fetchServerToken(
//         this.email,
//         this.google_access_token
//     );
//     this.server_access_token = server_token.access_token;
//     this.server_refresh_token = server_token.refresh_token;
//     log("server token", server_token);

//     this.setCookie(
//         "server_access_token",
//         this.server_access_token,
//         server_token.expires_in
//     );
//     this.setCookie(
//         "server_refresh_token",
//         this.server_refresh_token,
//         60 * 60 * 30
//     );
// };

// const getGoogleToken = async () => {
//     const param = new URLSearchParams(location.search);
//     const code = param.get("code");

//     // 400 -> token 만료 -> refresh token 있으면, token 호출
//     const google_token = await fetchGoogleToken(code);
//     this.google_access_token = google_token.access_token;
//     this.google_refresh_token = google_token.refresh_token;

//     const check_token = await fetchGoogleEmail(this.google_access_token);
//     this.email = check_token.email;

//     this.setCookie(
//         "google_access_token",
//         this.google_access_token,
//         google_token.expires_in
//     );
//     this.setCookie(
//         "google_refresh_token",
//         this.google_refresh_token,
//         60 * 60 * 30
//     );
//     this.setCookie("email", this.email, google_token.expires_in);

//     log("google token", google_token);
//     log("google email", this.email);

//     // location.href = "/";
// };

// const setCookie = (name, value, days) => {
//     var d = new Date();
//     d.setTime(d.getTime() + 1000 * days);
//     document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
// };

// const getCookie = (name) => {
//     var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
//     return v ? v[2] : null;
// };
