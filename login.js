import { fetchGoogleCode } from "./libs/api.js";

new (function () {
    this.init = () => {
        this.$login = document.getElementById("login");
        this.$login.addEventListener("click", this.onClickLogin);
    };

    this.onClickLogin = () => {
        fetchGoogleCode();
    };

    this.init();
})();
