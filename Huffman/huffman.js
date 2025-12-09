function getFrequency(text) {
  const freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

function buildTree(freq) {
  const nodes = [];

  for (let char in freq) {
    nodes.push({ char, freq: freq[char] });
  }

  nodes.sort((a, b) => a.freq - b.freq);
  let list = [...nodes];

  while (list.length > 1) {
    const [node1, node2] = list;

    const parent = {
      char: null,
      freq: node1.freq + node2.freq,
      left: node1,
      right: node2,
    };

    list.splice(0, 2);
    list.push(parent);
    list.sort((a, b) => a.freq - b.freq);
  }

  return list[0];
}

function generateCodes(tree) {
  const codes = {};

  function traverse(node, path = "") {
    if (node.char !== null) {
      codes[node.char] = path;
      return;
    }
    if (node.left) traverse(node.left, path + "0");
    if (node.right) traverse(node.right, path + "1");
  }

  traverse(tree);
  return codes;
}

function encode(text, codes) {
  let encoded = "";
  for (let char of text) {
    encoded += codes[char];
  }
  return encoded;
}

function decode(encoded, tree) {
  let decoded = "";
  let current = tree;

  for (let bit of encoded) {
    current = bit === "0" ? current.left : current.right;

    if (current.char !== null) {
      decoded += current.char;
      current = tree;
    }
  }

  return decoded;
}

export { getFrequency, buildTree, generateCodes, encode, decode };
