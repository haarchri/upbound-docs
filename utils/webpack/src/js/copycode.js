export function createCopyButton(highlightDiv) {
  const button = document.createElement("span")

  let codeSelector = "pre > code"
  if (highlightDiv.querySelector(".lntable")) {
    codeSelector = ".lntable .lntd:last-child pre > code"
  }

  const codeContainer = highlightDiv.querySelector(codeSelector)
  if (codeContainer !== null) {
    const codeContent = codeContainer.innerText.trim()

    // default is only copy line 1
    var startLines = 1
    var endLines = 1

    // did they set the "copy-lines" value in the code box to identify what to copy?
    if("copy-lines" in highlightDiv.attributes){
      // look for a value like 1-10. Split on the dash.
      var startendLines = highlightDiv.attributes["copy-lines"].value.split("-")
      startLines = parseInt(startendLines[0])

      // they want to copy a single line, but it's not the first one
      if(startendLines.length == 1){
        endLines = parseInt(startendLines[0])
      }
      else{
        endLines = parseInt(startendLines[1])
      }

    }

    var copyContent = codeContent.split("\n").slice((startLines - 1), (endLines)).join("\n")


    button.classList.add("flex", "align-center", "justify-center", "clip", "gdoc-post__codecopy")
    button.type = "button"
    button.innerHTML =
      '<svg class="gdoc-icon copy"><use xlink:href="#gdoc_copy"></use></svg>' +
      '<svg class="gdoc-icon check hidden"><use xlink:href="#gdoc_check"></use></svg>'
    button.setAttribute("data-clipboard-text", copyContent)
    button.setAttribute("data-copy-feedback", "Copied!")
    button.setAttribute("role", "button")
    button.setAttribute("aria-label", "Copy")

    highlightDiv.classList.add("gdoc-post__codecontainer")
    highlightDiv.insertBefore(button, highlightDiv.firstChild)
  }
}
