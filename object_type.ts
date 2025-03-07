// // poetLater 변수에는 born과 name 속성이 있어야 하며,
// // born 속성은 number 타입이어야 하고, name 속성은 string 타입이어야 함
// let poetLater: {
//   born: number;
//   name: string;
// };

// // 아무 문제 없이 대입 가능
// poetLater = {
//   born: 1935,
//   name: "Mary Oliver",
// };

// // 객체가 아닌 값 대입 불가
// // Type 'string' is not assignable to type '{ born: number; name: string; }'
// poetLater = "Sappho";
// // 객체여도 구조(타입)가 맞지 않으므로 대입 불가
// poetLater = { born: "1935", name: 1234 };
// // 포함되면 안되는 속성이 있어도 대입 불가
// poetLater = { born: 1935, name: "Mary Oliver", end: 2024 };
// // 새 속성을 추가하는 것도 불가함을 유의! (자바스크립트에서는 잘 됨)
// poetLater.hello = 1234;

type FirstName = {
  firstName: string;
};

type LastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

let withFirstName: FirstName = hasBoth;
let withLastName: LastName = hasBoth;
