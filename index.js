let caps = false;
let shift = false;

// Get button elements

const _actions = document.querySelectorAll("[data-action]")
const _chars = document.querySelectorAll("[data-char]");
const _mods = document.querySelectorAll("[data-mod]");

// Get container elements

const _page = document.querySelector("#page");
const _keyboard = document.querySelector("#keyboard");

// Attach event handlers

_actions.forEach(function(_action) {
  _action.onclick = function() {
    handleAction(_action);
  }
});

_chars.forEach(function(_char) {
  _char.onclick = function() {
    handleChar(_char);
  }
});

_mods.forEach(function(_mod) {
  _mod.onclick = function() {
    handleMod(_mod);
  }
});

function handleChar(_char) {
  var char = _char.getAttribute('data-char');
  console.log(char);
  
  if (caps){
    char = char.toUpperCase()
  }
  
  if(shift) {    
    if (!caps && shift){
      char = char.toUpperCase() 
    }else{
      char = char.toLowerCase()
    }
    
    var _mods = document.querySelectorAll("[data-mod]");
    _mods.forEach(function(_mod){
      if (_mod.getAttribute('data-mod') == "shift"){
        handleMod(_mod); 
      }        
    }); 
  }  

  page.innerHTML += char;
  
  // BONUS:  Insert char at the cursor position
  // Search online for contenteditable
}

function handleMod(_mod) {
  var mod = _mod.getAttribute('data-mod');
  
  caps_counter = 1;
  
  if (mod == "caps") {
    if (!caps) {
      caps = true;
      _mod.classList.add("botton-style");  
    }else{
      caps = false;
      _mod.classList.remove("botton-style");
    }
  }
  
  if (mod == "shift") {
    if (!shift) {
      shift = true;
      _mod.classList.add("botton-style");  
    }else{
      shift = false;
      _mod.classList.remove("botton-style");
    }
  }
}

function handleAction(_action) {
  const action = _action.getAttribute('data-action');
  console.log(action);
  
  if (action == "clear") {
    if (confirm("Do you want to clear all ?")){
      handleClear();
    }
  }else{
    handleDownload(document.documentElement.innerHTML);
  }
  // TODO: Handle other actions (else if)
}

function handleClear() {
  _page.innerHTML = '';
}

function handleDownload(text) {
  var data = new Blob([text], { type: "text/html;charset=utf-8" });
  
  var link = document.getElementsByClassName('download')[0];
  link.style.display = "block";
  link.href = window.URL.createObjectURL(data); 
}