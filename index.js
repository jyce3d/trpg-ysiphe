
//import { Base } from "mymodules/Base.mjs";
const S_1_0 = require("./mymodules/S_1_0.js");
const S_1_1 = require("./mymodules/S_1_1.js");
const tools = require("./mymodules/tools.js");
const Perso = require("./mymodules/Perso.js");

var rl = require('stdio');
var log = console.log;

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


var arrRoom_0 = new Array(3);
for (var i=0;i<3;i++) 
	arrRoom_0[i] = new Array(3);

var arrRoom_1 = new Array(3);
for (var i=0;i<3;i++) 
	arrRoom_1[i] = new Array(3);

var curPerso = new Perso(0,1,0,"plone","", 5, 4, 0, 0);
var rosaly = new Perso(0,2,0,"Rosaly","", 4,5,0,0);
var annelo = new Perso(0,1,0,"Anne Laure", "Une jeune fille aux longs cheveux noirs de taille moyenne vous observe avec un regard interrogatif, légèrement narquois.", 5,2,0,0); 
// gestion des combats
var oponent = null;
var tourCourant = null;
///////
var timeRef = Date.now();
arrRoom_0[1][0] = new S_1_0(timeRef);
arrRoom_0[1][1] = new S_1_1(timeRef);


var recursiveAsyncReadLine = function (err) {
 // console.log('\033[2J');
  if (oponent == null ) {
  var curRoom;
	if (curPerso.Z==0)
		 curRoom=arrRoom_0[curPerso.Y][curPerso.X];
	else
		curRoom=arrRoom_0[curPerso.Y][curPerso.X];
	curRoom.display(curPerso, err);
	 console.log("Temps: " + tools.getTime(timeRef));

  rl.question('Command: ', function (err, answer) {
    if (answer == 'exit' || answer== 'q' || answer=='quit') //we need some base case, for recursion
	  return 1; //Exit the program
	var err;
		 err=curRoom.process(curPerso, answer);
 //   log('Got it! Your answer was: "', answer, '"');
	recursiveAsyncReadLine(err); //Calling this function again to ask new question, only if answered
  
	  });
	} else {
		curPerso.X=6;
		curPerso.Y=1;
		console.log("MODE COMBAT");
		console.log("===========");
		if (tourCourant ==null)
			if (oponent.getMental() > curPerso.getMental()) {
				tourCourant = oponent;
			} else if (oponent.getMental() < curPerso.getMental() ){
				tourCourant = curPerso;
			} else if (oponent.getMental() == curPerso.getMental() ) {
				var op=oponent.tossDice();
				var cur=curPerso.tosDice();
				while (op==cur) {
					op=openent.tossDicePhysic();
					cur=curPerso.tossDice();
				}
				if (op>cur) 
				 tourCourant = oponent;
				else tourCourant = curPerso;
			}
			// tourCourant est défini

	}
};

recursiveAsyncReadLine(null);


