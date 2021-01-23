// const REDIRECT_URI = "https://letshadow.netlify.app";
// const REDIRECT_URI = "http://localhost:5500";
const REDIRECT_URI = "http://localhost:8080/oauth/callback";
const CLIENT_ID =
    "758204078687-dhoc57phmqfj5epv6vvi327kguumm9p8.apps.googleusercontent.com";
const CLIENT_SECRET = "vRDY1-vBeRsXstnZlrYqrgGF";
const LANGUAGE = "es";

export async function fetchVideos(token) {
    const response = await fetch("http://localhost:8080/videos", {
        method: "get",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    if (response.status == 400 || response.status == 403) {
        alert("UnAuthorized 로그인이 필요합니다");
        location.href = "/login.html";
    }
    return await response.json();
}

export async function fetchTimedText(videoId) {
    const response = await fetch(
        `https://video.google.com/timedtext?lang=${LANGUAGE}&v=${videoId}`
    );
    return await response.text();
}

export async function fetchTranslate(word) {
    const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?q=${word}&target=ko&source=${LANGUAGE}&key=AIzaSyDUGzvwaAESxzaSO2Lr2iXseACgzjdV3mM`,
        {
            method: "POST",
        }
    );
    const json = await response.json();
    return json.data.translations;
}

export async function fetchNewServerToken(refreshToken) {
    let params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const accessTokenRes = await fetch(`http://localhost:8080/oauth/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${window.btoa("test:test")}`,
        },
        credentials: "same-origin",
        body: params,
    });
    return await accessTokenRes.json();
}

export async function fetchGoogleEmail(token) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
        );
        return await response.json();
    } catch (e) {
        throw new Error("token expired!");
    }
}

export async function fetchServerToken(username, password) {
    let params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("scope", "read write");
    params.append("username", username);
    params.append("password", password);

    const accessTokenRes = await fetch(`http://localhost:8080/oauth/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${window.btoa("test:test")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "same-origin",
        body: params,
    });

    return await accessTokenRes.json();
}

export async function fetchGoogleToken(code) {
    let params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", REDIRECT_URI);

    const response = await fetch(`https://oauth2.googleapis.com/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });
    return await response.json();
}

export function fetchGoogleCode() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: "openid profile email https://www.googleapis.com/auth/youtube",
        include_granted_scopes: "true",
        state: "pass-through value",
        access_type: "offline",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}
