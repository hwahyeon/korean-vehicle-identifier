import { vehicleInfo } from "https://cdn.jsdelivr.net/npm/kr-vehicle-identifier@1.0.5/+esm";

const input = document.getElementById("plate");
const output = document.getElementById("result");

input.addEventListener("input", () => {
  const plate = input.value.trim();
  if (plate === "") {
    output.innerHTML = `<code>여기에 결과가 표시됩니다.</code>`;
    return;
  }
  try {
    const result = vehicleInfo(plate);
    const formatted = JSON.stringify(result, null, 2)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    output.innerHTML = `<code>${formatted}</code>`;
  } catch (e) {
    console.error(e);
    output.innerHTML = `<code>분석 중 오류 발생</code>`;
  }
});
