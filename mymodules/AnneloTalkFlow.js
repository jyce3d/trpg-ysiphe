const Base = require("../mymodules/TalkFlow.js");

class AnneloTalkFlow extends TalkFlow {
    constructor () {
        this.talk="Bonjour, tu es nouveau ici?";
        this.choice[0] ="1 - Oui, c'est ma première année";
        this.go[0] = 1; // indique l'index vers lequel se diriger
        this.choice[1] ="2 - Non, pauvre gamine, je suis ici depuis des années.";
        this.go[1] = 2;

    }
    executeFlow(choice) {
        switch (choice) {
            case 1 : {
                this.talk="Penses à revoir ton cours de MATH.";
                this.choice = null;
                break;
            }
            case 2 : {
                break;
            }
        }
    }
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