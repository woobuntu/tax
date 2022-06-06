import { add, gte, lte, lt } from "lodash";

export default function 기본공제액산출(...rest: 소득공제.기본공제대상자[]) {
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
