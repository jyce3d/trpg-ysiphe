
//import { Base } from "mymodules/Base.mjs";
const S_1_0 = require("./mymodules/S_1_0.js");
const S_1_1 = require("./mymodules/S_1_1.js");
const tools = require("./mymodules/tools.js");
const Perso = require("./mymodules/Perso.js");
const AnneloTalkFlow = require("./mymodules/AnneloTalkFlow.js");
var rl = require('stdio');
var log = console.log;
//var status= null; // indique les status de la fonction récursive
				/* COMBAT => mode combat */
				/* PARLE => fait parler les personage */
				// STOPPARLE => le perso ne veut plus parler.
				/* null => mode normale */

/*
 +----+----+----+
 |1	  |  2 |3	|
 +----+----+----+
 |4	  |  5 |6	|
 +----+----+----+
 |7	  |  8 |9	|
 +----+----+----+
  1 - Résistance des matériaux
  2 - Exit 2 (WC)
  3 - Labo- Electricité
  4 - Hall d'entrée
  5 - Escalier
  6 - Salle d'exam & DOJO
  7 - Auditoire Na
  8 - Salle  d'expo
  9 - Aud Phys
Etage 1
	1 - Salle DAO
	2 - Statistique
	3 - Aud Electronique
	4 - Infirmerie
	5 - Escalier
	6 - Chimie
	7 - Salle info
	8 - Aud Mathématique/Electricité
	9 - Aud Mecanique/Chimie
 */
/* Directon */
/* iDir = 0 => bloqué
		=1 => N
		=2 => O
		=4 => E
		=8 => S
		=16 => Haut
		=32 => BAS
*/
/*var arrRoom = [ ["Salle info","Dojo Kun", "Salle d'électro"],
	["S_0_1", "Escalier", "Salle d'examen"],
	["Bibliothèque", "Salle d'exposition", "Salle de Physique"]
];*/
var curRoom=null;

var arrRoom_0 = new Array(3);
for (var i=0;i<3;i++) 
	arrRoom_0[i] = new Array(3);

var arrRoom_1 = new Array(3);
for (var i=0;i<3;i++) 
	arrRoom_1[i] = new Array(3);

var curPerso = new Perso(0,1,0,"plone","", 5, 4, 0, 0);
var rosaly = new Perso(0,2,0,"Rosaly","", 4,5,0,0);
var annelo = new Perso(0,1,0,"Anne Laure", "Une jeune fille aux longs cheveux noirs de taille moyenne vous observe avec un regard interrogatif, légèrement narquois.", 5,2,0,0); 
annelo.talkFlow = new AnneloTalkFlow(annelo); 

// gestion des combats
var oponent = annelo;
var tourCourant = null;
///////
var timeRef = Date.now();
arrRoom_0[1][0] = new S_1_0(timeRef);
arrRoom_0[1][1] = new S_1_1(timeRef);


var recursiveAsyncReadLine = function (err) {
 // console.log('\033[2J');
 var att =0;
 var def=0;
 if (curPerso.Z==0)
 curRoom=arrRoom_0[curPerso.Y][curPerso.X];
else
curRoom=arrRoom_1[curPerso.Y][curPerso.X];

curRoom.display(curPerso, err); // affiche description, directions possibles
console.log("Temps: " + tools.getTime(timeRef));
  if (oponent == null ) {


	} else {
		if (oponent.status == Perso.COMBAT() ) {
		//curPerso.X=6;
		//curPerso.Y=1;
			console.log("MODE COMBAT");
			console.log("===========");
			if (tourCourant ==null) 
				if (oponent.getMental() > curPerso.getMental()) {
					tourCourant = oponent;
				} else if (oponent.getMental() < curPerso.getMental() ){
					tourCourant = curPerso;
				} else if (oponent.getMental() == curPerso.getMental() ) {
					var op=oponent.tossDiceMental();
					var cur=curPerso.tossDiceMental();
					while (op==cur) {
						op=oponent.tossDiceMental();
						cur=curPerso.tossDiceMental();
					}
					if (op>cur) 
				 		tourCourant = oponent;
					else tourCourant = curPerso;
			}
			// tourCourant est défini
		

				
			if (tourCourant==curPerso) {
				console.log("Vous attaquez : " +oponent.name)
				att=curPerso._actionPhysic();
				console.log("Vous lancez votre attaque:" + att );
				def=oponent._actionPhysic();
				console.log("Votre adversaire esquive à " + def);
				if (att>def) {
					oponent.plaie= oponent.plaie + Math.floor(att-def);
					console.log("Vous infligé " + Math.floor(att-def)+ "à votre adversaire");
				} else 
					console.log("Votre adversaire esquive votre attaque");
				if (oponent.plaie>oponent.physic) {
					console.log("Votre adversaire ne se relève pas et est bon pour l'infirmerie");
					oponent=null;
				}
				tourCourant=oponent;
	//					sortie=curPerso.attackPhysic(1, oponent);
			} else {
				// Tour d'attaque de l'adversaire
				console.log(oponent.name + " vous attaque");
				att=oponent._actionPhysic();
				console.log("Votre adversaire attaque:" + att );
				def=curPerso._actionPhysic();
				console.log("Vous esquivez à " + def);
				if (att>def) {
					curPerso.plaie= curPerso.plaie + Math.floor(att-def);
					console.log("Il vous a infligé " + Math.floor(att-def) );
				}
				else console.log("Vous esquivez!");
				if (curPerso.plaie>curPerso.physic) {
					console.log("Vous ne vous relevez pas et êtes bon pour l'infirmerie");
					curPerso.X=6;
					curPerso.Y=1;
					oponent=null;
				//	status =null;
				}
				tourCourant=curPerso;
			//			sortie=oponent.attackPhysic(0, curPerso);
			}	
 
		} else if (oponent.status == Perso.PARLE() ) {
			console.log(oponent.talkFlow.getCurrentTalk());
			console.log(oponent.talkFlow.getCurrentChoices());

		} else if (oponent.status == null) {
				console.log(oponent.name + " vous observe. Que voulez-vous faire? (PARLER ou ATTAQUER)");
		} else if (oponent.status == Perso.STOPPARLE()) {
			console.log(oponent.name + " vous dit qu'il(elle) est occupé(e).");
		}	
	

				
	}
	rl.question('Command: ', function (err, answer) {
		var err="";
		if (answer == 'exit' || answer== 'q' || answer=='quit') //we need some base case, for recursion
		  return 1; //Exit the program
		if (oponent !=null ) {
			if (oponent.status==Perso.PARLE()) {
				oponent.talkFlow.processAnswer(answer);
			}	else if (oponent.status==null) {
				if (answer == "parler" || answer== "parle" ) {
						oponent.status = Perso.PARLE();
				}	
			}
			else if(answer=="attaquer" || answer =="attaque")
				oponent.status = Perso.COMBAT();
			else
				err=curRoom.process(curPerso, answer);		 
		} else // personne dans la pièce mis à part vous
			 err=curRoom.process(curPerso, answer);


	 //   log('Got it! Your answer was: "', answer, '"');
		 recursiveAsyncReadLine(err); //Calling this function again to ask new question, only if answered
		  
		});
			

};

recursiveAsyncReadLine(null);


