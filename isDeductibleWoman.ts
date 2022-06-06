import { lte } from "lodash";
import { 만원 } from "./converters";

export default function 부녀자추가공제대상여부판별(본인: 소득공제.여성) {
  if (본인.배우자존재유무 === "유") return lte(본인.종합소득금액, 만원(3000));
  return (
    본인.세대주여부 &&
    본인.기본공제대상자인부양가족유무 &&
    lte(본인.종합소득금액, 만원(3000))
  );
}
