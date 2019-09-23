const Base = require("../mymodules/Base.js");
const tools = require("../mymodules/tools.js");
class S_1_0 extends Base {
	getDirection() {
		var h=tools.getTime(this.timeRef);
		if (h>=12 || h<=14)
		 return 6;
		else
		return 2;
	}
	getName() {
		return "Hall d'entrée";
	}
	
	display(curPlayer, err) {
		super.displayHeader();
		console.log("Vous être dans le hall d'entrée principal. Une lourde porte porte blindée style XIXs se trouve derrière vous.");
		console.log("Son aspect froid et massif contrôle l'accès en ces temps troublés d'un bâtiment tout aussi froid et massif.");
		console.log("Sur le mur se trouve le panneau des VALVES générales, leurs informations peuvent se révéler précieuses.");
		var h=tools.getTime(this.timeRef);
		if (h>=12 || h<=14)
			console.log("La porte blindée est ouverte.");
		else
			console.log("La porte blindée est totalement fermée.");
		super.displayFooter(curPlayer);
		super.displayDirection();

		if (err !=null)
		console.log(err);
	}
	onProcess(curPlayer, or1, or2) {
		if ((or1=="lire") && (or2=="valves")) {
			var sRet ="========================================";
			sRet=sRet+"\nCommunication du ministre de l'intérieur";
			sRet=sRet+"\nIl nous faudra désormais composer avec des actions terroristes";
			sRet=sRet+"\nde plus en plus violentes";
			sRet=sRet+"\n========================================";
			return sRet;
		}
	}
	
};
module.exports = S_1_0;