const insert = document.getElementById("insert");

window.addEventListener("keydown", (e) => {
  insert.innerHTML = `
      <div class="key" id="key">
        ${e.key === " " ? "Space" : e.key}
        <small>event.key</small>
      </div>
      <div class="key" id="keycode">
        ${e.keyCode}
        <small>event.keyCode</small>
      </div>
      <div class="key" id="code">
        ${e.code}
        <small>event.code</small>
      </div>`;
});
