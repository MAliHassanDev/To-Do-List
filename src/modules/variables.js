const addTaskBtn = document.querySelector('[data-addTask]');
const taskInputfield = document.querySelector('[data-taskInput]');
const displayDate = document.querySelector('[data-currentDate]'); 
const addTaskBtnClass = 'addTask';
const recycleTaskBtnClass = 'moveTaskTORecycleBin';
const restoreTaskBtnClass = 'restoreTaskBtn';
const completeTaskBtnClass = 'taskCompleteCheckBox';
const deleteTaskBtnClass = 'deleteTaskBtn';
const taskCompleted = 'taskCompleted';
const activeTaskClass = 'activeTask';
const restorableTaskClass = 'restoreableTask'

export {addTaskBtn,taskInputfield,addTaskBtnClass,activeTaskClass,recycleTaskBtnClass,restoreTaskBtnClass,
completeTaskBtnClass,deleteTaskBtnClass,taskCompleted,restorableTaskClass,displayDate}