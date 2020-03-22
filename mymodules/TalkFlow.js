/***
    Process Talk flow
***/

'use strict';

class TalkFlow {
    static COMBAT() {return 1;}
	static PARLE() {return 2;}
    static STOPPARLE() {return 4;}
    
    constructor() {
        this.index=0;
    }
    getCurrentTalk() {

    }   
    getCurrentChoices() {

    } 
    processAnswer(answer) {
        
    }
}

module.exports = TalkFlow;