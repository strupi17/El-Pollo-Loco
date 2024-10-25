let levelArray = [];
let startLevelArray = [
  {
    level: "1",
    passed: true,
    selection: true,
  },
  {
    level: "2",
    passed: true,
    selection: false,
  },
  {
    level: "3",
    passed: false,
    selection: false,
  },
];

function selectionLevel() {
  let startScreen = document.getElementById("startScreen");
  startScreen.innerHTML = "";
  startScreen.innerHTML = /* html */ `
    <button id="levelButton0" onclick="editSelectionLevel(0)">Level 1</button>
    <button id="levelButton1" onclick="editSelectionLevel(1)">Level 2</button>
    <button id="levelButton2" onclick="editSelectionLevel(2)">Level 3</button>
  `;
  loadLevelFromLocalStorage();
  editLevelButton();
}

function editLevelButton() {
  for (let i = 0; i < levelArray.length; i++) {
    if (levelArray[i]["passed"] == false) {
      document.getElementById("levelButton" + i).disabled = true;
    }
  }
}

function loadLevelFromLocalStorage() {
  let ArrayToStrin = localStorage.getItem("levelKey");
  levelArray = JSON.parse(ArrayToStrin);
  if (levelArray == null) {
    //wird geschrieben wenn noch kein Array vorhanden ist
    levelArray = startLevelArray;
    saveLevelArrayOnLocalStorage();
  }
}

function saveLevelArrayOnLocalStorage() {
  let ArrayToStrin = JSON.stringify(levelArray);
  localStorage.setItem("levelKey", ArrayToStrin);
}

function editSelectionLevel(level) {
  for (let i = 0; i < levelArray.length; i++) {
    if (levelArray[i]["selection"]) {
      levelArray[i]["selection"] = false;
    }
  }
  levelArray[level]["selection"] = true;
  saveLevelArrayOnLocalStorage();
  backStartScreen();
}

function backStartScreen() {
  let startScreen = document.getElementById("startScreen");
  startScreen.innerHTML = "";
  startScreen.innerHTML = /* html */ `
    <button onclick="selectionLevel()">Level</button>
    <button onclick="startGame()">Start</button>
  `;
}
