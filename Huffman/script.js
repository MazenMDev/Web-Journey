const text = document.getElementById("textInput");
const btn = document.querySelector("button");
let value = text.value;

text.addEventListener("input", () => {
  value = text.value;
  console.log("Current input value:", value);
});

text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  if (value === "") {
    alert("Input field is empty!");
    return;
  }
  console.log("Button clicked!");
  console.log("Final input value:", value);
  console.log(`Total characters: ${value.length}`);

  // Calculate frequency of each character
  const freq = {};
  for (let char of value) {
    freq[char] = (freq[char] || 0) + 1;
  }
  console.log("Character frequencies:", freq);

  // Create initial nodes for Huffman tree
  const nodes = [];
  for (let char in freq) {
    nodes.push({ char: char, freq: freq[char] });
  }
  console.log("Initial nodes:", nodes);

  nodes.sort((a, b) => a.freq - b.freq);
  console.log("Sorted nodes:", nodes);

  // Build Huffman tree
  let copyNodes = [...nodes];

  while (copyNodes.length > 1) {
    const node1 = copyNodes[0];
    const node2 = copyNodes[1];

    const parentNode = {
      char: null,
      freq: node1.freq + node2.freq,
      left: node1,
      right: node2,
    };

    copyNodes.splice(0, 2);
    copyNodes.push(parentNode);
    copyNodes.sort((a, b) => a.freq - b.freq);
    console.log("Updated nodes:", copyNodes);
  }
  console.log("Final Huffman Tree:", copyNodes[0]);

  const huffmanCodes = {};

  function generateCodes(node, path = "") {
    if (node.char !== null) {
      huffmanCodes[node.char] = path;
      return;
    }

    if (node.left) {
      generateCodes(node.left, path + "0");
    }
    if (node.right) {
      generateCodes(node.right, path + "1");
    }
  }

  generateCodes(copyNodes[0]);
  console.log("Huffman Codes:", huffmanCodes);

  let encodedString = "";
  for (let char of value) {
    encodedString += huffmanCodes[char];
  }
  console.log("Encoded String:", encodedString);
  displayBits("Encoded String", encodedString);

  function decodeHuffman(encdodedStr, tree) {
    let decodedStr = "";
    let currentNode = tree;

    for (let bit of encdodedStr) {
      if (bit === "0") {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      if (currentNode.char !== null) {
        decodedStr += currentNode.char;
        currentNode = tree;
      }
    }
    return decodedStr;
  }
  const decodedString = decodeHuffman(encodedString, copyNodes[0]);
  console.log("Decoded String:", decodedString);
  displayBits("Decoded String", decodedString);

  const originalBits = value.length * 8;
  displayBits("Original Bits", originalBits);

  const compressedBits = encodedString.length;
  displayBits("Compressed Bits", compressedBits);

  const compressionRatio =
    ((originalBits - compressedBits) / originalBits) * 100;
  console.log(`Compression Ratio: ${compressionRatio.toFixed(2)}%`);
  displayBits("Compression Ratio", `${compressionRatio.toFixed(2)}%`);
});

function displayBits(label, bits) {
  console.log(`${label}: ${bits}`);
  const div = document.createElement("div");
  div.textContent = `${label}: ${bits}`;
  document.getElementById("output").appendChild(div);
}
