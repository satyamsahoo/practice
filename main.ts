let myName  = {
    firstName : 'satyam',
    lastName : 'sahoo',

    calculateFullName(this:void) {
        console.log(this)
        return this.firstName + ' ' + this.lastName;
    }
}

let Name = myName.calculateFullName();
console.log(Name);