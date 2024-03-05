# korean-vehicle-identifier
*An English user manual is being prepared.*
  
- 한국의 차량 번호를 분석하여 차량의 유형과 사용 목적을 식별하는 라이브러리입니다.
- A JavaScript library for analyzing Korean vehicle numbers to identify vehicle type and usage purpose.

## 설치

```bash
npm install kr-vehicle-identifier
```

## 사용 방법

```javascript
const vehicle = require("kr-vehicle-identifier");

console.log(vehicle.vehicleInfo("123가4567")); //{vehicleType: '승용차', usage: '개인용 / 비사업용'}
```

OR

```javascript
import vehicle from "kr-vehicle-identifier";

console.log(vehicle.vehicleInfo("123가4567")); //{vehicleType: '승용차', usage: '개인용 / 비사업용'}
```

### 보통 차량
```javascript
console.log(vehicle.vehicleInfo("123가4567"));    //{vehicleType: '승용차', usage: '개인용 / 비사업용'}
console.log(vehicle.vehicleInfo("02허1234"));     //{vehicleType: '승용차', usage: '대여용'}
console.log(vehicle.vehicleInfo("79보1234"));     //{vehicleType: '승합차', usage: '개인용 / 비사업용'}
console.log(vehicle.vehicleInfo("80배1234"));     //{vehicleType: '화물차', usage: '택배용'}
```

### 건설 기계
```javascript
console.log(vehicle.vehicleInfo("012가5006"));     //{vehicleType: '콘크리트 피니셔', usage: '자가용'}
console.log(vehicle.vehicleInfo("026거1234"));     //{vehicleType: '도로보수트럭', usage: '자가용'}
console.log(vehicle.vehicleInfo("026러5234"));     //{vehicleType: '콘크리트믹서트레일러', usage: '자가용'}
```

### 특수 목적 차량
```javascript
console.log(vehicle.vehicleInfo("12국 3456"));     //{vehicleType: '승용차', usage: '국방부 및 직할부대'}
console.log(vehicle.vehicleInfo("외교 012-345"));  //{vehicleType: '알 수 없음', usage: '대사관'}
console.log(vehicle.vehicleInfo("외빈 108"));      //{vehicleType: '알 수 없음', usage: '외빈'}
```

### 주의 사항
```javascript
console.log(vehicle.vehicleInfo(""));             //{error: 'Invalid license plate format'}
console.log(vehicle.vehicleInfo("ANN-0509"));     //{error: 'Invalid license plate format'}
```
- 입력된 차량 번호가 올바른 형식을 따르지 않는 경우, error 필드를 포함한 객체가 반환됩니다.
- 이 API는 한국 차량 번호 형식에 최적화되어 있습니다. 다른 국가의 차량 번호를 분석하는 데 사용할 경우, 정확한 결과를 보장할 수 없습니다.

## API
### `vehicleInfo(licensePlate)`
목적: 입력된 차량 번호로부터 차량의 유형과 사용 목적을 분석합니다.

- **매개변수**
  - `licensePlate` (string): 분석할 차량 번호판입니다.
- **반환값**
  - 분석된 차량 정보를 객체 형태로 반환합니다. 반환되는 객체에는 다음과 같은 필드가 포함됩니다:
    - `vehicleType` (string): 차량의 유형입니다. 예를 들어, "승용차", "건설기계", "알 수 없음" 등입니다.
    - `usage` (string): 차량의 사용 목적입니다. 예를 들어, "관용", "자가용", "영업용" 등입니다.
    - `error` (string, 선택적): 분석 과정에서 오류가 발생한 경우, 오류 메시지가 포함됩니다.

## 한국 차량 번호판

한국의 차량 번호판은 특정한 패턴을 따르며, 본 라이브러리는 이러한 패턴을 기반으로 차량 정보를 분석합니다.

### 차량 번호판 구조

한국의 차량 번호판은 대체로 "숫자-한글-숫자" 형식으로 구성되어 있으며, 간혹 "한글-숫자" 형식으로도 사용됩니다. 이 숫자와 한글 부분은 차량의 유형, 사용 목적 등의 다양한 정보를 담고 있습니다.

