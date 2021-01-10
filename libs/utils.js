export const getTimestamp = (timestamp) => {
    if (!timestamp) return "00:00";
    
    const min = Math.floor(timestamp / 60);
    const sec = Math.floor(timestamp % 60);
    const minStr = min < 10 ? "0" + min : min;
    const secStr = sec < 10 ? "0" + sec : sec;
    console.log("timestamp: ", timestamp, min, sec);
    return minStr + ":" + secStr;
};
