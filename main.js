const students = [
  "01 Ashley Laurent Tan",
  "02 Ashley Loo Sze Qi",
  "03 Brendan Lok",
  "04 Cheah Yi Jing",
  "05 Chee Anh Tsuen",
  "06 Cheong Zheng Hong",
  "07 Cheu Qi Wen",
  "08 Chin Yi Hang",
  "09 Chin Ying Kai",
  "11 Chong Jia Min",
  "12 Chong Jun Bang",
  "13 Chong Ser Han",
  "14 Choong Min Yi Alyson",
  "15 Chu Yan Fong",
  "17 Esther Hong Yie En",
  "18 Gan Jin Xuan",
  "19 Goh Zhong Xuen",
  "20 Jayden Wong Zheng Yao",
  "21 John Lim Qi Yi",
  "22 Khoo Jing Yao",
  "23 Koo Kai Yuan",
  "24 Kyle Saw Kai Ler",
  "25 Lai Ern Ting",
  "26 Lee Bowie",
  "27 Lee Jia Yi",
  "28 Lew Rui Thong",
  "29 Lim Jia Le",
  "30 Lim Jia Shen",
  "31 Lim Yu Guang",
  "32 Low Park Lam",
  "33 Low Ting Xuan",
  "34 Na Yunn Qii",
  "35 Naa Kai Yan",
  "36 Nee Jia Hui",
  "37 Ooi Kah Jun",
  "38 Pang Chang Loong",
  "39 Phua Chuen Wen",
  "40 Poong Zhi Yong",
  "41 Rohan Kee Zhong Ren",
  "42 Sean Yap Jun Hong",
  "43 Tan Shu Xuan",
  "44 Tan Wai Keat",
  "45 Teo Zhi Hao",
  "46 Teoh Ginny",
  "47 Yap Huan Yuan"
];
const socket = io();

socket.on("pickUpdate", (data) => {
  pickUpdate(false, data);
});

socket.on("pickUpdate2", (data) => {
  pickUpdate(true, data);
});

window.onload = async function() {
  window.setTimeout(function() {
    document.getElementById("transition").classList.remove('white');
  }, 1000);
  update();
}

function alert(error, title = "Whoops!") {
  document.querySelectorAll(".error-container > p")[0].innerHTML = error;
  document.querySelectorAll(".error-container > h2")[0].innerHTML = title;
  document.getElementsByClassName("error")[0].classList.add("show");
}

function closealert() {
  document.getElementsByClassName('error')[0].classList.remove('show');
  setTimeout(() => {document.querySelectorAll('.error-container > p')[0].innerHTML = 'Too fast! Slow down'}, 1000)
  setTimeout(() => {document.querySelectorAll('.error-container > h2')[0].innerHTML = 'Whoops!'}, 1000)
}

function update() {
  let tableElement = document.getElementById("table").children[1].children[0];
  for (let row in tabledata) {
    rows = tabledata[row]; // The array of columns
    for (let col in rows) {
      cols = rows[col]; // The columns content
      if (cols != "") {
        tableElement.children[Object.keys(tabledata).indexOf(row)+1].children[parseInt(col)+1].innerHTML = cols;
      }
    }
  }
  for (let student in students) {
    student = students[student];
    let option = document.createElement("option");
    option.setAttribute("value", student);
    option.innerHTML = student;
    document.getElementById("name").appendChild(option);
  }
  document.getElementById('name').selectedIndex = -1;
}

function pickUpdate(type, data) {
  let row = data.slice(0, 1);
  let col = data.slice(1, 2);
  let name = data.slice(2,);
  if (type) {
    for (let rows in Array.from(document.getElementById("table").children[1].children[0].children)) {
      rows = document.getElementById("table").children[1].children[0].children[parseInt(rows)];
      for (let cols in Array.from(rows.children)) {
        cols = Array.from(rows.children)[parseInt(cols)];
        if (cols.innerHTML == name) {
          cols.innerHTML = `<a onclick="pick('${row}${col}')">Pick</a>`;
        }
      }
    }
    document.getElementById("table").children[1].children[0].children[parseInt(row)+1].children[parseInt(col)+1].innerHTML = name;
  } else {
    document.getElementById("table").children[1].children[0].children[parseInt(row)+1].children[parseInt(col)+1].innerHTML = name;
  }
}

var selected;

function enter() {
  if (document.getElementById("name").value == "") {
    alert("You need to pick a name!");
    return;
  }
  selected = document.getElementById("name").value;
  document.getElementById("panel").style.opacity = 0;
  document.getElementById("panel").classList.remove("show");
  document.getElementById("table").style.opacity = 1;
  document.getElementById("table").classList.add("show");
}

function pick(pos) {
  if (Math.floor(Date.now() / 1000) < cdtime) {
    alert("Nice try, the countdown isn't over yet");
    return;
  }
  fetch("/pick", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"name": selected, "pos": pos})}).then(async result => {
    let msg = (await result.json()).msg;
    if (msg == "You have successfully picked this duty!") {
      alert(msg, "Success");
    } else {
      alert(msg);
    }
  });
}

countdown();

function countdown() {
  let time = cdtime - Math.floor(Date.now() / 1000);
  if (time > 0) {
    document.getElementById("countdown").style.opacity = 1;
    document.getElementById("countdown-title").style.opacity = 1;

    let h = Math.floor(time % (3600*24) / 3600);
    let m = Math.floor(time % 3600 / 60);
    let s = Math.floor(time % 60);

    document.getElementById("hours").children[0].innerHTML = h;
    document.getElementById("minutes").children[0].innerHTML = m;
    document.getElementById("seconds").children[0].innerHTML = s;
    window.setTimeout(function() {
        countdown();
      }, 1000);
  } else {
    document.getElementById("countdown").classList.remove("show");
    document.getElementById("countdown-title").classList.remove("show");
    document.getElementById("countdown").style.opacity = 0;
    document.getElementById("countdown-title").style.opacity = 0;
    document.getElementById("panel").style.opacity = 1;
    document.getElementById("panel").classList.add("show");
  }
}
