// let js = "amazing";
// console.log(80 + 10 - 3 * 10);

// const PI = 3.1415; // better to make constants uppercase
// console.log(PI);

// //number
// console.log(typeof 23);
// //string
// console.log(typeof "Mazen");
// //boolean
// js = true;
// console.log(typeof js);
// //undefined
// let year;
// console.log(typeof year);
// //null
// console.log(typeof null);
// //symbol
// console.log(typeof Symbol("id"));
// //bigint
// console.log(typeof 1234567890123456789012345678901234567890n);

// !----------------------------------------------------------------------------------

const now = 2037;
const ageMazen = now - 2002;
const ageSarah = now - 2018;
console.log(ageMazen, ageSarah);
console.log(ageMazen * 2, ageMazen / 10, 2 ** 3);
//2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Mazen";
const lastName = "Mahmoud";
console.log(firstName + " " + lastName);

let sum = 10 + 5;
sum += 10; // sum = sum + 10
sum *= 4; // sum = sum * 4
sum++;
console.log(sum);

console.log(ageMazen > ageSarah); // >, <, >=, <= true or false

console.log(`${firstName} ${lastName}`); //template litera

console.log(`I'm ${ageMazen} years old`);

// Calculate the average BMI --Challenge #1
const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;
console.log(`markBMI will be ${markBMI}, johnBMI will be ${johnBMI}`);

const markHigherBMI = markBMI > johnBMI;
console.log(`markHigherBMI will be ${markHigherBMI}`); // if mark is hiegher than john will be true

// !----------------------------------------------------------------------------------
// Challenge #2
console.log(`Mark's BMI: ${markBMI}, John's BMI ${johnBMI}`);
if (markBMI > johnBMI) {
  console.log(`Mark's BMI is higher than John's!`);
} else console.log(`John's BMI is higher than Mark's!`);

// !----------------------------------------------------------------------------------

// Type Conversion
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Mazen")); //NaN not a number
console.log(typeof NaN); //number
console.log(String(23), 23);

// Type Coercion
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3); // - , / , * will convert strings to numbers
console.log("23" + "10" + 3); // + will convert numbers to strings

console.log("23" * "2");
console.log("23" / "2");
console.log("23" > "18");
let n = "1" + 1; // '11'
n = n - 1;
console.log(n); // 10

// !----------------------------------------------------------------------------------

// 5 falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Mazen"));
console.log(Boolean({}));
console.log(Boolean(""));

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height; //undefined or if we set it to 0 it will be false
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}
// !----------------------------------------------------------------------------------

// Equality Operators
const age = 18;
if (age === 18) console.log("You just became an adult :D (strict)");
if (age == 18) console.log("You just became an adult :D (loose)");

const favourite = Number(prompt("What's your favourite number?")); // prompt always returns a string by default
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
  // '23' == 23
  console.log("Cool! 23 is an amazing number!");
} else if (favourite !== 23) console.log("Why not 23?");

// !----------------------------------------------------------------------------------

// Logical Operators
const hasDriversLicense = true; // A
const hasGoodVision = false; // B
console.log(hasDriversLicense && hasGoodVision); // true if both are true
console.log(hasDriversLicense || hasGoodVision); // true if one of them is true
console.log(!hasDriversLicense); // not
console.log(!hasGoodVision); // not

const shouldDrive = hasDriversLicense && hasGoodVision; //both should be true to drive

if (shouldDrive) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}

// !----------------------------------------------------------------------------------

//Challenge #3
const dolphineScore = (96 + 108 + 89) / 3;
const koalasScore = (88 + 91 + 110) / 3;
console.log(dolphineScore, koalasScore);
if (dolphineScore > koalasScore && dolphineScore >= 100) {
  console.log("Dolphine win the trophy 🏆");
} else if (koalasScore > dolphineScore && koalasScore >= 100) {
  console.log("Koalas win the trophy 🏆");
} else if (
  dolphineScore === koalasScore &&
  dolphineScore >= 100 &&
  koalasScore >= 100
) {
  console.log("Both win the trophy 🏆");
} else {
  console.log("No team wins the trophy");
}

// !----------------------------------------------------------------------------------

// switch statement
const day = prompt("Enter day").toLowerCase();

switch (day) {
  case "monday":
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  default:
    console.log("Not a valid day!");
}

// !----------------------------------------------------------------------------------
// Conditional (Ternary) Operator
const age2 = 23;
age2 >= 18
  ? console.log("I like to drink wine 🍷")
  : console.log("I like to drink water 💧");

const drink = age2 >= 18 ? "wine 🍷" : "water 💧";
console.log(drink);
console.log(`I like to drink ${age2 >= 18 ? "wine 🍷" : "water 💧"}`);

const bill = 275;
const tip = bill * (bill >= 50 && bill <= 300 ? 0.15 : 0.2);
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);