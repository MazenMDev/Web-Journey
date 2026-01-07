'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  console.log('--------------------');
  console.log('Login');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;

    // Clear inputs
    inputLoginPin.value = inputLoginUsername.value = '';
    if (document.activeElement === inputLoginUsername)
      inputLoginUsername.blur();
    if (document.activeElement === inputLoginPin) inputLoginPin.blur();

    updateUI(currentAccount);
  }
  console.log(currentAccount);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log('amount', amount);
  console.log(receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (document.activeElement === inputTransferAmount)
    inputTransferAmount.blur();
  if (document.activeElement === inputTransferTo) inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  if (document.activeElement === inputLoanAmount) inputLoanAmount.blur();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  console.log('trigger');
  console.log(inputClosePin.value, inputCloseUsername.value);

  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    const indexCloseAccount = accounts.findIndex(acc => acc === currentAccount);
    accounts.splice(indexCloseAccount, 1);
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = '';
  if (document.activeElement === inputClosePin) inputClosePin.blur();
  if (document.activeElement === inputCloseUsername) inputCloseUsername.blur();
});

let sortedState = ['default', 'ascending', 'descending'];
let index = 0;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  index = (index + 1) % sortedState.length;
  let state = sortedState[index];
  displayMovements(currentAccount.movements, state);
  console.log(state);
});
// displayMovements(currentAccount.movements, !sorted);
// sorted = !sorted;

