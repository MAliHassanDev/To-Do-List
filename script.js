const taskList = document.getElementById('taskList');
const deletedTaskList = document.querySelector('[data-deletedTasks]');
const storage = window.localStorage;
let htmlElementData = [];
let deletedTaskData = [];
let taskNumber = 0;
let deleteTaskNum = 0;
// localStorage.clear();




function updatehtmlDataWithStorge(storageKey){
  if(storageKey === 'newTaskData'){
    htmlElementData = JSON.parse(storage[storageKey]);
  }else{
    deletedTaskData = JSON.parse(storage[storageKey]);
  }
}

function updateTaskNumberWithStorage(dataArrayLength,taskType){
  if(taskType === 'newTaskData'){
    taskNumber = dataArrayLength;
  }else{
    deleteTaskNum = dataArrayLength;
  }
  
  
}

function updateTaskListWithStorage(dataArrayLength,storageKey){
  if(storageKey === 'newTaskData'){
    for(let i=0;i<dataArrayLength;i++){
      addTaskToTheTaskList(i,storageKey);
    }
  }else{
    for(let i=0; i<dataArrayLength; i++){
      addTaskToTheTaskList(i,storageKey);
    }
  }
  
}


(function(){
  if(storage.length === 0) return;

  if(storage['deletedTask'] !== undefined){
    let dataArrayLength = JSON.parse(storage['deletedTask']).length;
    updatehtmlDataWithStorge('deletedTask');
    updateTaskNumberWithStorage(dataArrayLength,'deletedTask');
    updateTaskListWithStorage(dataArrayLength,'deletedTask');
  }


  let dataArrayLength = JSON.parse(storage['newTaskData']).length;
  updatehtmlDataWithStorge('newTaskData');
  updateTaskNumberWithStorage(dataArrayLength,'newTaskData');
  updateTaskListWithStorage(dataArrayLength,'newTaskData');

}());

function  canUseStorage(){
  try{
    const storage = window.localStorage;
    let x = '____Storage___Test____';
    storage.setItem(x,x);
    if(storage.getItem(x) === x) {
      storage.removeItem(x)
      return true;
    }
  }catch(e){
    return e.message;
  }
}


function currentDate(){
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}



function addUserinputTonewTask(task){
  task.textContent = taskInput.value;
  taskInput.value = '';
}

function parseStringintoHtmlElemrnt(taskOuterElement,taskType){
  if(taskOuterElement){
    let htmlString = taskOuterElement;
    const parser = new DOMParser();

    const doc = parser.parseFromString(htmlString,'text/html');
    let element = doc.querySelector(taskType);
    
    
    taskOuterElement = element;
    // console.log(element.getAttribute('taskNumber'))
    // console.log(taskOuterElement,element)
    // taskOuterElement.textContent = element.textContent;
  }

  return taskOuterElement;
}




function addTaskToTheTaskList(taskNumber,storageKey){
  const taskDate = document.querySelector('[data-currentDate]');
  const htmlElementsArray = JSON.parse(storage[storageKey]);
  const currentTaskhtmlElements = htmlElementsArray[taskNumber]
  let taskOuterElement = currentTaskhtmlElements[0];
  const taskinnerElements = currentTaskhtmlElements[1];
    
    if(storageKey === 'newTaskData'){
      taskOuterElement =  parseStringintoHtmlElemrnt(taskOuterElement,'.newTask');
      taskOuterElement.innerHTML += taskinnerElements;
      taskList.appendChild(taskOuterElement)

      taskOuterElement.addEventListener('mouseover',(e)=>{
        taskDate.innerHTML = taskOuterElement.getAttribute('data-date');
      });
      taskOuterElement.addEventListener('mouseleave',(e)=>{
        taskDate.innerHTML = '';
      })

    }else if(storageKey=== 'deletedTask'){
      taskOuterElement =  parseStringintoHtmlElemrnt(taskOuterElement,'.deletedTask');
      taskOuterElement.innerHTML += taskinnerElements;
      deletedTaskList.appendChild(taskOuterElement);
    }
  

}



function storeTaskToStorage(taskOuterElement,taskinnerElenents){
  htmlElementData.push([taskOuterElement,taskinnerElenents]);
  storage.setItem('newTaskData',JSON.stringify(htmlElementData))
  // console.log(JSON.parse(storage['newTaskData']))
  // console.log(htmlElementData)
}

function createElementsForTask(){
  const newTask = document.createElement('li');
  const completeCheck = document.createElement('span');
  const deleteTask = document.createElement('p');
  
  
  completeCheck.className = 'taskComplete';
  completeCheck.textContent = '';
  deleteTask.className = 'deleteTask';
  deleteTask.innerHTML = '🗑';
  newTask.className = 'newTask';
  newTask.setAttribute('data-date',currentDate());
  newTask.setAttribute('taskNumber', taskNumber);
  taskNumber++;
  
  newTask.appendChild(completeCheck);
  newTask.appendChild(deleteTask);
  
  return [newTask,newTask.innerHTML];
}






