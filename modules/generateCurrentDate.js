 export function currentDate(){
  const date = new Date();
  const fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return fullDate;
}