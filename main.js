console.log(a);
//console.log(b);
var a = 'satyam';
let b = 'sahoo';
const e = [23,24,25];
e[0] = 26;
console.log('e',e);

hello =()=>{
    const f=100;
    let c= "satyamsahoo";
    console.log('f',f);
    {
        
        let d= "naruto";
        console.log('f inblock',f);
    }
    console.log('a',this.a);
}

hello();