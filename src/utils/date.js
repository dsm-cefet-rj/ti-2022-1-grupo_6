export const formatDate = (date) => {
    const dateFormated = new Date(date);
  
    const day =
      dateFormated.getDate() < 10
        ? `0${dateFormated.getDate()}`
        : dateFormated.getDate();
    const month =
      dateFormated.getMonth() + 1 < 10
        ? `0${dateFormated.getMonth() + 1}`
        : dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    const dateString = `${year}-${month}-${day}`;
  
    const finalDate = `${dateString}`;
    return finalDate;
  };
  
  export const formatTime = (date) => {
    const dateFormated = new Date(date);
    const hours =
      dateFormated.getHours() < 10
        ? `0${dateFormated.getHours()}`
        : dateFormated.getHours();
    const minutes =
      dateFormated.getMinutes() < 10
        ? `0${dateFormated.getMinutes()}`
        : dateFormated.getMinutes();
    const timeString = `${hours}:${minutes}`;
  
    const finalTime = `${timeString}`;
    return finalTime;
  };
  
  export const formatDateAndTime = (date) => {
    const dateFormated = new Date(date);
  
    const day =
      dateFormated.getDate() < 10
        ? `0${dateFormated.getDate()}`
        : dateFormated.getDate();
    const month =
      dateFormated.getMonth() + 1 < 10
        ? `0${dateFormated.getMonth() + 1}`
        : dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    const dateString = `${day}/${month}/${year}`;
  
    const hours =
      dateFormated.getHours() < 10
        ? `0${dateFormated.getHours()}`
        : dateFormated.getHours();
    const minutes =
      dateFormated.getMinutes() < 10
        ? `0${dateFormated.getMinutes()}`
        : dateFormated.getMinutes();
    const timeString = `${hours}h${minutes}`;
  
    const finalDate = `${dateString} às ${timeString}`;
    return finalDate;
  };
  
  export const formatOnlyDate = (date) => {
    const dateFormated = new Date(date);
  
    const day =
      dateFormated.getDate() < 10
        ? `0${dateFormated.getDate()}`
        : dateFormated.getDate();
    const month =
      dateFormated.getMonth() + 1 < 10
        ? `0${dateFormated.getMonth() + 1}`
        : dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    const dateString = `${day}/${month}/${year}`;
  
    const finalDate = `${dateString}`;
    return finalDate;
  };
  