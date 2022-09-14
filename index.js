import Color from './Color.js'
import { rgbToHex } from './utils.js'

document.getElementById('color-form').addEventListener('submit', (e) => {
  e.preventDefault()
  processColorScheme()
})

let colors = []

function processColorScheme() {
  const colorHex = document.getElementById('color-picker').value
  const colorMode = document.getElementById('color-mode-select').value
  
  colors = [ new Color({ colorHex: colorHex })]
  
  // Get the color scheme from the color API
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex.substring(1)}&mode=${colorMode}&count=4`)
    .then(response => response.json())
    .then(data => {
      colors = colors.concat(data.colors.map(color => new Color({ colorHex: color.hex.value })))
      render()
    })
}

function render() {
  const colorsHtml = colors.map(color => color.getColorHtml()).join('')
  document.getElementById('colors').innerHTML = colorsHtml
}

// Run at page load
processColorScheme()



// Copy to clipboard
document.getElementById('colors').addEventListener('click', (e) => {
  if(e.target.classList.contains("color-bar")) {
    const colorHex = rgbToHex(e.target.style.backgroundColor)
    navigator.clipboard.writeText(colorHex.toUpperCase());
    const copiedMsg = document.getElementById('copied-msg')
    copiedMsg.classList.add('show')
    setTimeout(() => copiedMsg.classList.remove('show'), 1500)
  }
})