function newCode(parent = document.body) {
  let hideButton = document.createElement("button");
  let div = document.createElement("div");
  let lineNumbers = document.createElement("div");
  let textarea = document.createElement("textarea");
  hideButton.innerHTML = "-";
  div.className = "numtext";
  lineNumbers.className = "line-numbers";
  textarea.className = "codearea";
  parent.appendChild(hideButton);
  parent.appendChild(div);
  div.appendChild(lineNumbers);
  div.appendChild(textarea);
  hideButton.addEventListener('click', event => {
    if (div.style.display == "none") {
      div.style.display = "";
    } else {
      div.style.display = "none";
    }
  });
  textarea.addEventListener('keyup', event => {
    const numberOfLines = event.target.value.split('\n').length
    lineNumbers.innerHTML = Array(numberOfLines)
      .fill('<span></span>')
      .join('')
  });
  textarea.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)
      event.preventDefault()
    }
  });
  return div;
}
