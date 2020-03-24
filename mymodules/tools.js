'use strict';
class Tools {
     static getTime(timeRef) {
	    var cur =8+ (Date.now() - timeRef)/10000
	    var day = Math.floor(cur / 24);
	    var h = cur % 24
	    return "jour="+day+" - "+ h;
    }
     static getHour(timeRef) {
	    var cur =8+ (Date.now() - timeRef)/10000
	    var day = Math.floor(cur / 24);
	    var h = cur % 24
	    return h;
	}
	static parse(answer) {
		var sa_Answer=answer.split(" ");
		if (sa_Answer.length>2) 
			return null;

        var saRet = new Array(2);
		saRet[0]= sa_Answer[0].toLowerCase();
		if (sa_Answer.length==2)
			saRet[1]= sa_Answer[1].toLowerCase();
		else saRet[1] =null;
		return saRet;
	}
}
module.exports=Tools;