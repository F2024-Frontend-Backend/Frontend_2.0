export function VATType(tryVAT: string  ){
   const cleanVAT = tryVAT.replace(/\s+/g, '');
    const vatRegex = /^((1[0-9]{7}))$|^(((0|[2-9])[0-9]*)$)/
        if(vatRegex.test(cleanVAT)){
          const hit = cleanVAT.match(vatRegex);
          if(hit){
              if (hit[0].charAt(0) === "1") {
                return "DanishVAT";
              } else {
                return "Non-DanishVAT";
              }

          }
        }
        if(cleanVAT.charAt(0) == "1"){
          return "InvalidDanishVAT"
        }
        return "UnrecognizedVAT";
};

export function validateVAT(number: string) {
  const cleanNumber = number.replace(/\s+/g, '');
  const vatTest = VATType(cleanNumber);
  if (vatTest === "DanishVAT" || vatTest === "Non-DanishVAT") {
      return {isValid: true, message: `Valid VAT: ${vatTest}` };
  }else if(vatTest == "InvalidDanishVAT"){
    return {isValid: false, message: "Invalid Danish VAT. Danish VATs have 8 integers exactly."}
  }
  return {isValid: false, message: "Invalid VAT. Make sure only integers are present."}
}