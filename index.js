const resultUl = document.querySelector("#result");
// 여기에서 외부로부터 데이터를 가지고 와서 ul태그에 넣으면 되겠다.
const searchBtn = document.querySelector("#searchBtn"); // 버튼
const searchInput = document.querySelector("#searchTxt"); // 검색창
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // 이미지 url
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWIxNDlmMDNlNTU2ZmVhMzk5NTI4NTdhYjQzOTE4NCIsIm5iZiI6MTczNjMyNjY2Ny41MTEwMDAyLCJzdWIiOiI2NzdlM2UwYjQzZmM3YjJhZThiYjAyYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.goutA9STdbzGRpQRyUuc-pL5fCxW1Lbp-attYU5bD0Q'
    }
};

let postArray = [];

function fetchData () {
    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    .then(res => res.json())
    .then(res => {
        postArray = res.results;
        displayPosts(postArray);
        
    })
}



function displayPosts (posts) {
    let movieStr = "";
    for (let i = 0; i < posts.length; i++) {
        movieStr += `<li class="item" data-id = "${posts[i].id}">
            <img src="${imageBaseUrl}${posts[i].poster_path}" class = "img"alt="${posts[i].original_title}"><br>
            ${posts[i].title}<br>
            ⭐${posts[i].vote_average}
            </li>`;
    }
    resultUl.innerHTML = movieStr;
}
fetchData();


searchBtn.addEventListener("click", function(){
    // 1. 검색 field에 입력된 값을 가져와야 함.
    // 2. 그 값으로 list를 필터링
    const keyword = searchInput.value;

    const filteredPosts = postArray.filter(function (res) {
       return res.title.toLowerCase().includes(keyword);
    });
    displayPosts(filteredPosts);
});

