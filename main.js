import {checkStorage} from './src/modules/checkStorage.js';
import { createObjectForActiveTask ,changeTaskObjectToRecyle,addClassTOTaskObject} from './src/modules/createTaskObject.js';
import { currentDate } from './src/modules/generateCurrentDate.js';
import { manageStorage} from './src/modules/localStorageManager.js';
import { populateAllTaskSet,removeFromAllTaskSet } from './src/modules/updateAllTaskSet.js';
import { generateAndDisplayTasksUi } from './src/modules/generateAndDisplaytasks.js';
import { DOMmodifier} from './src/modules/changeDOM.js';
import { addTaskBtn,taskInputfield,addTaskBtnClass,deleteTaskBtnClass,recycleTaskBtnClass,
  activeTaskClass,restoreTaskBtnClass,completeTaskBtnClass,taskCompleted,restorableTaskClass,displayDate} from './src/modules/variables.js';





/*   Refer to variable module if the use of any variable in main seems confusing */


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
    allActiveTasks = document.querySelectorAll(`.${activeTaskClass}`);
    allRestoreableTasks = document.querySelectorAll(`.${restorableTaskClass}`)
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

      case addTaskBtnClass:
        handleNewTask();
        break;
      case recycleTaskBtnClass:
        modifyTaskStatus(parentElement);
        break;
      case completeTaskBtnClass:
        handleCompleteTask(parentElement);
        break;
      case restoreTaskBtnClass:
        modifyTaskStatus(parentElement);
        break;
      case deleteTaskBtnClass:
        handleDeleteTask(parentElement);
        break;
      default:
        console.log(`UnAssigned Clicked ELement: ${clickedElement}`);
    }
  }


  // when user creates a new task
  function handleNewTask(){
    let taskText = taskInputfield.value.trim();
    if(taskText.length <= 0) return;
    
    newTaskNumber++;

    const date = currentDate();

    let taskObject = createObjectForActiveTask(newTaskNumber,taskText,date,[activeTaskClass]);

    populateAllTaskSet(allTasksList,newTaskNumber);

    if(checkStorage()){
      manageStorage.setTaskObject(taskObject);
      manageStorage.setTaskList(allTasksList);
      manageStorage.setTaskNumber(newTaskNumber);
    }

    let newTask = generateAndDisplayTasksUi(taskObject);

    addEventListener(newTask);

    DOMmodifier.removeTextFromInputELement(taskInputfield);
    
  }

  //  when user changes the task status
  function modifyTaskStatus(task){
    let taskNumber = task.getAttribute('data-taskNumber');
    let taskDate = task.getAttribute('data-date');
    let taskText = task.textContent;
    let taskMainClasses = [];
    let modifiedObject;

    if(task.classList.contains(taskCompleted)) taskMainClasses.push(taskCompleted);

    DOMmodifier.removeElementFromDOM(task.parentElement,task);

    if(task.classList.contains(activeTaskClass)){
      taskMainClasses.push(restorableTaskClass)
      modifiedObject = changeTaskObjectToRecyle(taskNumber,taskText,taskDate,taskMainClasses);
    }else{
      taskMainClasses.push(activeTaskClass);
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
    addClassTOTaskObject(taskObject,taskCompleted);
    manageStorage.setTaskObject(taskObject);
    DOMmodifier.addClassToTaskElementDOM(task,taskCompleted);
  }

  // when user permanently deletes the task
  function handleDeleteTask(task){
    let objectKey = task.getAttribute('data-taskNumber');
    manageStorage.removeTaskObject(objectKey);
    removeFromAllTaskSet(allTasksList,objectKey);
    console.log(allTasksList)
    manageStorage.setTaskList(allTasksList);
    DOMmodifier.removeElementFromDOM(task.parentElement,task);
  }

  // display the task creation date on the taskSheet
  function displayTaskDate(task){
    if(task === addTaskBtn) return;

    let taskDate =  task.getAttribute('data-date');
    DOMmodifier.addContentToElement(displayDate,taskDate);
  }

  // hide the task when user is not hovering over the task
  function hideTaskDate(task){
    if(task === addTaskBtn) return;
    DOMmodifier.removeContentFromELement(displayDate);
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
  Main.addEventListener(addTaskBtn);
  Main.updateAllNodesList();
  Main.addEventListenerToallAvailableTasks();
})




