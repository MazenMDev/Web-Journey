// function add(a, b) {
//   return a + b;
// }

// console.log(add(2, 3)); // output: 5

// function multiply(a, b) {
//   return a * b;
// }
// console.log(multiply(2, 3)); // output: 6

// // Newly added function ... -> rest parameter that takes multiple arguments
// function sumAll(...numbers) {
//   let sum = 0;
//   for (let num of numbers) {
//     sum += num;
//   }
//   return sum;
// }
// console.log(sumAll(1, 2, 3, 4)); // output: 10

// // default parameter
// function greet(name = "Guest") {
//   return `Hello, ${name}!`;
// }
// console.log(greet()); // output: Hello, Guest!
// console.log(greet("Alice")); // output: Hello, Alice!

// // object in function parameter
// function displayUser(person) {
//   for (let key in person) {
//     console.log(`${key}: ${person[key]}`);
//   }
// }

// const person = { name: "mazen", age: 19, country: "Egypt" };
// displayUser(person);
// /*
// output:
// name: mazen
// age: 19
// country: Egypt
// */

// //* Group number 1 (Basic Functions)
// //one:
// function lastElement(arr) {
//   console.log(arr[arr.length - 1]);
// }

// //two:
// function manualLength(str) {
//   let count = 0;
//   for (let char of str) count++;
//   return count;
// }
// console.log(manualLength("hello")); // output: 5

// //three:\
// function checkNumber(n) {
//   if (n > 0) return "positive";
//   if (n < 0) return "negative";
//   return "zero";
// }

// //four:
// function booleanToWord(bool) {
//   return bool ? "Yes" : "No";
// }
// console.log(booleanToWord(true)); // output: Yes

// //five:
// function capatalizeFirstLetter(str) {
//   return str[0].toUpperCase() + str.slice(1);
// }
// console.log(capatalizeFirstLetter("mazen")); // output: Mazen

// //* Group number 2 (Rest / Spread / Arguments)
// //one:
// function sumArray() {
//   let sum = 0;
//   for (let i = 0; i < arrguments.length; i++) {
//     sum += arrguments[i];
//   }
//   return sum;
// }

// //two:
// function mergeArrays(arr1, arr2) {
//   return [...arr1, ...arr2];
// }
// console.log(mergeArrays([1, 2], [3, 4])); // output: [1, 2, 3, 4]

// //three:
// function applyToAll(callback, ...numbers) {
//   return numbers.map((n) => callback(n));
// }
// console.log(applyToAll((n) => n * 2, 1, 2, 3)); // output: [2, 4, 6]

// //* Group number 3 (Closures)
// //one:
// function counter() {
//   let value = 0;

//   return {
//     increase() {
//       value++;
//       return value;
//     },
//     decrease() {
//       value--;
//       return value;
//     },
//     reset() {
//       value = 0;
//       return value;
//     },
//   };
// }
// const myCounter = counter();
// console.log(myCounter.increase()); // output: 1
// console.log(myCounter.increase()); // output: 2
// console.log(myCounter.decrease()); // output: 1
// console.log(myCounter.reset()); // output: 0

// //two:
// function returnLast3() {
//   let arr = [];
//   return function (num) {
//     arr.push(num);
//     if (arr.length > 3) arr.shift();
//     return [...arr];
//   };
// }
// const last3 = returnLast3();
// console.log(last3(1)); // output: [1]
// console.log(last3(2)); // output: [1, 2]
// console.log(last3(3)); // output: [1, 2, 3]
// console.log(last3(4)); // output: [2, 3, 4]
// console.log(last3(5)); // output: [3, 4, 5]

//three:
console.log("Stopwatch Test:");
function stopWatch() {
  let time = 0;
  let intervalId = null;

  return {
    start() {
      if (intervalId === null) {
        intervalId = setInterval(() => {
          time++;
        }, 1000);
      }
    },
    stop() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    reset() {
      time = 0;
    },
    getTime() {
      return time;
    },
  };
}

const watch = stopWatch();

watch.start();
setTimeout(() => {
  console.log("Time after 3 seconds:", watch.getTime());
  watch.stop();

  console.log("Stopped at:", watch.getTime());

  watch.reset();
  console.log("After reset:", watch.getTime());
}, 10000); // Wait for 10 seconds to see the stopwatch in action

//* Group number 4 (CallBacks)
// one:
function repeat(fn, times) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
let hello = () => console.log("Hello World");
repeat(hello, 5); // output: Hello World (5 times)

