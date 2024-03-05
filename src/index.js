function splitLicensePlate(input) {
  const pattern = /^(\d+)?-?([가-힣]+)-?(\d+)$/;
  const match = input.match(pattern);

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
  let usage = "알 수 없음";

  const usageMapping = {
    국: "국방부 및 직할부대",
    합: "합동참보본부 및 합동부대",
    육: "육군",
    해: "해군",
    공: "공군",
    아: "영업용 자동차",
    바: "영업용 자동차",
    사: "영업용 자동차",
    자: "영업용 자동차",
    배: "택배용 자동차",
    하: "대여용 자동차",
    허: "대여용 자동차",
    호: "대여용 자동차",
    임: "11일 이상 임시 운행 번호판",
    외빈: "외빈",
    외교: "대사관 차량",
    영사: "영사관 차량",
    준외: "준외교관",
    준영: "준영사관",
    국기: "국제기구",
    대표: "대표",
    협정: "협정",
  };

  if (usageMapping.hasOwnProperty(kalphabet)) {
    usage = usageMapping[kalphabet];
  } else {
    const personalUsageChars =
      "가나다라마거너더러머버서어저고노도로모보소오조구누두루무부수우주";
    if (personalUsageChars.includes(kalphabet)) {
      usage = "개인용 / 비사업용";
    }
  }

  return usage;
}
