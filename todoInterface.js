// 다양한 반환 데이터 타입을 지원하는 API 요청 함수
function apiRequest(endpoint) {
    // 적절한 endpoint로 바꿔주고 fetch 함수를 통해 데이터를 가져옴
    return fetch("https://jsonplaceholder.typicode.com".concat(endpoint))
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error! Status: ".concat(response.status));
        }
        // 전달한 T 타입으로 형변환
        return response.json();
    });
}
function getUserData(userId) {
    return apiRequest("/users/".concat(userId))
        .then(function (data) {
        console.log("\uC544\uC774\uB514: ".concat(data.id, "\n\uC774\uB984: ").concat(data.name, "\n\uC774\uBA54\uC77C: ").concat(data.email));
    })
        .catch(function (error) {
        console.error("API 요청 실패:", error);
    });
}
function getTodoData(todoId) {
    return apiRequest("/todos/".concat(todoId))
        .then(function (data) {
        console.log("\uC0AC\uC6A9\uC790 \uC544\uC774\uB514: ".concat(data.userId, "\n\uD560 \uC77C: ").concat(data.title, "\n\uC644\uB8CC \uC5EC\uBD80: ").concat(data.completed));
    })
        .catch(function (error) {
        console.error("API 요청 실패:", error);
    });
}
getUserData(1);
getTodoData(1);
