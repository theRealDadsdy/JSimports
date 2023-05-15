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
    const numberOfLines = event.target.value.split('\r').join('\n').split('\n').length
    lineNumbers.innerHTML = Array(numberOfLines)
      .fill('<span></span>')
      .join('')
    if (event.key == 'Tab') {
      event.preventDefault();
    }
    if (event.key = 'Enter'){
      event.preventDefault();
    }
  });
  textarea.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      document.execCommand('insertText', false, '  ');
      event.preventDefault();
    }
    if (event.key == 'Enter'){
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const prev = textarea.value.substring(0, start).split('\n');
      const line = prev[prev.length - 1];
      const brace = line.split('{').length - line.split('}').length;
      const unmatched = (textarea.value.split("{").length > textarea.value.split("}").length);
      let newLine = '\n' + line.split('  ').fill('').join('  ');
      let loc = start + line.split('  ').length * 2 - 1;
      if (brace > 0 && unmatched){
        newLine += '  ' + newLine + '}';
        loc += 2;
      }
      if (brace > 0 && !unmatched){
        newLine += '  ';
        loc += 2;
      }
      document.execCommand('insertText', false, newLine);
      textarea.setSelectionRange(loc, loc);
      event.preventDefault();
    }
  });
  return div;
}
