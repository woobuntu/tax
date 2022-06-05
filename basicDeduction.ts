import { add, gte, lte, lt } from "lodash";

interface 본인 {
  관계: "본인";
}

interface 배우자 {
  관계: "배우자";
}

interface 자녀 {
  관계: "자녀";
  나이: number;
}

interface 직계존속 {
  관계: "직계존속";
  나이: number;
}

interface 형제자매 {
  관계: "형제자매";
  나이: number;
}

interface 위탁아동 {
  관계: "위탁아동";
  나이: number;
  보호기간연장여부: boolean;
}

interface 생계급여수급자 {
  관계: "생계급여수급자";
}

type 부양가족 = 자녀 | 형제자매 | 직계존속 | 위탁아동 | 생계급여수급자;

type 기본공제대상자 = 본인 | 배우자 | 부양가족;

export default function 기본공제액산출(...rest: 기본공제대상자[]) {
  return rest.reduce((기본공제액, 공제대상자) => {
    switch (공제대상자.관계) {
      case "생계급여수급자":
        return add(기본공제액, 150);
      case "본인":
        return add(기본공제액, 150);
      case "배우자":
        return add(기본공제액, 150);
      case "직계존속":
        return gte(공제대상자.나이, 60) ? add(기본공제액, 150) : 기본공제액;
      case "자녀":
      case "형제자매":
        return lte(공제대상자.나이, 20) || gte(공제대상자.나이, 60)
          ? add(기본공제액, 150)
          : 기본공제액;
      case "위탁아동":
        if (공제대상자.보호기간연장여부 && lte(공제대상자.나이, 20))
          return add(기본공제액, 150);
        if (!공제대상자.보호기간연장여부 && lt(공제대상자.나이, 18))
          return add(기본공제액, 150);
    }
  }, 0);
}
