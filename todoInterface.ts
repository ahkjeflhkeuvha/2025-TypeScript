interface UserInterface {
    id: number;
    name: string;
    email: string;
}

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// 다양한 반환 데이터 타입을 지원하는 API 요청 함수
function apiRequest<T>(endpoint: string): Promise<T> {
    // 적절한 endpoint로 바꿔주고 fetch 함수를 통해 데이터를 가져옴
    return fetch(`https://jsonplaceholder.typicode.com${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // 전달한 T 타입으로 형변환
            return response.json() as Promise<T>;
        });
}

function getUserData(userId: number): Promise<void> {
    return apiRequest<UserInterface>(`/users/${userId}`)
        .then(data => {
            console.log(`아이디: ${data.id}\n이름: ${data.name}\n이메일: ${data.email}`);
        })
        .catch(error => {
            console.error("API 요청 실패:", error);
        });
}

function getTodoData(todoId: number): Promise<void> {
    return apiRequest<Todo>(`/todos/${todoId}`)
        .then(data => {
            console.log(`사용자 아이디: ${data.userId}\n할 일: ${data.title}\n완료 여부: ${data.completed}`);
        })
        .catch(error => {
            console.error("API 요청 실패:", error);
        });
}

getUserData(1);
getTodoData(1);
