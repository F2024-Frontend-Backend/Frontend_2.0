export function validateName(name: string){
    const cleanString = name.replace(/\s+/g, '');
    const validation = /^[A-Za-z -.]+' '*[A-Za-z -.]+$/
    if(validation.test(cleanString)){
        const hit = cleanString.match(validation);
        if(hit){
            return {isValid: true, message: "Valid"}
        }
      }
      else{
        return {isValid: false, message: "Unsupported name."}
      }
};

export function validateAddress(address: string){
    const cleanString = address.replace(/\s+/g, '');
    const validation = /^([A-Za-z0-9.-]' '?)*$/
    if(validation.test(cleanString)){
        const hit = cleanString.match(validation);
        if(hit){
            return {isValid: true, message: "Valid"}
        }
    }
    else{return {isValid: false, message: "Unsupported address."}}
};
