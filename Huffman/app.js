import {
  getFrequency,
  buildTree,
  generateCodes,
  encode,
  decode,
} from "./huffman.js";

const text = document.getElementById("textInput");
const btn = document.querySelector("button");

text.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  const value = text.value;

  if (!value.trim()) {
    alert("Input field is empty!");
    return;
  }

  document.getElementById("output").innerHTML = "";

  const freq = getFrequency(value);
  const tree = buildTree(freq);
  const codes = generateCodes(tree);
  const encoded = encode(value, codes);
  const decoded = decode(encoded, tree);

  display("Encoded String", encoded);
  display("Decoded String", decoded);

  const originalBits = value.length * 8;
  const compressedBits = encoded.length;
  const ratio = ((originalBits - compressedBits) / originalBits) * 100;

  display("Original Bits", originalBits);
  display("Compressed Bits", compressedBits);
  display("Compression Ratio", ratio.toFixed(2) + "%");

  // Create container for tables
  const tablesContainer = document.createElement("div");
  tablesContainer.className = "tables-container";
  document.getElementById("output").appendChild(tablesContainer);

  displayHuffmanCodes(codes, tablesContainer);
  displayFrequencyTable(freq, value.length, tablesContainer);
});

function display(label, value) {
  const div = document.createElement("div");
  div.textContent = `${label}: ${value}`;
  document.getElementById("output").appendChild(div);
}

function displayFrequencyTable(freq, totalChars, container) {
  const table = document.createElement("table");
  table.id = "freqTable";
  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th>Character</th><th>Frequency</th><th>Probability</th>";
  table.appendChild(headerRow);

  for (let char in freq) {
    const row = document.createElement("tr");
    const probability = (freq[char] / totalChars).toFixed(4);
    row.innerHTML = `<td>${char === " " ? "Space" : char}</td><td>${
      freq[char]
    }</td><td>${probability}</td>`;
    table.appendChild(row);
  }
  container.appendChild(table);
}

function displayHuffmanCodes(codes, container) {
  const table = document.createElement("table");
  table.id = "codesTable";
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Character</th><th>Huffman Code</th>";
  table.appendChild(headerRow);
  for (let char in codes) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${char === " " ? "Space" : char}</td><td>${
      codes[char]
    }</td>`;
    table.appendChild(row);
  }
  container.appendChild(table);
}

