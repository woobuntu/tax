declare namespace 소득공제 {
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

  interface 배우자가있는여성 {
    종합소득금액: number; // 추후 소득금액별로 분류해야 할 수도 근로소득만 있는 경우에는 기준이 다르기에
    배우자존재유무: "유"; // 12.31 가족관계증명서 기준
  }

  interface 배우자가없는여성 {
    종합소득금액: number;
    배우자존재유무: "무";
    세대주여부: boolean; // 12.31 주민등록표등본 기준
    기본공제대상자인부양가족유무: boolean;
  }

  type 여성 = 배우자가있는여성 | 배우자가없는여성;
}
