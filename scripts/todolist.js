let arrayTask=JSON.parse(localStorage.getItem('tasks'))||[];
let reset=false;
let completedElement=JSON.parse(localStorage.getItem('completedtasks'))||[];
function addTask(){
  
  let taskElement=document.getElementById('input-task');
  let dateElementValue=document.getElementById('deadline').value;
  if(taskElement.value!=''){
    arrayTask.push({task:taskElement.value,date:dateElementValue});
    taskElement.value='';
    localStorage.setItem('tasks',JSON.stringify(arrayTask));
    displayTasks();
  }
  
  else{
    console.log("Task cannot be empty");
  }
  
}
function checkResetButton() {
  const outputBox = document.querySelector('.output-box');
  let section = document.querySelector('section');
  const resetButton = document.querySelector('.resetButton');
  if (!reset && outputBox.children.length > 0) {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.className = 'resetButton';
    resetButton.onclick = resetTasks;
    section.insertAdjacentElement('beforeend', resetButton);
    reset=true;
  }
  else if(reset&&outputBox.children.length==0){
    section.removeChild(resetButton); 
    reset = false;
  }
}

function resetTasks() {
  const outputBox = document.querySelector('.output-box');
 outputBox.innerHTML='';
 //or
/* const taskElements = document.querySelectorAll('.new-task-js'); 
 taskElements.forEach(task => {
    outputBox.removeChild(task);
 });
 */
arrayTask=[];
localStorage.setItem('tasks',JSON.stringify(arrayTask));
completedElement=[];
localStorage.setItem('completedtasks',JSON.stringify(completedElement));
  checkResetButton();
}


function displayTasks(){
  let outputBox=document.querySelector('.output-box');
  let HTMLDisplay='';
  for(let i=0;i<arrayTask.length;i++){
    let taskClass=(completedElement.includes(i))?'task-completed':'';
    let checkedAttribute=(completedElement.includes(i))?'checked':'';
    HTMLDisplay+=`
    <div class="new-task-js ${taskClass}">
    <input type="checkbox" id="completed" onchange="checkboxChanged(this,${i})" ${checkedAttribute}>
    <div class="output-task-js">${arrayTask[i].task}</div>
    <div class="output-date-js">${arrayTask[i].date}</div>
    </div>
    `;
  }
  outputBox.innerHTML=HTMLDisplay;
}


function checkboxChanged(element,elementnumber){
  let taskChecked=document.querySelectorAll('.new-task-js')[elementnumber];
  if(element.checked){
    taskChecked.classList.add('task-completed');
    completedElement.push(elementnumber);
  }
  else{
    taskChecked.classList.remove('task-completed');
    completedElement.pop(elementnumber);
  }
  localStorage.setItem('completedtasks',JSON.stringify(completedElement));
}

function enterAdd(event){
  if(event.key=='Enter')
  addTask();
}
