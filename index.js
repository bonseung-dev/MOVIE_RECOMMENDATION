const resultUl = document.querySelector("#result"); // ul 태그 변수화
const searchBtn = document.querySelector("#searchBtn"); // 버튼
const searchInput = document.querySelector("#searchTxt"); // 검색창
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // 이미지 url
const modal = document.querySelector(".modal"); // 모달
const modalTitle = document.getElementById("modal-title"); // 모달 제목
const modalBody = document.getElementById("modal-body"); // 모달 내용
const modalImage = document.getElementById("modal-image"); // 모달 사진
const closeModal = document.querySelector(".close"); // 모달 닫기
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWIxNDlmMDNlNTU2ZmVhMzk5NTI4NTdhYjQzOTE4NCIsIm5iZiI6MTczNjMyNjY2Ny41MTEwMDAyLCJzdWIiOiI2NzdlM2UwYjQzZmM3YjJhZThiYjAyYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.goutA9STdbzGRpQRyUuc-pL5fCxW1Lbp-attYU5bD0Q'
    }
};


let postArray = [];
// 패치 데이터
function fetchData() {
    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
        .then(res => res.json())
        .then(res => {
            postArray = res.results;
            displayPosts(postArray);

        })
}



function displayPosts(posts) {
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

// 필터링 함수
function filterPosts() {
    const keyword = searchInput.value.toLowerCase(); // 입력된 키워드 가져오기
    const filteredPosts = postArray.filter(function (res) {
        return res.title.toLowerCase().includes(keyword);
    });
    displayPosts(filteredPosts); // 필터링된 결과 표시
}

// 필터링 이벤트
searchBtn.addEventListener("click", filterPosts);

// 엔터 키 호출 함수
searchInput.addEventListener("keypress", function (e) {
    if (event.key === 'Enter') {
        filterPosts(); // 필터링 함수 호출
    }
});

// 모달창
resultUl.addEventListener("click", function (e) {
    const item = e.target.closest(".item");
    if (item) {
        const movieId = item.getAttribute("data-id");
        const selectedMovie = postArray.find(movie => movie.id == movieId);

        if (selectedMovie) {
            modalTitle.textContent = selectedMovie.title;
            modalBody.textContent = selectedMovie.overview;
            modalImage.src = imageBaseUrl + selectedMovie.poster_path;
            modal.style.display = "block"; // 모달 열기
        }
    }
});

// 모달창 닫기
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});



