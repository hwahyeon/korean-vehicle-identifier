const PERSONAL_USAGE_CHARS = new Set([
  "가", "나", "다", "라", "마",
  "거", "너", "더", "러", "머",
  "버", "서", "어", "저",
  "고", "노", "도", "로", "모",
  "보", "소", "오", "조",
  "구", "누", "두", "루", "무",
  "부", "수", "우", "주",
]);

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

function analyzeLicensePlateVehicleType(part1) {
  let vehicleType = "알 수 없음";

  if (part1.startsWith("0") && part1.length === 3) {
    const part1Number = parseInt(part1, 10);
    if (part1Number >= 1 && part1Number <= 27) {
      return "건설기계"; // "001"에서 "027"까지 건설기계
    }
    // 여기서는 return을 사용하지 않음으로써 "028"에서 "099"까지의 처리가 누락됨을 방지
  }
  const part1Number = parseInt(part1, 10);
  if (!isNaN(part1Number)) {
    if (part1Number >= 1 && part1Number <= 69) {
      vehicleType = "승용차";
    } else if (part1Number >= 70 && part1Number <= 79) {
      vehicleType = "승합차";
    } else if (part1Number >= 80 && part1Number <= 97) {
      vehicleType = "화물차";
    } else if (part1Number >= 98 && part1Number <= 99) {
      vehicleType = "특수차";
    } else if (part1Number >= 100 && part1Number <= 699) {
      vehicleType = "승용차";
    } else if (part1Number >= 700 && part1Number <= 799) {
      vehicleType = "승합차";
    } else if (part1Number >= 800 && part1Number <= 979) {
      vehicleType = "화물차";
    } else if (part1Number >= 980 && part1Number <= 997) {
      vehicleType = "특수차";
    } else if (part1Number >= 998 && part1Number <= 999) {
      vehicleType = "긴급자동차";
    }
  }
  return vehicleType;
}

function isConstructionVehicle(part1) {
  if (part1.startsWith("0") && part1.length === 3) {
    const part1Number = parseInt(part1, 10);
    return part1Number >= 1 && part1Number <= 27;
  }
  return false;
}

function analyzeVehicle(part1, part2) {
  const vehicleTypeInfo = analyzeLicensePlateVehicleType(part1);
  const usage = analyzeLicensePlateUsage(part2);

  return {
    vehicleType: vehicleTypeInfo || "알 수 없음",
    usage: usage || "알 수 없음",
  };
}

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

function vehicleInfo(licensePlate) {
  const parts = splitLicensePlate(licensePlate);

  if (!parts) {
    return { error: "Invalid license plate format" };
  }

  if (isConstructionVehicle(parts.part1)) {
    // 건설기계
    return analyzeConstructionVehicle(parts);
  } else {
    return analyzeVehicle(parts.part1, parts.part2);
  }
}

module.exports = {
  vehicleInfo,
};
