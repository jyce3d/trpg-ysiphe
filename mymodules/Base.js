/* Classe de base pour les cellules du jeu */
/* parser basique pour les commandes */
/* 2019 */
'use strict';
const perso = require("../mymodules/Perso.js");
const tools = require("../mymodules/tools.js");
const Tresor = require("../mymodules/Tresor.js");


class Base {
	constructor (timeRef) {
		this.timeRef = timeRef;
		this.tresorList = new Array();
	}

	isRecognizedVerb(sa) {
		if (sa=="va" || sa=="go" || sa=="aller" || sa=="lire") return true;
	}
	parseAnswer(answer) {
		return tools.parse(answer);
	}
	displayHeader() {
		console.clear();
		var sName = this.getName();
		console.log(sName);
		var sH = "";
		for (var i=1;i<=sName.length;i++)
			sH=sH + "-";
		console.log(sH);	
	}
	displayFooter(curPerso) {
		var sH="";
		for (var i=1;i<=79;i++)
			sH=sH+"-";
		sH=sH + "\nMENTAL :" + curPerso.getMental() + " FORCE:"+ curPerso.getPhysic()+ " PLAIE(s):" + curPerso.getPlaie() + " CONTUSION:"+curPerso.getContus()+ "\n"; 
		for (var i=1;i<=79;i++)
			sH=sH+"-";
		console.log(sH);	

		if (this.tresorList.length>0) {
			console.log("Je VOIS:");
			sH="";
			for (var i=0;i<this.tresorList.length; i++) {
					if (i!=0) sH=sH+" ,";
					sH=sH+this.tresorList[i].name;
			}
			console.log(sH);
		}

	}
	getDirection() {

	}
	displayDirection() {
		var d=this.getDirection();
		var ret="";
		if ((d & 1) ==1) 
			ret= ret +" NORD " ;
		if ((d &  2)==2)
			ret = ret +" OUEST ";
		if ((d & 4)==4)
			ret = ret +" EST ";
		if ( (d & 8) == 8)
			ret  = ret +" SUD ";
		if ( (d & 16) ==16)
			ret = ret +" HAUT ";
		if ( (d & 32) ==32)
			ret =ret +" BAS ";
		console.log("Direction(s) possible(s):" + ret)
	}

	answerDirection() {

		return 1;
	}
	isDirection(sa) {
		if (sa == "nord" || sa =="n" || sa=="sud" || sa=="s" || sa=="ouest" || sa=="o" || sa=="est" || sa=="e" 
		|| sa=="haut" || sa=="h" || sa=="bas" || sa=="b") return true;
		return false;
	}
	processDirection(curPerso, sa,d) {
		if ((sa=="ouest" ) || sa=="o" ) {
			if ( ((d & 2)==2) && (curPerso.X<3)) 
				curPerso.X=curPerso.X+1;	

			
			else err= "Direction impossible";
			return err;
		}
		return "";
	}
	onProcess(curPlayer, or1, or2) {

	}
	process(curPlayer, answer) {
		var err="";
		var sa=this.parseAnswer(answer);
		if (sa == null) {
			err = "Je ne comprends pas!";
			return err;
		}
		var ret;
		var d=this.getDirection();
		if (this.isDirection(sa[0]))
			return this.processDirection(curPlayer, sa[0],d, err);
		if (sa[0] == "aller" || sa[0]=="va" || sa[0]=="go") {
			if (this.isDirection(sa[1]))
				return this.processDirection(curPlayer, sa[1],d, err);
 
		} else if (sa[0] == "inventaire" || sa[0]== "inv") {
			err ="Vous transportez:\n";
			for (var i=0; i<curPlayer.tresorList.length;i++) {
				if (i!=0) err = err+", ";
				err = err+curPlayer.tresorList[i].name;
			}
			return err;
		} else if (sa[0] == "prendre") {
			for (var i=0;i<this.tresorList.length;i++) {
				if (sa[1].toUpperCase() == this.tresorList[i].name) {
					err = "J'ai pris " + sa[1].toUpperCase(); 
					Tresor.pickup(sa[1].toUpperCase(), curPlayer, this);
					return err;
				}
			}
			err = "Object Inconnu!" + sa[1].toUpperCase();
			return err;
		}


		return this.onProcess(curPlayer, sa[0], sa[1]);
	}
}
module.exports = Base;