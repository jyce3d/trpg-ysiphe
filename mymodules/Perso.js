'use strict';
class Perso {
	constructor(X,Y,Z,name, descr, mental, physic, plaie, contus) {
		this.mental = mental;
		this.physic= physic;
		this.plaie = plaie;
		this.contus = contus;
		this.name = name;
		this.status =0;
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
}

module.exports = Perso;