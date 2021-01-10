function loadAPI() {
    const script = document.createElement("script");
    script.src = "https://youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
}

export default loadAPI;
