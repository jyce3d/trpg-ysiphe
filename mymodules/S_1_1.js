const Base=require ("../mymodules/Base.js");
class S_1_1 extends Base {
	getName() {
		return "Grand Escalier";
	}
	getDirection() {
		return 25;
	}	
	display(curPerso, err) {
		super.displayHeader();
		console.log("Le grand escalier est en travaux suite aux bombardements.");
		console.log("L'oeuvre transpirant l'art nouveau du début XXsiècle conduit à l'étage.")
		console.log("La Sortie et le Laboratoire d'étude de matérieaux sont accessible au NORD.");
		console.log("La salle d'Exposition et le local Na3 sont accessibles au SUD.");
		super.displayFooter(curPerso);
		super.displayDirection();

		if (err !=null)
		console.log(err);

	}	
	 onProcess(curPlayer, or1, or2) {
		console.log(answer);
	}
	
};
module.exports= S_1_1;