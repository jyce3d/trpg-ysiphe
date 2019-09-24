'use strict';
var rl = require('stdio');
class Perso {
	constructor(X,Y,Z,name, descr, mental, physic, plaie, contus) {
		this.mental = mental;
		this.physic= physic;
		this.plaie = plaie;
		this.contus = contus;
		this.name = name;
		this.status =0;
		this.meta =0;
		this.X = X;
		this.Y = Y;
		this.Z = Z;
		this.descr = descr;
	}
	
	getMental() {
		return this.mental;
	}
	getPhysic() {
		return this.physic;

	}	
	getPlaie() {
		return this.plaie;
	}
	getContus() {
		return this.contus;
	}
	getName() {
		return this.name;
	}
	tossDice(mod) {
		return (Math.random() * 10) % mod +1;

	}
	tossDiceMental() {
		return this.tossDice(this.mental);
	}
	computeMeta() {
		var res=0;
		for (var i=0;i<=this.meta; i++) {
			if (this.tossDice(1) == 0) {
				res = res - this.tossDice(2);
			} else 			
				res = res + this.tossDice(2);
		}
		return res;
	}
	action(aType) {
		var meta=0;
		if (this.meta !=0 )
			meta = this.computeMeta();
		var phys=this.tossDice(aType);
		phys=phys+meta;
		if (phys<0) phys=0;
		return phys;
	}
	_actionPhysic() {
		return this.action(this.physic);
	}
	_actionMental() {
		return this.action(this.mental);
	}
	attackPhysic(aType, autre) {
		var att=0;
		var def=0;
		if (aType==1) {
			att=this._actionPhysic();
			console.log("Vous lancez votre attaque:" + att );
			def=autre._actionPhysic();
			console.log("Votre adversaire esquive à " + def);
			if (att>def) {
				autre.plaie= autre.plaie + (att-def);
				console.log("Vous infligé " + att-def+ "à votre adversaire");
			} else 
				console.log("Votre adversaire esquive votre attaque");
			if (autre.plaie>autre.physic) {
				console.log("Votre adversaier ne se relève pas et est bon pour l'infirmerie");
				return 1;
			}
			rl.question('?',function(err, answer) {
				
			});
			return autre.attackPhysic(0, this);
		} else {
			att=this._actionPhysic();
			console.log("Votre adversaire attaque:" + att );
			def=autre._actionPhysic();
			console.log("Vous esquivez à " + def);
			if (att>def) {
				autre.plaie= autre.plaie + (att-def);
				console.log("Il vous a infligé " + att-def );
			}
			else console.log("Vous esquivez!");
			if (autre.plaie>autre.physic) {
				console.log("Vous ne vous relevez pas et êtes bon pour l'infirmerie");
				return 2;
			}
			rl.question('?', function(err, answer) {
				
			});
			return this.attackPhysic(1, autre);
		}
	}
}

module.exports = Perso;