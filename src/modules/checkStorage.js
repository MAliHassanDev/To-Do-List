export function checkStorage(){
  let storage = window.localStorage;
  try{
    let x = '___Storage___Test'
    storage.setItem(x,x);
    if(storage.getItem(x) === x){
      storage.removeItem(x)
      return true;
    }
  }catch(e){
    return e.message;
  }
}