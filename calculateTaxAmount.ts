import { 백만원, 억원, 퍼센트 } from "./converters";
import { subtract, chain, lte } from "lodash";

const 과세표준및세율: { 세율구간: number; 세율: number }[] = [
  {
    세율구간: 백만원(12),
    세율: 퍼센트(6),
  },
  {
    세율구간: 백만원(46),
    세율: 퍼센트(15),
  },
  {
    세율구간: 백만원(88),
    세율: 퍼센트(24),
  },
  {
    세율구간: 억원(1.5),
    세율: 퍼센트(35),
  },
  {
    세율구간: 억원(3),
    세율: 퍼센트(38),
  },
  {
    세율구간: 억원(5),
    세율: 퍼센트(40),
  },
  {
    세율구간: 억원(10),
    세율: 퍼센트(42),
  },
];

export default function 산출세액산정(과세표준: number) {
  let 이전구간누적공제액 = 0;
  let 이전세율구간 = 0;
  for (const { 세율구간, 세율 } of 과세표준및세율) {
    if (lte(과세표준, 세율구간)) {
      const 총공제액 = chain(과세표준)
        .subtract(세율구간)
        .multiply(세율)
        .add(이전구간누적공제액)
        .value();

      return subtract(과세표준, 총공제액);
    }
    이전구간누적공제액 = chain(세율구간)
      .subtract(이전세율구간)
      .multiply(세율)
      .add(이전구간누적공제액)
      .value();

    이전세율구간 = 세율구간;
  }
  // 10억초과
  const 총공제액 = chain(과세표준)
    .subtract(억원(10))
    .multiply(퍼센트(45))
    .add(이전구간누적공제액)
    .value();

  return subtract(과세표준, 총공제액);
}
