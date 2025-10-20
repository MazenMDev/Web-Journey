'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   function printAge() {
//     let output = `${firstName} is ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millennial = true;
//       //creating new variable with same name as outer scope's variable
//       const firstName = 'Steven';
//       //reassigning outer scope's variable
//       output = 'NEW OUTPUT!';

//       const str = `Oh, and you're a millennial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//       console.log(add(2, 3));
//     }
//     console.log(millennial); // var is function scoped older than ES6
//     console.log(output);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Mazen';
// calcAge(1991);
// console.log('-------------------------------');

//!--------------------------------------------------

// console.log(me); // hoisting but unidefined
// // console.log(job);
// // console.log(year);

// var me = 'Mazen';
// let job = 'developer';
// const year = 1991;

// //-----------------------functions

// console.log(addDecl(2, 3)); // hoisting works for function declarations
// // console.log(addExpr(2, 3));
// // console.log(addArrow(2, 3));

// // function declaration
// function addDecl(a, b) {
//   return a + b;
// }

// //expression function
// const addExpr = function (a, b) {
//   return a + b;
// };

// //arrow function
// const addArrow = (a, b) => a + b;

// //example
// if (!numProducts) {
//   deleteShoppingCart();
// }

// var numProducts = 10;
// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// // in browsers, global variables declared with var become properties of the window object
// console.log(x === window.x);// true
// console.log(y === window.y);// false
// console.log(z === window.z);// false

//!--------------------------------------------------

// // console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1980);
// console.log('-------------------------------');

// const mazen = {
//   year: 1991,

//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },

//   calcAgeArrow: () => {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };
// mazen.calcAge();
// console.log('-------------------------------');
// mazen.calcAgeArrow();

// console.log('-------------------------------');
// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = mazen.calcAge;
// mazen.calcAge();
// matilda.calcAge();

//!--------------------------------------------

// const mazen = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     // const isMillennial = function () {
//     //   console.log(this);
//     //   console.log('-------------------------------');
//     //   console.log(this.year >= 1981 && this.year <= 1996);
//     // };
//     // isMillennial();

//     //solution 1: bind this
//     // const isMillennial = function () {
//     //   console.log(this);
//     //   console.log('-------------------------------');
//     //   console.log(this.year >= 1981 && this.year <= 1996);
//     // }.bind(this);
//     // isMillennial();

//     //solution 2: arrow function
//     // const isMillennial = () => {
//     //   console.log(this);
//     //   console.log('-------------------------------');
//     //   console.log(this.year >= 1981 && this.year <= 1996);
//     // };
//     // isMillennial();
//   },

//   greet: () => {
//     console.log(`Hey ${this.year}`); // this here points to global object not mazen object
//   },
// };

// mazen.greet();
// mazen.calcAge();

// //arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);

//!--------------------------------------------

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";

console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

//marriedJessica = {}; // we cannot reassign marriedJessica to a new object


console.log('-------------------------------');
//copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = {...jessica2}; // shallow copy
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
// jessica2 and jessicaCopy share the same family array in memory because of shallow copy (object spread operator)

//Deep copy is needed to fully copy objects with nested objects or arrays
const jessicaDeepCopy = structuredClone(jessica2);
jessicaDeepCopy.family.push('Sophia'); 

console.log('After deep copy and modification:');
console.log('Original:', jessica2);
console.log('Deep Copy:', jessicaDeepCopy);


const btn = document.createElement("button");
btn.textContent = "Click Me";
document.body.appendChild(btn);

btn.addEventListenera("click", function() {
  alert("Button Clicked!");
});