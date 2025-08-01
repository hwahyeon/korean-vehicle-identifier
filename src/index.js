const PERSONAL_USAGE_CHARS = new Set([
  "가", "나", "다", "라", "마",
  "거", "너", "더", "러", "머",
  "버", "서", "어", "저",
  "고", "노", "도", "로", "모",
  "보", "소", "오", "조",
  "구", "누", "두", "루", "무",
  "부", "수", "우", "주",
]);

/**
 * 차량 번호판 문자열을 앞 숫자, 가운데 한글, 뒤 숫자로 분리합니다.
 * 예: "12가3456" → { part1: "12", part2: "가", part3: "3456" }
 *
 * @param {string} input - 번호판 문자열 (공백, 특수문자 포함 가능)
 * @returns {{ part1: string, part2: string, part3: string } | null}
 *          유효한 번호판이면 각 부분을 나눠 반환하고, 그렇지 않으면 null 반환
 */
function splitLicensePlate(input) {
  const sanitizedInput = input.replace(/[^가-힣0-9]/g, "");
  const pattern = /^(\d+)?([가-힣]+)(\d+)?$/;
  const match = sanitizedInput.match(pattern);

  if (match) {
    return {
      part1: match[1] || "",
      part2: match[2],
      part3: match[3] || "",
    };
  } else {
    return null;
  }
}

/**
 * 번호판의 한글 글자를 기반으로 차량 용도를 판별합니다.
 *
 * @param {string} kalphabet - 번호판 중간에 위치한 한글 글자 (예: "가", "허", "외교")
 * @returns {string} 차량의 용도 (예: "개인용 / 비사업용", "영업용", "대여용", "알 수 없음")
 */
function analyzeLicensePlateUsage(kalphabet) {
  const usageMapping = {
    국: "국방부 및 직할부대",
    합: "합동참모본부 및 합동부대",
    육: "육군",
    해: "해군",
    공: "공군",
    아: "영업용",
    바: "영업용",
    사: "영업용",
    자: "영업용",
    배: "택배용",
    하: "대여용",
    허: "대여용",
    호: "대여용",
    임: "11일 이상 임시 운행",
    외빈: "외빈",
    외교: "대사관",
    영사: "영사관",
    준외: "준외교관",
    준영: "준영사관",
    국기: "국제기구",
    대표: "대표",
    협정: "협정",
  };

  if (usageMapping.hasOwnProperty(kalphabet)) {
    return usageMapping[kalphabet];
  }

  if (PERSONAL_USAGE_CHARS.has(kalphabet)) {
    return "개인용 / 비사업용";
  }

  return "알 수 없음";
}

/**
 * 번호판의 앞 숫자(part1)를 기반으로 차량 종류를 판별합니다.
 *
 * @param {string} part1 - 번호판의 앞부분 숫자 문자열 (예: "12", "123", "026")
 * @returns {string} 차량 종류 (예: "승용차", "화물차", "건설기계", "알 수 없음")
 */
function analyzeLicensePlateVehicleType(part1) {
  const part1Number = parseInt(part1, 10);

  if (isNaN(part1Number)) {
    return "알 수 없음";
  }

  if (
    part1.startsWith("0") &&
    part1.length === 3 &&
    part1Number >= 1 &&
    part1Number <= 27
  ) {
    return "건설기계";
  }

  if (part1Number >= 1 && part1Number <= 69) return "승용차";
  if (part1Number >= 70 && part1Number <= 79) return "승합차";
  if (part1Number >= 80 && part1Number <= 97) return "화물차";
  if (part1Number >= 98 && part1Number <= 99) return "특수차";
  if (part1Number >= 100 && part1Number <= 699) return "승용차";
  if (part1Number >= 700 && part1Number <= 799) return "승합차";
  if (part1Number >= 800 && part1Number <= 979) return "화물차";
  if (part1Number >= 980 && part1Number <= 997) return "특수차";
  if (part1Number >= 998 && part1Number <= 999) return "긴급자동차";

  return "알 수 없음";
}

/**
 * 일반 차량(건설기계가 아닌)의 번호판 정보를 기반으로 차량 종류와 용도를 분석합니다.
 *
 * @param {string} part1 - 번호판 앞 숫자 (차량 종류 분석용)
 * @param {string} part2 - 번호판 한글 (용도 분석용)
 * @returns {{ vehicleType: string, usage: string }} 차량 정보
 */
