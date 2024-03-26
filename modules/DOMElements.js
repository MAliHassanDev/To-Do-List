const DOMElement = {
  addTaskBtn: document.querySelector('[data-addTask]'),
  taskInputfield: document.querySelector('[data-taskInput]'),
  displayDate: document.querySelector('[data-currentDate]'),
  recycleBinIcon: document.querySelector('[data-trashBinIcon]'),
  recyleConWrapper: document.querySelector('[data-recycleWrapper]'),
  addTaskBtnClass: 'addTask',
  recycleTaskBtnClass: 'moveTaskTORecycleBin',
  restoreTaskBtnClass: 'restoreTaskBtn',
  completeTaskBtnClass: 'taskCompleteCheckBox',
  deleteTaskBtnClass: 'deleteTaskBtn',
  taskCompleted: 'taskCompleted',
  activeTaskClass: 'activeTask',
  restorableTaskClass: 'restoreableTask',
  showRecycleBinClass: 'showRecycleBin',


  removeElementFromDOM(parentElement,childElement){
    if(parentElement === null || childElement === null) return;
    parentElement.removeChild(childElement)
  },

  removeTextFromInputELement(element){
    element.value = '';
  },
  
  addClassToTaskElementDOM(element,className){
    element.classList.toggle(className);
    console.log(element)
  },

  addContentToElement(element,content){
    element.textContent  = content;
  },

  removeContentFromELement(element){
    element.textContent = '';
  },

  toggleClass(element,className){
    console.log('clicked')
    element.classList.toggle(className);
  }
}

export{DOMElement};