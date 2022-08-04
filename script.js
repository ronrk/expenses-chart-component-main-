const allItems = document.querySelectorAll("li");

const getData = async function () {
  const res = await fetch("data.json");
  const data = res.json();
  return data;
};

const getTheHigherExpanceEl = function (arr) {
  const getElementRelativePerc = (arr, maxVal) => {
    arr.forEach((el) => {
      el.relativePx = 200 * ((el.amount / maxVal) * 100 * 0.01) + "px";
    });
  };
  let max = 0;

  arr.forEach((el) => {
    el.amount > max && (max = el.amount);
  });
  getElementRelativePerc(arr, max);
  const highestExpance = arr.find((el) => el.amount === max);
  return [document.getElementById(highestExpance.day), max];
};

const renderExpances = function (obj) {
  console.log(obj);
  obj.forEach((el, i) => {
    allItems[i].querySelector(".expence").style.height = el.relativePx;
    allItems[i].querySelector(".amount").textContent = `$${el.amount}`;
  });
};

const displayAmount = function (e) {
  console.log(e);
  e.target.querySelector(".amount").classList.toggle("show");
};

let expances = await getData();
const highestExpanece = getTheHigherExpanceEl(expances);
console.log(highestExpanece);
allItems.forEach((item) => item.classList.remove("highest"));
highestExpanece[0].classList.add("highest");
allItems.forEach((item) => {
  item.addEventListener("mouseenter", displayAmount);
  item.addEventListener("mouseleave", displayAmount);
});

renderExpances(expances);
