const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#search-txt");

function fetchData () {
    fetch();
}


const options = {
    method: 'GET', 
    headers: { 
        accept: 'application/json', 
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWIxNDlmMDNlNTU2ZmVhMzk5NTI4NTdhYjQzOTE4NCIsIm5iZiI6MTczNjMyNjY2Ny41MTEwMDAyLCJzdWIiOiI2NzdlM2UwYjQzZmM3YjJhZThiYjAyYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.goutA9STdbzGRpQRyUuc-pL5fCxW1Lbp-attYU5bD0Q'
    }
};

let url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
fetch(url, options)
    .then(res => res.json())
    .then(res => {
        const mainDiv = document.querySelector('.main'); // 메인 영역 선택
        mainDiv.innerHTML = ''; // 기존 내용 초기화

        res.results.forEach(movie => {
            const movieCard = createMovieCard(movie); // 영화 카드 생성 함수 호출
            mainDiv.appendChild(movieCard); // 메인 영역에 카드 추가
        });
    })
    .catch(err => console.error(err)); // 오류 발생 시 콘솔에 출력
    searchBtn.addEventListener("click", function() {
        alert("test")
    })
// 영화 카드 생성 함수
function createMovieCard(movie) {
    // 영화 제목, 포스터 URL, 평점 가져오기
    let movieName = movie.original_title; // 제목
    let posterImg = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 이미지 URL
    let voteAver = movie.vote_average; // 평점

    // HTML 문자열 생성
    let html = `
        <div class="col">
            <div class="card">
                <img src="${posterImg}" alt="${movieName} 포스터" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${movieName}</h3>
                    <p class="card-aver">평점: ${voteAver}</p>
                </div>
            </div>
        </div>
    `;

    // 임시 요소를 만들어 HTML을 설정
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html; // 생성한 HTML 문자열을 설정

    // 첫 번째 자식 요소를 가져옴 (여기서는 카드 요소)
    const childElement = tempElement.firstElementChild;

    return childElement; // 생성한 카드 요소를 반환

    
    
}

