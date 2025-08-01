# korean-vehicle-identifier

- A JavaScript library for analyzing Korean **license plates** to identify vehicle type and usage. [README in Korean](./README.md)

## Try it Online

[View Live Demo](https://hwahyeon.github.io/korean-vehicle-identifier)

## Installation

```bash
npm install kr-vehicle-identifier
```

## Usage
### CommonJS
```javascript
const vehicle = require("kr-vehicle-identifier");

console.log(vehicle.vehicleInfo("123가4567"));
// { vehicleType: '승용차', usage: '개인용 / 비사업용' }
```

### ES Modules
```javascript
import vehicle from "kr-vehicle-identifier";

console.log(vehicle.vehicleInfo("123가4567"));
// { vehicleType: '승용차', usage: '개인용 / 비사업용' }
```

### Regular Vehicles

```javascript
vehicle.vehicleInfo("123가4567"); // { vehicleType: '승용차', usage: '개인용 / 비사업용' }
vehicle.vehicleInfo("02허1234"); // { vehicleType: '승용차', usage: '대여용' }
vehicle.vehicleInfo("79보1234"); // { vehicleType: '승합차', usage: '개인용 / 비사업용' }
vehicle.vehicleInfo("80배1234"); // { vehicleType: '화물차', usage: '택배용' }
```

### Construction Equipment

```javascript
vehicle.vehicleInfo("012가5006"); // { vehicleType: '콘크리트 피니셔', usage: '자가용' }
vehicle.vehicleInfo("026거1234"); // { vehicleType: '도로보수트럭', usage: '자가용' }
vehicle.vehicleInfo("026러5234"); // { vehicleType: '콘크리트믹서트레일러', usage: '자가용' }
```

### Special Purpose Vehicles

```javascript
vehicle.vehicleInfo("12국 3456"); // { vehicleType: '승용차', usage: '국방부 및 직할부대' }
vehicle.vehicleInfo("외교 012-345"); // { vehicleType: '알 수 없음', usage: '대사관' }
vehicle.vehicleInfo("외빈 108"); // { vehicleType: '알 수 없음', usage: '외빈' }
```

### Notes

```javascript
vehicle.vehicleInfo(""); // { error: 'Invalid license plate format. Expected formats: "12가3456" or "026거1234"' }
vehicle.vehicleInfo("ANN-0509"); // { error: 'Invalid license plate format. Expected formats: "12가3456" or "026거1234"' }
```

- If the input format is invalid, the returned object will include an `error` field.
- This API is tailored for South Korean license plate formats. It may not work correctly with plates from other countries.

## API

### `vehicleInfo(licensePlate)`

Analyzes the given Korean vehicle license plate string to determine the vehicle type and usage.

- **Parameters**
  - `licensePlate` (`string`): The license plate to analyze. Acceptable formats include both normal vehicles (e.g., `"123가4567"`) and construction machines (e.g., `"026거1234"`).
- **Returns**
  - An object containing:
    - `vehicleType` (`string`): Type of the vehicle (e.g., 승용차, 화물차, 건설기계).
    - `usage` (`string`): Usage classification (e.g., 자가용, 영업용, 대여용).
    - `error` (`string`, optional): Present only when the input is invalid.

## License

MIT
