let listArray = [];
let counter = 0;
let currentTab = 'index';

// hämtar och rensar .allNotes
function addToDo() { 
  currentTab = 'index';
  uItem = document.querySelector('.allNotes');
  uItem.innerHTML = "";
  // sätter klasser på list-items som visar om dom är klara eller ej
  for (i = 0; i < listArray.length; i++) { 
      labelName = Object.keys(listArray[i])[0];
      addToDOM();

      if (listArray[i][labelName] == 'active') {
        label.classList = "labelactive";
        toggleActiveInactive.classList = "togglebuttonactive";
     } else {
        label.classList = "labelinactive";
        toggleActiveInactive.classList = "togglebuttoninactive";
     }
  }
  count();
  checkIfAnyCompleted();
  toggleFooter();
}

// visar "Active" tabben
function listActive() { 
  currentTab = 'active';
  uItem = document.querySelector('.allNotes');
  uItem.innerHTML = "";
  for (i = 0; i < listArray.length; i++) {
      labelName = Object.keys(listArray[i])[0];
      // Kollar om labelname är inactive, är den det, gör inget. Annars sätt klassen till labelactive och lägger till i listan.
      if (listArray[i][labelName] == 'inactive') { 
          continue;
      }
      addToDOM();
      label.classList = "labelactive";
      toggleActiveInactive.classList = "togglebuttonactive";
  }
  count();
  checkIfAnyCompleted()
}

// visar "Completed" tabben
function listCompleted() { 
  currentTab = 'inactive';
  uItem = document.querySelector('.allNotes');
  uItem.innerHTML = "";
  // kollar om labelname är active, är den det, gör inget. Annars sätt klassen till labelinactive och lägger till i listan.
  for (i = 0; i < listArray.length; i++) { 
      labelName = Object.keys(listArray[i])[0];
      if (listArray[i][labelName] == 'active') {
          continue;
      }
      addToDOM();
      label.classList = "labelinactive";
      toggleActiveInactive.classList = "togglebuttoninactive";
  }
  count();
  checkIfAnyCompleted();
  }

// Tar bort saker från arrayen
function remove() { 
  labelName = Object.keys(listArray[this.value])[0];
  listArray.splice(this.value, 1);
  showCorrectWindow();
}

function checkLabelName(){ 
  labelName = Object.keys(listArray[this.value])[0];
  let i = this.value;
  if (listArray[i][labelName] == 'inactive') {
    listArray[i][labelName] = 'active';
    this.parentElement.children[1].className = 'active';
    this.className = 'active';
  } else {
    listArray[i][labelName] = 'inactive';
    this.parentElement.children[1].className = 'labelinactive';
    this.className = 'togglebuttoninactive';
  }
  count();
  checkIfAnyCompleted();
  showCorrectWindow();
}

function showCorrectWindow() {
  switch(currentTab) {
    case 'active':
        listActive();
      break;
    case 'inactive':
        listCompleted();
      break;
    case 'index':
       addToDo();
      break;
  }
}

// Skapar todo
function addToDOM() { 
      todoValue = Object.keys(listArray[i]);
      listItem = document.createElement('li');
      listItem.setAttribute('id', 'listitem'+i);
      listDiv = document.createElement('div');
      input = document.createElement('input');
      checkBoxInput = document.createElement('input');
      label = document.createElement('label');
      button = document.createElement('button');
      toggleActiveInactive = document.createElement('button');
      toggleActiveInactive.value = i;
      toggleActiveInactive.setAttribute('todo', todoValue);
      toggleActiveInactive.addEventListener('click', checkLabelName);
      label.innerHTML = todoValue;
      icon = document.createElement('i');
      toggleActiveInactive.appendChild(icon);
      uItem.appendChild(listItem);
      listItem.appendChild(listDiv);
      listDiv.appendChild(toggleActiveInactive);
      listDiv.appendChild(label);
      button.value = i;
      button.classList = "destroy";
      button.innerHTML = '❌';
      button.addEventListener('click', remove);
      listDiv.appendChild(button);

      document.getElementById('amount').innerHTML = counter;
}

