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
}
module.exports=Tools;