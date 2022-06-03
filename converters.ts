const 일백만원 = 1000000;
const 일억원 = 100 * 일백만원;

export function 백만원(number: number) {
  return number * 일백만원;
}

export function 억원(number: number) {
  return number * 일억원;
}
