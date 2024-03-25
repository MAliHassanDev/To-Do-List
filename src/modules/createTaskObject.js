class ActiveTask {
  constructor(number,inputText,date,mainClasses){
    this.number = number;
    this.inputText = inputText;
    this.date = date;
    this.parentClass = '[data-acticeTaskContainer]';
    this.mainClasses = mainClasses;
    this.firstChildClass = 'taskCompleteCheckBox';
    this.secondChildClass = 'moveTaskTORecycleBin';
  }
}

export function createObjectForActiveTask(number,inputText,date,mainClasses){
  let taskObject = new ActiveTask(number,inputText,date,mainClasses);
  return taskObject;
}


class RecycleTask {
  constructor(number,inputText,date,mainClasses){
    this.number = number;
    this.inputText = inputText;
    this.date = date;
    this.parentClass = '[data-recycleTaskContainer]';
    this.mainClasses =  mainClasses;
    this.firstChildClass = 'restoreTaskBtn';
    this.secondChildClass = 'deleteTaskBtn';
  }
}

export function changeTaskObjectToRecyle(number,inputText,date,mainClasses){
  let taskObject = new RecycleTask(number,inputText,date,mainClasses);
  return taskObject;
}

export function addClassTOTaskObject(object,className){
  object.mainClasses.push(className);
}