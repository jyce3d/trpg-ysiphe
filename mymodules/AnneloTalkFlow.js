const Base = require("../mymodules/TalkFlow.js");

class AnneloTalkFlow extends TalkFlow {
    var talk = new Array[3];
    talk[0] ="Bonjour, tu es nouveau ici?"
    choice[0][0] ="1 - Oui, c'est ma première année";
    choice[0][1] ="2 - Non ,pauvre gamine, je suis ici depuis des années";

    getCurrentTalk() {
        return talk[this.index];
    }   
    getCurrentChoices() {

    } 
    processAnswer(answer) {
        if (this.index == 0) {
            if (answer=="1") {
                this.index++;
                return 2;
            } else if (answer=="2") 
        }
        
    }
}