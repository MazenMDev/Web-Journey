'use strict';

// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5 way of setting default parameters
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 5); // will use default price of 199 * 5
// createBooking('LH123', undefined, 1000); // will use default numPassengers of 1

// const flight = 'LH234';
// const mazen = {
//   name: 'Mazen mahmoud',
//   passport: 1234567890,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999'; // local change only
//   passenger.name = 'Mr. ' + passenger.name; // changes the original object both points to the same object in heap memory

//   if (passenger.passport === 1234567890) {
//     console.log('Checked in');
//   } else console.log('wrong passport!');
// };
// checkIn(flight, mazen);
// console.log(flight);
// console.log(mazen);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };
// newPassport(mazen);
// checkIn(flight, mazen);

// // !--------------------------------------------

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', oneWord);
// transformer('JavaScript is the best!', upperFirstWord);

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// ['Mazen', 'Sarah', 'John'].forEach(high5);
// !--------------------------------------------

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// // greet('Hello')('john');
// greeterHey('Mazen');

// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hello')('Sarah');

// !--------------------------------------------

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Mazen Mahmoud');
// lufthansa.book(635, 'John Smith');
// console.log(lufthansa.bookings);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Does not work
// // book(23, 'Sarah Williams');

// // Call method
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings.bookings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa.bookings);

// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(eurowings, flightData);
// console.log(eurowings.bookings);

// book.call(eurowings, ...flightData); // modern way of using apply
// console.log(eurowings.bookings);
// // !-----------------------------------------------------

// // Bind method
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// bookEW(456, 'Steven Williams');
// bookLH(789, 'Mazen Mahmoud');

// console.log('-----------------');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Sarah Connor');

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
// console.log(addVAT(23));

// // Challenge
// console.log('------------------');

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// !--------------------------------------------

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const number = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    number >= 0 && number < this.answers.length
      ? this.answers[number]++
      : alert('Enter a valid number');
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
