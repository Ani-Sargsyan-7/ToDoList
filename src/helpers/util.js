  
export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
}


export function descripTruncate(str = ""){
    if(str.length < 50){
return str;
}

return `${str.slice(0, 50)} ...`;
}

export function titleTruncate(str = ""){
    if(str.length < 30){
return str;
}

return `${str.slice(0, 30)} ...`;
}