// Räknar hur många items det finns i arrayen och skriver ut

function count() { 
  counter = 0;
  for (i = 0; i < listArray.length; i++) {
    labelName = Object.keys(listArray[i])[0];
    if (listArray[i][labelName] == 'inactive') {
        continue;
    }
    counter++
  }
  if(counter === 1) {
    document.getElementById('amount').innerHTML = counter + " item left" ;
    }
    else {
      document.getElementById('amount').innerHTML = counter + " items left" ;
    }
}

//knappen(pilen) uppe till vänster markerar/avmarkerar
function completeAll() {
  var activeListItems = 0;

  for(i = 0; i<listArray.length; i++) {
    labelName = Object.keys(listArray[i])[0];
    if (listArray[i][labelName] == 'active') {
      activeListItems ++;
    }
  }

  if(activeListItems != 0) {
    for(i = 0; i<listArray.length; i++) {
      labelName = Object.keys(listArray[i])[0];
      listArray[i][labelName] = 'inactive';
    }
  } else {
    for(i = 0; i<listArray.length; i++) {
      labelName = Object.keys(listArray[i])[0];
      listArray[i][labelName] = 'active';
    }
  }
  showCorrectWindow();
}

//visar eller tar bort footern samt pilen i searchBaren
function toggleFooter() {
    const footer = document.getElementById('count');
    if (listArray.length > 0) {
        footer.classList.remove('hide');
    } else {
        footer.classList.add('hide');
    }
}

//knappen Clear completed nere till höger
function clearCompleted() {
  var newArray = [];
  for(i = 0; i < listArray.length; i++) {
    labelName = Object.keys(listArray[i])[0];
    if (listArray[i][labelName] == 'active') {
        newArray.push(listArray[i]);
    }
  }
  listArray = newArray;
  showCorrectWindow();
}

//kollar vilka todos som är avklarade
function checkIfAnyCompleted() {
  let completed = 0;
  for(i = 0; i < listArray.length; i++) {
    labelName = Object.keys(listArray[i])[0];
    if (listArray[i][labelName] == 'inactive') {
        completed ++
    }
  }

  let completeAllButton = document.getElementById('completeAll');
  let clearCompletedButton = document.getElementById('clearCompleted');
  //om vi inte har några todos i completed, göm knappen
  if (completed > 0) {
    clearCompletedButton.className = 'show';
  } else {
    clearCompletedButton.className = 'hide';
  }
  //om vi inte har några todos alls, göm knappen "Clear Completed"
  if(listArray.length > 0) {
    completeAllButton.className = 'show';
  } else {
    completeAllButton.className = 'hide';
  }
}

// Tar värdet av sökfältet om det inte är tomt och pushar in det i våran array som displayar todos
function init() {
  event.preventDefault();
  var input = document.getElementById("searchField");
  if (!input.value.trim().length) { 
      return;
  }
  let newArray = [];
  newArray[input.value] = 'active';
  listArray.push(newArray);
  input.value = "";
  addToDo(listArray);
}

// Sätter klass på tab-knapparna
function tabBorder() { 
  var findButtons = document.getElementById('tabs').children;
  var xdArray = [];

  for (i = 0; i < findButtons.length; i++) {
    findButtons[i].className = "tab_inactive"
    console.log(findButtons[i].className);
  }
  this.className = 'tab_active';
}

// Skapar våra eventlisterns och event när sidan laddas in 
  window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('amount').innerHTML = counter;
  let inputValue = document.getElementById("searchField");
  inputValue.addEventListener("submit", init);
  let allButton = document.getElementById("all");
  allButton.addEventListener("click", addToDo);
  let activeButton = document.getElementById("active");
  activeButton.addEventListener("click", listActive);
  let completedButton = document.getElementById("completed");
  completedButton.addEventListener("click", listCompleted);
  let clearCompletedButton = document.getElementById('clearCompleted');
  clearCompletedButton.addEventListener("click", clearCompleted);

  document.getElementById('all').addEventListener("click", tabBorder)
  document.getElementById('active').addEventListener("click", tabBorder)
  document.getElementById('completed').addEventListener("click", tabBorder)
});
