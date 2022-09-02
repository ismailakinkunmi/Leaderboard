import "./style.css";

const username = document.getElementById("fullname");
const userScore = document.getElementById("score");
const btn = document.querySelector("form");
const url =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1d9458c6-9d48-48f9-a796-24af62abe570/scores";

const postScore = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      user: username.value,
      score: userScore.value,
    }),
  });
  btn.reset();
  return response;
};

btn.addEventListener("submit", (e) => {
  e.preventDefault();
  postScore();
});

const getData = async () => {
  const scoreData = await fetch(url);
  const data = await scoreData.json();
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.result.forEach((e) => {
    list.innerHTML += `<li><p>${e.user}: ${e.score}</p></li>`;
  });
};

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

window.addEventListener("load", (e) => {
  e.preventDefault();
  getData();
});