function createNewTask(){
  
  const newTask = createElementsForTask();
  addUserinputTonewTask(newTask[0]);
  // check for storage
  if(canUseStorage){
    storeTaskToStorage(newTask[0].outerHTML,newTask[1]);
  }
  // taskList.appendChild(newTask);
  
  return newTask[0].getAttribute('taskNumber')
}









function storeToDeletedTaskStorage(deletedTaskOuterHtml,deletedTaskInnerHtml){
  deletedTaskData.push([deletedTaskOuterHtml,deletedTaskInnerHtml]);
  storage.setItem('deletedTask', JSON.stringify(deletedTaskData));
}


function addTextToDeletedTask(task,taskText){
  task.textContent = taskText;
}

function createDeletedTask(taskNumber){
  const deletedTask = document.createElement('li');
  const restoreButton = document.createElement('p')
  const permanentDeleteButton = document.createElement('span')

  restoreButton.classList.add('restoreTask');
  permanentDeleteButton.className = 'permanentDeleteButton'
  deletedTask.setAttribute('data-taskNumber', taskNumber);
  deletedTask.setAttribute('data-deletedTaskNumber', deleteTaskNum);
  deletedTask.className = 'deletedTask'
  deleteTaskNum++;

  restoreButton.innerHTML = '&#9851'
  permanentDeleteButton.innerHTML = '&#128465'
  // deletedTaskList.appendChild(deletedTask)

  deletedTask.appendChild(restoreButton);
  deletedTask.appendChild(permanentDeleteButton)
  
  return[deletedTask,deletedTask.innerHTML];
}



function restoreDeletedTask(taskNumber,shouldRestore){
  const allDeletedTasks = document.querySelectorAll('.taskdeleted');

  allDeletedTasks.forEach(task => {
    if( task.getAttribute('deletedTaskNumber') === taskNumber){
      if(shouldRestore){
        task.classList.remove('taskdeleted'); 
      }else{
        taskList.removeChild(task)
      }
    }
  })
}


function updatehtmlElementsArray(task,taskNumber){
  htmlElementData[taskNumber].splice(0,1,task.outerHTML)

  storage.setItem('newTaskData',JSON.stringify(htmlElementData))

}

function markTaskComplete(targetTaskNumber){
  const allTasks = document.querySelectorAll('.newTask')

  allTasks.forEach(task => {
    if(task.getAttribute('taskNumber') === targetTaskNumber){
      task.classList.toggle('completed');
      updatehtmlElementsArray(task,targetTaskNumber);
    }

  })
}



const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');



let userInput = '';


addTaskButton.addEventListener('click', () =>{
  let taskText = taskInput.value;
  taskText = taskText.trim();
  if(taskText.length!=0){
    let taskNumber = createNewTask();
    addTaskToTheTaskList(taskNumber,'newTaskData');
  }
})

// check if user clicks on delte task button or complete task
taskList.addEventListener('click', function(event){
  const clickedElement = event.target;
  if(clickedElement.classList.contains('taskComplete')){
    let targetTaskNumber = clickedElement.parentElement.getAttribute('taskNumber');
    markTaskComplete(targetTaskNumber);

  }else if(clickedElement.classList.contains('deleteTask')){
    let currentdDeletedTask = clickedElement.parentElement; 
    let currentdelTaskNum = currentdDeletedTask.getAttribute('taskNumber');
    currentdDeletedTask.classList.add('taskdeleted');
    updatehtmlElementsArray(currentdDeletedTask,currentdelTaskNum);

    const deletedTask = createDeletedTask(currentdelTaskNum);
    addTextToDeletedTask(deletedTask[0],currentdDeletedTask.textContent.slice(0,-2))
    storeToDeletedTaskStorage(deletedTask[0].outerHTML,deletedTask[1]);

    const delTasknum = deletedTask[0].getAttribute('data-deletedTaskNumber')
    addTaskToTheTaskList(delTasknum,'deletedTask')
  }
})

// if user clicks to restore task
deletedTaskList.addEventListener('click', (e)=>{
  const clickedElement = e.target;
  elementClass = clickedElement.className;

  if(elementClass === 'restoreTask' || elementClass === 'permanentDeleteButton'){
    const taskNumber = clickedElement.parentElement.getAttribute('deletedTaskNumber');
    deletedTaskList.removeChild(clickedElement.parentElement);

    if(elementClass === 'restoreTask') {
      restoreDeletedTask(taskNumber,true);
    }else{
      restoreDeletedTask(taskNumber,false)
    }
  }
    
})


// show date when users hovers over tasks


document.addEventListener('click', (e)=>{
  e.preventDefault()
})