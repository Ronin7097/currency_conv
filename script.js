
const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdown = document.querySelectorAll(".con select");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let ans = document.querySelector("b");
let change= document.querySelector("#exchange");
for (let op of dropdown) {
  for (code in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = code;
    newoption.value = code;
    if (op.name == "from" && code == "USD") newoption.selected = "selected";
    if (op.name == "to" && code == "INR") newoption.selected = "selected";
    op.append(newoption);
  }
  op.addEventListener("change", (eve) => {
    tar = countryList[eve.target.value];
    let sr = `https://flagsapi.com/` + tar + `/flat/48.png`;
    op.parentElement.querySelector("img").src = sr;
  });
}

window.onload = () =>update();

document.querySelector("#calculate").addEventListener("click", (eve) => {
  eve.preventDefault();
  update();
});

const update = async () => {
  let amt = document.querySelector("input").value;
  if (amt < 1) {
    amt = 1;
    document.querySelector("input").value = 1;
  }
  let data = await fetch(url + from.value.toLowerCase() + ".json");
  let value1 = await data.json();
  let val = value1[from.value.toLowerCase()][to.value.toLowerCase()];
  ans.innerText = amt + " " + from.value + " = " + val * amt + " " + to.value;
};
