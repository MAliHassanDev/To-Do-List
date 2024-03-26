import {checkStorage} from './modules/checkStorage.js';
import { createObjectForActiveTask ,changeTaskObjectToRecyle,addClassTOTaskObject} from './modules/createTaskObject.js';
import { currentDate } from './modules/generateCurrentDate.js';
import { manageStorage} from './modules/localStorageManager.js';
import { populateAllTaskSet,removeFromAllTaskSet } from './modules/updateAllTaskSet.js';
import { generateAndDisplayTasksUi } from './modules/generateAndDisplaytasks.js';
import { DOMElement} from './modules/DOMElements.js';





/*   Refer to DOMElements if the use of any variable name in main seems confusing */


const Main = (function(){
  let allTasksList = new Set();
  let newTaskNumber = 0;
  let allActiveTasks;
  let allRestoreableTasks;


  // display all the previous stored tasks in local storage
  function renderTasksFromStorage(){
    if( manageStorage.storage.length <= 0 || manageStorage.getTaskList().size <= 0) return;

    allTasksList.forEach(taskNumber =>{
      let taskObject = manageStorage.getTaskObject(taskNumber);
  
      generateAndDisplayTasksUi(taskObject);
    })
  }

  // update the taskList and taskNumber with local storage
  function updateTaskListFromStorage(){
    if( manageStorage.storage.length <= 0 || manageStorage.getTaskList().size <= 0) return;
  
    allTasksList =  manageStorage.getTaskList();
    manageStorage.setTaskList(allTasksList);
    newTaskNumber = manageStorage.getTaskNumber();
  }


  // update all the nodes list to all include the newly added html elements
  function updateAllNodesList(){
    allActiveTasks = document.querySelectorAll(`.${DOMElement.activeTaskClass}`);
    allRestoreableTasks = document.querySelectorAll(`.${DOMElement.restorableTaskClass}`)
  }

  function addEventListenerToallAvailableTasks(){
    allActiveTasks.forEach(task => addEventListener(task))
    allRestoreableTasks.forEach(task => addEventListener(task))
  }



  // addEventListeners to all action buttons 
  function addEventListener(task){
    task.addEventListener('click', (e)=> assignFunctionBasedOnClickedElement(e.target));
    task.addEventListener('mouseenter', (e)=> displayTaskDate(task));
    task.addEventListener('mouseleave', (e)=> hideTaskDate(task));
  }


  function assignFunctionBasedOnClickedElement(clickedElement){

    let elementClass = clickedElement.className;
    let parentElement = clickedElement.parentElement;

    switch(elementClass){

      case DOMElement.addTaskBtnClass:
        handleNewTask();
        break;
      case DOMElement.recycleTaskBtnClass:
        modifyTaskStatus(parentElement);
        break;
      case DOMElement.completeTaskBtnClass:
        handleCompleteTask(parentElement);
        break;
      case DOMElement.restoreTaskBtnClass:
        modifyTaskStatus(parentElement);
        break;
      case DOMElement.deleteTaskBtnClass:
        handleDeleteTask(parentElement);
        break;
      default:
        console.log(`UnAssigned Clicked ELement: ${clickedElement}`);
    }
  }


  // when user creates a new task
  function handleNewTask(){
    let taskText = DOMElement.taskInputfield.value.trim();
    if(taskText.length <= 0) return;
    
    newTaskNumber++;

    const date = currentDate();

    let taskObject = createObjectForActiveTask(newTaskNumber,taskText,date,[DOMElement.activeTaskClass]);

    populateAllTaskSet(allTasksList,newTaskNumber);

    if(checkStorage()){
      manageStorage.setTaskObject(taskObject);
      manageStorage.setTaskList(allTasksList);
      manageStorage.setTaskNumber(newTaskNumber);
    }

    let newTask = generateAndDisplayTasksUi(taskObject);

    addEventListener(newTask);

    DOMElement.removeTextFromInputELement(DOMElement.taskInputfield);
    
  }

  //  when user changes the task status
  function modifyTaskStatus(task){
    let taskNumber = task.getAttribute('data-taskNumber');
    let taskDate = task.getAttribute('data-date');
    let taskText = task.textContent;
    let taskMainClasses = [];
    let modifiedObject;

    if(task.classList.contains(DOMElement.taskCompleted)) taskMainClasses.push(DOMElement.taskCompleted);

    DOMElement.removeElementFromDOM(task.parentElement,task);

    if(task.classList.contains(DOMElement.activeTaskClass)){
      taskMainClasses.push(DOMElement.restorableTaskClass)
      modifiedObject = changeTaskObjectToRecyle(taskNumber,taskText,taskDate,taskMainClasses);
    }else{
      taskMainClasses.push(DOMElement.activeTaskClass);
      modifiedObject = createObjectForActiveTask(taskNumber,taskText,taskDate,taskMainClasses);
    }

    manageStorage.setTaskObject(modifiedObject);
    let modifiedTask = generateAndDisplayTasksUi(modifiedObject);

    addEventListener(modifiedTask);
  }

  // when user markes the task as complete
  function handleCompleteTask(task){
    let taskNumber = task.getAttribute('data-taskNumber');
    let taskObject = manageStorage.getTaskObject(taskNumber)
    addClassTOTaskObject(taskObject,DOMElement.taskCompleted);
    manageStorage.setTaskObject(taskObject);
    DOMElement.addClassToTaskElementDOM(task,DOMElement.taskCompleted);
  }

  // when user permanently deletes the task
  function handleDeleteTask(task){
    let objectKey = task.getAttribute('data-taskNumber');
    manageStorage.removeTaskObject(objectKey);
    removeFromAllTaskSet(allTasksList,objectKey);
    console.log(allTasksList)
    manageStorage.setTaskList(allTasksList);
    DOMElement.removeElementFromDOM(task.parentElement,task);
  }

  // display the task creation date on the taskSheet
  function displayTaskDate(task){
    if(task === DOMElement.addTaskBtn) return;

    let taskDate =  task.getAttribute('data-date');
    DOMElement.addContentToElement(DOMElement.displayDate,taskDate);
  }

  // hide the task when user is not hovering over the task
  function hideTaskDate(task){
    if(task === DOMElement.addTaskBtn) return;
    DOMElement.removeContentFromELement(DOMElement.displayDate);
  }




  return {
    addEventListener,
    renderTasksFromStorage,
    updateTaskListFromStorage,
    updateAllNodesList,
    addEventListenerToallAvailableTasks,
  }

}());

document.addEventListener('DOMContentLoaded',(e)=>{
  Main.updateTaskListFromStorage();
  Main.renderTasksFromStorage();
  Main.addEventListener(DOMElement.addTaskBtn);
  Main.updateAllNodesList();
  Main.addEventListenerToallAvailableTasks();
})




DOMElement.recycleBinIcon.addEventListener('click', (e)=>{
  
  DOMElement.recyleConWrapper.classList.toggle('showRecycleBin')
  console.log('click')
})