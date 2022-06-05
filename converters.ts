import { multiply } from "lodash";

const 일만원 = 10000;
const 일백만원 = 100 * 일만원;
const 일억원 = 100 * 일백만원;

export function 만원(number: number) {
  return multiply(number, 일만원);
}

export function 백만원(number: number) {
  return multiply(number, 일백만원);
}

export function 억원(number: number) {
  return multiply(number, 일억원);
}

export function 퍼센트(number: number) {
  return multiply(number, 0.01);
}