// two:
function miniMap(arr, callback) {
  const result = [];
  for (let val of arr) {
    result.push(callback(val));
  }
  return result;
}
console.log(miniMap([1, 2, 3], (n) => n * 2)); // output: [2, 4, 6]

// three:
function filterWords(arr, callback) {
  return arr.filter((word) => callback(word));
}
const words = ["apple", "banana", "grape", "kiwi", "avocado"];
const longWords = filterWords(words, (word) => word.length > 4);
console.log(longWords); // output: ['apple', 'banana', 'grape', 'avocado']

// four:
function every(arr, callback) {
  for (let item of arr) {
    if (!callback(item)) return false;
  }
  return true;
}
console.log(every([2, 4, 6], (n) => n % 2 === 0)); // output: true
console.log(every([2, 3, 6], (n) => n % 2 === 0)); // output: false

// five:
function reject(arr, callback) {
  return arr.filter((x) => !callback(x));
}
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = reject(numbers, (n) => n % 2 === 0);
console.log(oddNumbers); // output: [1, 3, 5]

//* Group number 5 (Higher Order Functions)

// one:
function processNumber(n) {
  return {
    add: n + 5,
    multiply: n * 2,
    square: n * n,
  };
}
console.log(processNumber(3)); // output: { add: 8, multiply: 6, square: 9

// two:
function once(fn) {
  let excuted = false;
  return function (...agrs) {
    if (!excuted) {
      excuted = true;
      return fn(...agrs);
    }
  };
}
const initialize = once(() => console.log("Initialized!"));
initialize(); // output: Initialized!
initialize(); // no output

// three:
function cache(fn) {
  const map = new Map();
  return function (x) {
    if (map.has(x)) return map.get(x);
    const result = fn(x);
    map.set(x, result);
    return result;
  };
}
const square = cache((n) => {
  console.log("Calculating...");
  return n * n;
});
console.log(square(4)); // output: Calculating... 16
console.log(square(4)); // output: 16 (cached result)

// four:
function delay(fn, seconds) {
  setTimeout(fn, seconds * 1000);
}
const delayMes = delay(() => console.log("Delayed Hello!"));
delayMes(2); // output (after 2 seconds): Delayed Hello!

//* Group number 6 (Real-World Function Examples)
// one:
function validatePassword(password) {
  return (
    password.length >= 8 && /[A-Z] /.test(password) && /[0-9]/.test(password)
  );
}
console.log(validatePassword("Password1")); // output: true
console.log(validatePassword("pass")); // output: false

// two:
function covertTo12(time) {
  let [h, m] = time.split(":");
  h = Number(h);

  let period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h} : ${m} ${period}`;
}
console.log(covertTo12("14:30")); // output: 2:30 PMz

// //!-------------------------------------------------------------------------------------------------------------
// //!-------------------------------------------------------------------------------------------------------------
// //!-------------------------------------------------------------------------------------------------------------
// //!-------------------------------------------------------------------------------------------------------------
// //!-------------------------------------------------------------------------------------------------------------
// // arrow function
// const divide = (a, b) => a / b;
// console.log(divide(6, 2)); // output: 3

// // IIFE (Immediately Invoked Function Expression)
// (function () {
//   console.log("This function runs immediately upon definition!");
// })(); // output: This function runs immediately upon definition!

// // recursive function
// function factorial(n) {
//   if (n <= 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(5)); // output: 120

// // callback function
// function fetchData(callback) {
//   setTimeout(() => {
//     const data = "Sample Data";
//     callback(data);
//   }, 1000);
// }
// fetchData((data) => {
//   console.log(data); // output (after 1 second): Sample Data
// });

// // closure
// function outerFunction(outerVariable) {
//   return function innerFunction(innerVariable) {
//     console.log(`Outer Variable: ${outerVariable}`);
//     console.log(`Inner Variable: ${innerVariable}`);
//   };
// }
// const newFunction = outerFunction("outside");
// newFunction("inside");

// /*output:
// Outer Variable: outside
// Inner Variable: inside
// */

// // object method
// const calculator = {
//   add: function (a, b) {
//     return a + b;
//   },
//   subtract: function (a, b) {
//     return a - b;
//   },
// };

// console.log(calculator.add(5, 3)); // output: 8
// console.log(calculator.subtract(5, 3)); // output: 2