- **번호판 앞자리 수**  
    번호판에서 가장 먼저 나오는 숫자는 차종의 정보를 담고 있습니다.

| 기호    | 차량 유형  | 비고                                   |
| ------- | ---------- | -------------------------------------- |
| 01~69   | 승용차     |                                        |
| 70~79   | 승합차     |                                        |
| 80~97   | 화물차     |                                        |
| 98~99   | 특수차     | 트랙터, 캠핑카, 경찰차, 소방차         |
| 100~699 | 승용차     |                                        |
| 700~799 | 승합차     |                                        |
| 800~979 | 화물차     |                                        |
| 980~997 | 특수차     |                                        |
| 998~999 | 긴급자동차 |                                        |
| 001~027 | 건설기계   | 세 자리 숫자이며 "0"으로 시작 |

- **문자**   
    번호판의 문자는 자동차의 용도를 표현합니다.

| 기호 | 사용 목적 |
|---------|-------------------------|
| 가, 나, 다, 라, 마, <br/> 거, 너, 더, 러, 머, <br/> 버, 서, 어, 저, <br/> 고, 노, 도, 로, 모, <br/> 보, 소, 오, 조, <br/> 구, 누, 두, 루, 무, <br/> 부, 수, 우, 주 | 개인용 / 비사업용 |
| 아,바,사,자 | 영업용 자동차 |
| 배 | 택배용 자동차 |
| 하, 허, 호 | 대여용 자동차 |
| 국 | 국방부 및 직할부대 |
| 합 | 합동참보본부 및 합동부대 |
| 육 | 육군 |
| 해 | 해군 |
| 공 | 공군 |
| 임 | 11일 이상 임시 운행 |
| 외빈 | 외빈 |
| 외교 | 대사관 차량 |
| 영사 | 영사관 차량 |
| 준외 | 준외교관 |
| 준영 | 준영사관 |
| 국기 | 국제기구 |
| 대표 | 대표 |
| 협정 | 협정 |

- **마지막 네 자리 수**  
    마지막 네 자리 수는 임의의 일련번호이나, `건설기계`인 경우 아래의 표를 따릅니다.

| 기호 | 사용 목적 |
|---------------|-----------|
| 0001 ~ 0999 | 관용 |
| 1000 ~ 5999 | 자가용 |
| 6000 ~ 9999 | 영업용 |

- **건설기계**

| 기호 | 건설기계 유형       |
| ---- | ------------------- |
| 001  | 불도저              |
| 002  | 굴착기              |
| 003  | 로더                |
| 004  | 지게차              |
| 005  | 스크레이퍼          |
| 006  | 덤프트럭            |
| 007  | 기중기              |
| 008  | 모터 그레이더       |
| 009  | 롤러                |
| 010  | 노상안정기          |
| 011  | 콘크리트 배칭플랜트 |
| 012  | 콘크리트 피니셔     |
| 013  | 콘크리트 살포기     |
| 014  | 콘크리트 믹서트럭   |
| 015  | 콘크리트 펌프       |
| 016  | 아스팔트 믹싱플랜트 |
| 017  | 아스팔트 피니셔     |
| 018  | 아스팔트 살포기     |
| 019  | 골재살포기          |
| 020  | 쇄석기              |
| 021  | 공기압축기          |
| 022  | 천공기              |
| 023  | 항타·항발기         |
| 024  | 자갈채취기          |
| 026  | 특수건설기계        |
| 027  | 타워크레인          |

- **특수건설기계**  
    `특수건설기계(026)`인 경우, 번호판 문자로 더 자세한 용도를 알 수 있습니다.

| 기호 | 세부 유형              |
| ---- | ---------------------- |
| 26거 | 도로보수트럭           |
| 26너 | 노면파쇄기             |
| 26더 | 노면측정장비           |
| 26러 | 콘크리트믹서트레일러   |
| 26머 | 아스팔트콘크리트재생기 |
| 26어 | 수목이식기             |
| 26버 | 터널용고소작업차       |
| 26저 | 트럭지게차             |

## 라이센스

이 프로젝트는 MIT 라이센스를 따르고 있습니다.
