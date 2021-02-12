  
export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
}


export function descripTruncate(str = "", maxLength){
    if(str.length > maxLength){

return `${str.slice(0, maxLength)} ...`;
}
return str
}

// export function titleTruncate(str = ""){
//     if(str.length < 30){
// return str;
// }

// return `${str.slice(0, 30)} ...`;
// }