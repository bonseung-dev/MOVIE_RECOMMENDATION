const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWIxNDlmMDNlNTU2ZmVhMzk5NTI4NTdhYjQzOTE4NCIsIm5iZiI6MTczNjMyNjY2Ny41MTEwMDAyLCJzdWIiOiI2NzdlM2UwYjQzZmM3YjJhZThiYjAyYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.goutA9STdbzGRpQRyUuc-pL5fCxW1Lbp-attYU5bD0Q'
    }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    .then(res => res.json())
    .then(res => {
        res.results.forEach(movie => {
            console.log(movie.title); // 각 영화의 제목을 출력
        });
    })
    .catch(err => console.error(err));