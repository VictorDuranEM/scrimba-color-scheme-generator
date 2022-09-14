class Color {
  constructor(data) {
    Object.assign(this, data)
  }
  
  getColorHtml() {
    const { colorHex } = this
    return `
      <div class="color">
        <div class="color-bar" style="background-color: ${colorHex};"></div>
        <p class="color-name">${colorHex}</p>
      </div>
    `
  }
}

export default Color