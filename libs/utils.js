export const getTimestamp = (timestamp) => {
    if (!timestamp) return "00:00";

    const min = Math.floor(timestamp / 60);
    const sec = Math.floor(timestamp % 60);
    const minStr = min < 10 ? "0" + min : min;
    const secStr = sec < 10 ? "0" + sec : sec;
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
