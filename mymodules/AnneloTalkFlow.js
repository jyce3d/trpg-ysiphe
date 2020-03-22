const TalkFlow = require("../mymodules/TalkFlow.js");


class AnneloTalkFlow extends TalkFlow {
    constructor (parent) {
        super();
        this.parent = parent;
        this.choice = new Array(10);
        this.go = new Array(10);
        this.talk="Bonjour, tu es nouveau ici?";
        this.choice[0] ="1 - Oui, c'est ma première année";
        this.go[0] = 1; // indique l'index choice vers lequel se diriger
        this.choice[1] ="2 - Non, pauvre gamine, je suis ici depuis des années.";
        this.go[1] = 2;
        this.visit = 0;
    }
    executeFlow(choice) {
        console.log(choice);
        switch (choice) {
            case "0" : {
                this.parent.status = TalkFlow.STOPPARLE();
                break;
            }
            case "1" : {
                if ( this.index == 1) {
                    this.talk="Penses à revoir ton cours de MATH.";
                    this.choice = null;
                    this.go = null;
                    this.parent.status = TalkFlow.PARLE(); 
                    break; 
                }
            }
            case "2" : {
                if (this.index == 2) {
                    this.talk="Tu ne me fais vraiment pas peur et si c'est ce que tu veux! En garde!";
                    this.choice =null;
                    this.go = null;
                    this.parent.status = TalkFlow.COMBAT();
                    break;
                }
            }
        }
    }
    getCurrentTalk() {
        return this.talk;
    }   
    getCurrentChoices() {
        var ret= "";
        if (this.choice !=null) {
            for (var i=0;i<this.choice.length;i++) {
                if (this.choice[i] == null) break;
                if (i==0) ret=this.choice[i];
                else ret=ret+"\n" + this.choice[i];
            }
        }
        if (ret=="")
         return "0 - Sortir";
        return ret;
    } 
    processAnswer(answer) {
        if (this.index == 0) 
        { 
            if (answer=="1") {
                this.index=1;
            } else if (answer=="2")  {
                this.index=2;
            } else {
            }
        }
        this.executeFlow(answer);
        
    }
}
module.exports = AnneloTalkFlow;