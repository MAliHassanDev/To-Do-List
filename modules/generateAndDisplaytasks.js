 export function generateAndDisplayTasksUi(taskObject){
  const mainElement = document.createElement('li');
  const firstSubELement = document.createElement('span');
  const secondSubElement = document.createElement('span');
  const parentContainer = document.querySelector(taskObject.parentClass);

  taskObject.mainClasses.forEach(mainClass => mainElement.classList.toggle(mainClass));

  firstSubELement.className = taskObject.firstChildClass;
  secondSubElement.className = taskObject.secondChildClass;
  mainElement.textContent = taskObject.inputText;
  mainElement.setAttribute('data-taskNumber',taskObject.number);
  mainElement.setAttribute('data-date',taskObject.date);

  mainElement.appendChild(firstSubELement);
  mainElement.appendChild(secondSubElement);
  
  
  parentContainer.appendChild(mainElement)
  
  return mainElement;
 }