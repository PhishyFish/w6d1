const sum = function (...args) {
  // let array = Array.slice().call(arguments);
  let result = 0;
  args.forEach(function(el) {
    result += el;
  });
  return result;
};

// var cat = {name: 'bob'};
//
// const meow = function(){ console.log('meow' + this.name);};
//
//
//
// let themeow = meow.bind(cat);


let sayHi = function(otherName, years) {
  console.log("Hi " + otherName + "! My name is " + this.name + ", and I am " + years + " years old.");
};

/// Array.prototype.mergeSort .....
///    console.log(this)
/// arr = [ 2, 3, 5];
/// arr.mergeSort => this would be `arr`

// cat named jerry; let Cat = new Cat('jerry');
// let hello = sayHi.myBind(jerry, "Elliot");
// fn === this; fn === sayHi
// bindArgs === ["Elliot"]
// hello === _boundFn () { ... }

// hello(26)
/// callArgs === [26]
/// return sayHi.apply(jerry, ["Elliot"].concat([26]))
/// --> sayHi("elliot", 26) this is set to jerry

/// sayHi.myBind(jerry, "Elliot")(26);
/// sayHi.myBind(jerry)("Elliot", 26);
/// sayHi.myBind(jerry, "Elliot", 26)();

Function.prototype.myBind = function(ctx){
  const fn = this; //refers to the instance of the Function
  const bindArgs = Array.from(arguments).slice(1);
  return function _boundFn(){
    const callArgs = Array.from(arguments);
    return fn.apply(ctx,bindArgs.concat(callArgs));
  };
};

Function.prototype.myBind = (ctx) => {
  const bindArgs = Array.from(arguments).slice(1);
  return () => {
    const callArgs = Array.from(arguments);

  };
};

const curriedSum = function(numArgs){
  let numbers = [];

  const _curriedSum = function(number){
    console.log(this);
    numbers.push(number);
    if (numbers.length === numArgs){
      let results = 0;
      numbers.forEach(function(el){
        results += el;
      });
      return results;
    } else {
      return _curriedSum;

      //why doesn't this work
    }
  };
  return _curriedSum;
};

function Dog(name){
  this.name = name;
}

let bob = new Dog('bob');

let woof = function(){
  console.log(this.name);
}

let bark = ()  => {
  console.log(this.name);
}

Dog.prototype.meow = () => {
  console.log(this.name);
}

Function.prototype.myBind2 = function (ctx, ...bindArgs) {
  return (...callArgs) => this.apply(ctx, bindArgs.concat(callArgs));
};




// Function.prototype.curry = function(numArgs){
//   // this is the Function
//   let the_args = [];
//
//   const _curry = function(arg){
//     the_args.push(arg);
//     if (the_args.length === numArgs){
//       return the_args;
//     } else {
//       return _curry;
//     }
//   };
//
//   return _curry;
//   return this.apply(this,_curry)
// };
//
// const add = function(a,b,c){
//   return a + b + c;
// };

var Dog = {name: 'bobbo'};
const woof = function(){
  console.log(this.name);
};
