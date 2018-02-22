import template from './template.js'

const global = {
  elements: {
    input: document.querySelector('#search'),
    refresh: document.querySelector('#refresh')
  },
  handleEvents: function () {
    global.elements.refresh.addEventListener('click', () => {
      template.init('random')
    })
    // Trigger search function on input
    global.elements.input.addEventListener('input', () => {
      template.search(global.dataStorage, global.elements.input.value.toLowerCase())
    })

  },
  removeContent: function (breed) {
    if (breed) {
      return document.querySelector('#detail .content')
    } else {
      return document.querySelector(location.hash + ' .content')
    }

    // Remove previous content before adding new content
    while (content().firstChild) {
      content().removeChild(content().firstChild)
    }
  },
  dataStorage: []
}

export default global