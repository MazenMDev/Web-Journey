// let generateName = require("sillyname"); // CommonJS syntax
import generateName from "sillyname"; // ES6 module syntax
let name = generateName();
console.log(`My silly name is: ${name}`);

import { randomSuperhero } from "superheroes";
for (let i = 0; i < 100; i++) {
  const heroName = randomSuperhero();
  if (heroName.startsWith("Iron")) {
    console.log(`I'm ${heroName}`);
    break;
  }
}