function updateUI(currAcc) {
  calcDisplaySummary(currAcc);
  displayMovements(currAcc.movements);
  calcDisplayBalance(currAcc);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

function displayMovements(movements, state = 'default') {
  let movs;
  if (state === 'default') movs = movements;
  else if (state === 'descending') // from large to small
    movs = movements.slice().sort((a, b) => a - b); // a -b because of insertAdjacentHTML 'afterbegin' (reverse order)
  else if (state === 'ascending') // from small to large
    movs = movements.slice().sort((a, b) => b - a);

  containerMovements.innerHTML = '';
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Displaying movements
const calcDisplayBalance = function (currAcc) {
  currAcc.balance = currAcc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${currAcc.balance}€`;
};

function calcDisplaySummary(currAcc) {
  const movements = currAcc.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`; // total deposits

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // total withdrawals

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currAcc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`; // total interest
}

function createUsername(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}
createUsername(accounts);

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice method
console.log(arr.slice(2)); // from 2 to the end
console.log(arr.slice(2, 4)); // from 2 to < 4
console.log(arr.slice(-2)); // take the last 2
console.log(arr.slice(1, -2)); // from 1 to < last two
console.log(arr.slice());
console.log([...arr]); // shallow copy

console.log('-----------');

// Splice method (mutation)
// console.log(arr.splice(2)); // extract from 2 to the end
console.log(arr.splice(1, 2)); // from 2 and the number we want to delete
console.log(arr); // the part from 2 to the end is missing cause of mutating

// Reverse (mutation)
let arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // mutated by reverse

// Concat
const letters = arr.concat(arr2); // mixing the first arr with the second arr2
console.log(letters);
console.log([...arr, ...arr2]); // working the same without mutating also

// Join
console.log(letters.join(' - '));

///////////////////////////////////////
// The new at Method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));

///////////////////////////////////////
// Looping Arrays: forEach

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// Coding Challenge #1
console.log('----- Coding Challenge #1 -----');

function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = [...dogsJulia]; // shallow copy
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  const allDogs = dogsJuliaCorrected.concat(dogsKate);

  allDogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
}
console.log('---test data 1---');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('---test data 2---');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// map method

const eurToUsd = 1.1;

// 1. using arrow function
const movementsUSD = movements.map(mov => Math.round(mov * eurToUsd));
console.log(movements);
console.log(movementsUSD);

// 2. using for loop
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(Math.round(mov * eurToUsd));
console.log(movementsUSDfor);

// 3. using map with function declaration
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

// filter method
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// reduce method
console.log('------------');
const balance = movements.reduce((current, most) => {
  console.log('Current:', current, 'Most:', most);
  return current > most ? current : most;
}, movements[0]);
console.log(balance);
console.log(movements[0]);

let balance2 = 0;
for (const mov of movements) balance2 += mov; // balance2 = balance2 + mov
console.log(balance2);

// Challenge #2
console.log('----- Coding Challenge #2 -----');

function calcDogAge(dogsJulia, dogsKate) {
  const juliaDogs = [...dogsJulia];
  juliaDogs.slice(0, 1);
  juliaDogs.slice(-2);

  const allDogs = juliaDogs.concat(dogsKate);
  console.log('all dogs: ', allDogs);

  // 1. map to get dog ages in human years
  const dogAges = allDogs.map((dog, i) => {
    return dog <= 2 ? 2 * dog : 16 + dog * 4;
  });
  console.log(dogAges);

  // 2. filter to get adult dogs
  const adultDogs = allDogs.filter(dog => dog >= 18); //
  console.log("Adult dogs' ages:");
  console.log(adultDogs);

  // 3. reduce to get average age of adult dogs
  const adultDogAges = adultDogs.map((dog, i) => {
    return dog <= 2 ? 2 * dog : 16 + dog * 4;
  });
  console.log('Adult dogs ages in human years:', adultDogAges);

  const averageAge =
    adultDogAges.reduce((acc, age) => acc + age, 0) / adultDogAges.length;
  console.log('Average age of adult dogs:', averageAge);
}
console.log('---test data 1---');
calcDogAge([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('---test data 2---');
calcDogAge([9, 16, 6, 8, 3], [20, 5, 6, 1, 4]);

const euroToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log('Total Deposits in USD:', Math.round(totalDepositsUSD));

console.log('-----------------------');

// Coding Challenge #3
const calcAvgHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

// Find method
const firstWithdrawal = movements.find(mov => mov < 0); // returns the first element that matches the condition
console.log(movements);
console.log('firstWithdrawal:', firstWithdrawal);

console.log(accounts); // All the accounts
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // only the Jessica account

for (let acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    console.log(acc);
  }
}
console.log('-------------');
// findLast
const firstWithdrawalLast = movements.findLast(mov => mov < 0);
console.log('firstWithdrawalLast:', firstWithdrawalLast);
// findLastIndex
const firstWithdrawalLastIndex = movements.findLastIndex(mov => mov < 0);
console.log('firstWithdrawalLastIndex:', firstWithdrawalLastIndex);

// some and every
console.log(movements.includes(-130)); // true

const anyDeposits = movements.some(mov => mov > 1500);
console.log('anyDeposits:', anyDeposits);

const allDeposits = movements.every(mov => mov > 0);
console.log('allDeposits:', allDeposits);

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// flat and flatMap
const arrDeep = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat()); // [1,2,3,4,5,6,7,8]

const arrDeep2 = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep2.flat(2)); // [1,2,3,4,5,6,7,8]

// flat on movements
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log('overalBalance:', overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log('overalBalance2:', overalBalance2);
console.log('-----------------------');

// Coding Challenge #4

console.log('----- Coding Challenge #4 -----');

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
console.log('Number 1--------------------');
const huskyWeight = breeds.find(b => b.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
console.log('Number 2--------------------');
const dogBothActivities = breeds.find(
  b => b.activities.includes('running') && b.activities.includes('fetch')
).breed;
console.log(dogBothActivities);

// 3. Create an array "allActivities" of all the activities of all the dog breeds
console.log('Number 3--------------------');
// First Way
let allActivities = [];
breeds.forEach(b => allActivities.push(b.activities));
allActivities = allActivities.flat();
console.log(allActivities);

// Second Way
let test = breeds.map(b => b.activities);
test = test.flat();
console.log(test);

// Third Way (Best)
let test2 = breeds.flatMap(b => b.activities);
console.log(test2);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
console.log('Number 4--------------------');
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
console.log('Number 5--------------------');
let swimmingAdjacent = breeds
  .filter(b => b.activities.includes('swimming'))
  .flatMap(b => b.activities)
  .filter(ac => ac !== 'swimming');
swimmingAdjacent = swimmingAdjacent;

swimmingAdjacent = [...new Set(swimmingAdjacent)];
console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
console.log('Number 6--------------------');
console.log(breeds.every(b => b.averageWeight >= 10));

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
console.log('Number 7--------------------');
console.log(breeds.some(b => b.activities.length >= 3));

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
console.log('Bouns -----------------');
const breedWithFetch = breeds
  .filter(b => b.activities.includes('fetch'))
  .map(b => b.averageWeight);
console.log(breedWithFetch);
const heaviestFetchBreed = Math.max(...breedWithFetch);
console.log(heaviestFetchBreed);

const owners = ['Jonas', 'Zek', 'Mazen', 'Adam'];
console.log(owners.sort());
// sort mutates the original array
console.log(owners);

console.log(movements);
// console.log(movements.sort());

console.log(movements.sort((a, b) => a - b)); // from small to large
console.log(movements.sort((a, b) => b - a));
