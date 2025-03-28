// 반환 타입은 Promise<User> 타입
// 여기서는 API 호출을 통해서 User 객체를 반환받으므로 User를 Promise 타입으로 감싸서 반환
function fetchUser(id) {
    // 비동기 작업(API 호출)을 진행
    return fetch("https://jsonplaceholder.typicode.com/users/".concat(id))
        .then(function (response) {
        // 정상 응답 코드가 아닌 경우
        if (!response.ok) {
            // 에러 발생
            throw new Error("HTTP error! Status: ".concat(response.status));
        }
        // json 메서드도 비동기 작업으로 Promise<any> 타입을 반환하므로 형변환을 통해서 Promise<User> 객체를 반환하도록 함
        return response.json();
    });
}
// fetch의 1번째 then은 시작줄과 헤더의 정보를, 2번째 then은 바디의 정보를 담음!
// user는 User 타입으로 인식됨
fetchUser(1).then(function (user) {
    // 따라서 name, email 속성에 접근 가능
    console.log("\"".concat(user.name, "\"\uC758 \uC774\uBA54\uC77C\uC740 \"").concat(user.email, "\"\uC774\uBA70 \uC544\uC774\uB514\uB294 ").concat(user.id, "\uC785\uB2C8\uB2E4."));
});
