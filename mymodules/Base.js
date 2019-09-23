/* Classe de base pour les cellules du jeu */
/* parser basique pour les commandes */
/* 2019 */
'use strict';
const perso = require("../mymodules/Perso.js");

class Base {
	constructor (timeRef) {
		this.timeRef = timeRef;
	}

	isRecognizedVerb(sa) {
		if (sa=="va" || sa=="go" || sa=="aller" || sa=="lire") return true;
	}
	parseAnswer(answer) {
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

			
			else return "Direction impossible";
		}
	}
	onProcess(curPlayer, or1, or2) {

	}
	process(curPlayer, answer) {

		var sa=this.parseAnswer(answer);
		if (sa == null)
			return "Je ne comprends pas!";
		var ret;
		var d=this.getDirection();
		if (this.isDirection(sa[0]))
			return this.processDirection(curPlayer, sa[0],d);
		if (sa[0] == "aller" || sa[0]=="va" || sa[0]=="go") {
			if (this.isDirection(sa[1]))
				return this.processDirection(curPlayer, sa[1],d);

		}
		return this.onProcess(curPlayer, sa[0], sa[1]);
	}
}
module.exports = Base;