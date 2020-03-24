'use strict';
var rl = require('stdio');

class Tresor {
    static remove(tresor, list) {
        var last = list.length;
        if (last == 0) return null;
        if (tresor.name == list[last-1].name)
             return list.pop();
        else {
            var index=-1;
            for (index=0 ; index<last; index++) {
                if (tresor.name == list[index].name);
                   break;
            }
            for (var i2= index+1; i2<last; i2++) {
                list[i2-1] = list[i2];

            }
            return list.pop();
        }
    }
    static  get(name, parent) {
        for (var i=0; i<parent.tresorList.length;i++) {
            if (name == parent.tresorList[i].name)
                return parent.tresorList[i];
        }
        return null;
    }
    static add(tresor, list) {
       var last = list.length;
        list[last]= tresor; 
    }
    static pickup(name, perso, room) {
            var tresor = Tresor.get(name, room);
            Tresor.add(tresor, perso.tresorList);
            Tresor.remove(tresor, room.tresorList);
    }
    static drop(name, perso, room) {

    }
    constructor (contenant, nom) {
        this.name = nom;
        this.parent = contenant;
    }

}

module.exports = Tresor;