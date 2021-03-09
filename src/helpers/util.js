  
export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
};


export function textTruncate(str = "", maxLength){
    if(str.length > maxLength){

return `${str.slice(0, maxLength)} ...`;
}
return str
};
