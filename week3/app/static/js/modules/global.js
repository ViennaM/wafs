import template from './template.js'

const global = {
  elements: {
    input: document.querySelector('#search'),
    refresh: document.querySelector('#refresh')
  },
  handleEvents: function () {
    // Trigger random page when click refresh button
    this.elements.refresh.addEventListener('click', () => {
      template.init('random')
    })
    // Trigger search function on input
    this.elements.input.addEventListener('input', () => {
      template.search(this.dataStorage, this.elements.input.value.toLowerCase())
    })

  },
  removeContent: function (breed) {
    // Define content to remove 
    let content = function () {
      if (breed) {
        return document.querySelector('#detail .content')
      } else {
        return document.querySelector(location.hash + ' .content')
      }
    }

    // Remove previous content before adding new content
    while (content().firstChild) {
      content().removeChild(content().firstChild)
    }
  },
  // Store data from api in memory
  dataStorage: []
}

export default global