function analyzeVehicle(part1, part2) {
  const vehicleTypeInfo = analyzeLicensePlateVehicleType(part1);
  const usage = analyzeLicensePlateUsage(part2);

  return {
    vehicleType: vehicleTypeInfo || "알 수 없음",
    usage: usage || "알 수 없음",
  };
}

/**
 * 건설기계 차량의 번호판 정보를 기반으로 기계 종류와 용도를 분석합니다.
 *
 * @param {{ part1: string, part2: string, part3: string }} parts - 번호판 세 부분
 * @returns {{ vehicleType: string, usage: string }} 건설기계 정보
 */
function analyzeConstructionVehicle(parts) {
  const detailedMapping = {
    "001": "불도저",
    "002": "굴착기",
    "003": "로더",
    "004": "지게차",
    "005": "스크레이퍼",
    "006": "덤프트럭",
    "007": "기중기",
    "008": "모터 그레이더",
    "009": "롤러",
    "010": "노상안정기",
    "011": "콘크리트 배칭플랜트",
    "012": "콘크리트 피니셔",
    "013": "콘크리트 살포기",
    "014": "콘크리트 믹서트럭",
    "015": "콘크리트 펌프",
    "016": "아스팔트 믹싱플랜트",
    "017": "아스팔트 피니셔",
    "018": "아스팔트 살포기",
    "019": "골재살포기",
    "020": "쇄석기",
    "021": "공기압축기",
    "022": "천공기",
    "023": "항타·항발기",
    "024": "자갈채취기",
    "026": "특수건설기계",
    "027": "타워크레인",
  };

  const specialMapping = {
    거: "도로보수트럭",
    너: "노면파쇄기",
    더: "노면측정장비",
    러: "콘크리트믹서트레일러",
    머: "아스팔트콘크리트재생기",
    어: "수목이식기",
    버: "터널용고소작업차",
    저: "트럭지게차",
  };

  let vehicleType = detailedMapping[parts.part1] || "건설기계";

  // 특수 건설기계 세부 조항
  if (parts.part1 === "026") {
    vehicleType = specialMapping[parts.part2] || vehicleType;
  }

  // part3 기반으로 usage 결정
  const part3Number = parseInt(parts.part3, 10);
  let usage;
  if (part3Number >= 1 && part3Number <= 999) {
    usage = "관용";
  } else if (part3Number >= 1000 && part3Number <= 5999) {
    usage = "자가용";
  } else if (part3Number >= 6000 && part3Number <= 9999) {
    usage = "영업용";
  } else {
    usage = "알 수 없음";
  }

  return {
    vehicleType: vehicleType,
    usage: usage,
  };
}

/**
 * 번호판 문자열을 파싱하여 형식을 확인하고, 건설기계 여부를 판별하여 차량 유형을 반환합니다.
 *
 * @param {string} licensePlate - 차량 번호판 문자열
 * @returns {{
 *   parts: { part1: string, part2: string, part3: string },
 *   type: "건설기계" | "일반"
 * } | { error: string }} 차량 번호판 정보 또는 오류
 */
function getLicensePlatePartsAndType(licensePlate) {
  const parts = splitLicensePlate(licensePlate);

  if (!parts) {
    return {
      error:
        "Invalid license plate format. Expected formats: '12가3456' or '026거1234'",
    };
  }

  const isConstruction = isConstructionVehicle(parts.part1);

  return {
    parts,
    type: isConstruction ? "건설기계" : "일반",
  };
}

/**
 * 차량 번호판 전체 문자열을 분석하여 차량 종류와 용도 정보를 반환합니다.
 *
 * @param {string} licensePlate - 전체 차량 번호판 (예: "12가3456", "026거1234")
 * @returns {{
 *   vehicleType: string,
 *   usage: string
 * } | {
 *   error: string
 * }} 분석된 차량 정보 또는 오류 메시지
 */
function vehicleInfo(licensePlate) {
  const result = getLicensePlatePartsAndType(licensePlate);
  if ("error" in result) return result;

  const { parts, type } = result;

  return type === "건설기계"
    ? analyzeConstructionVehicle(parts)
    : analyzeVehicle(parts.part1, parts.part2);
}

module.exports = {
  vehicleInfo,
};
