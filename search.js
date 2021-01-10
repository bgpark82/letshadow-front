(function () {
    this.init = () => {
        this.list;
        this.$list = document.getElementById("list");

        this.$search = document.getElementById("search")
        this.$searchBtn = document.getElementById("searchBtn")

        this.fetchList({ keyword: "영국남자" });

        this.$search.addEventListener('change',(e) => {
            this.videoId = e.target.value
        })
        this.$searchBtn.addEventListener('click',() => {
            location.href = `/index.html?videoId=${this.videoId}`
        })
    };

    this.fetchList = async ({
        keyword,
        maxResults = 25,
        videoCaption = "closedCaption",
    }) => {
        const response = await fetch();
        // `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCmQfUK0N_xkqBxPPUFgEW6BYuWFXkau-8&q=${keyword}&part=snippet`
        this.list = await response.json();
        console.log(this.list);
        this.render();
    };

    this.render = () => {
        console.log(this.list);
        this.list.items.reduce(($ul, video) => {
            console.log(video.snippet);
            $ul.innerHTML += `
                <li>
                    <a href="/index.html/${video.id.videoId}" >
                    <img src="${video.snippet.thumbnails.default.url}" />
                    <div>${video.snippet.title}</div>
                    </a>
                </li>
            `;
            return $ul;
        }, this.$list);
    };

    this.init();
})();
