module.exports = class Format{

    static removeDiacritics(str) {
        var strToString = JSON.stringify(str)
        var strToStringLower = strToString.toLowerCase()

        strToStringLower = strToStringLower.replace(/[àâ]/gi,"a");
        strToStringLower = strToStringLower.replace(/[ç]/gi,"c");
        strToStringLower = strToStringLower.replace(/[éèëê]/gi,"e");
        strToStringLower = strToStringLower.replace(/[ïî]/gi,"i");
        strToStringLower = strToStringLower.replace(/[ô]/gi,"o");
        strToStringLower = strToStringLower.replace(/[ùüû]/gi,"u");

        var strToObject = JSON.parse(strToStringLower)
        return strToObject;
    }

    static firstLetterUppercase(str){
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
}
