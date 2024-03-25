const DOMmodifier = {

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
  }
}






export {DOMmodifier}
