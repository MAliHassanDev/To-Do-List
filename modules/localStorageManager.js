
const manageStorage = {
  storage: window.localStorage,
  taskList: 'allTaskSet',

  setTaskObject(taskObject){
    this.storage[taskObject.number] = JSON.stringify(taskObject);
  },

  getTaskObject(objectKey){
    return JSON.parse(this.storage[objectKey]);
  },

  removeTaskObject(objectKey){
    this.storage.removeItem(objectKey)
  },

  setTaskList(set){
    let arrayFromSet = Array.from(set);
    this.storage[this.taskList] = JSON.stringify(arrayFromSet);
  },

  getTaskList(){
    let storedArray = JSON.parse(this.storage[this.taskList]);
    let reconstructedSet = new Set(storedArray);
    return reconstructedSet;
  },

  setTaskNumber(number){
    this.storage['newTaskNumber'] = number;
  },

  getTaskNumber(){
    return this.storage['newTaskNumber']; 
  }

}

export {manageStorage};