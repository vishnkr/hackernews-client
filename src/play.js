//react code playground

class Developer{
    constructor(first, last){
        this.first = first;
        this.last = last;

    }
    getname(){
        return this.first+' ' +this.last;
    }
}

const robin = new Developer('Robin','Uthappa');
console.log(robin.getname());

const name = "bob";
const user = {
    name,   // is the same as name:name,
};

const key = 'name'; const user = {
    [key]: 'Robin',
  };
  