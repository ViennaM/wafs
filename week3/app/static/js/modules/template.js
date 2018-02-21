import global from '/static/js/modules/global.js'
import api from '/static/js/modules/api.js'
import helper from '/static/js/modules/helper.js'

const template = {
  init: function (page, breed) {
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
    global.elements.input.value = ''
    let curBreed = breed,
      curPage = page
    // Handle list data from data storage when available
    if (page === 'home' && global.dataStorage.length > 0) {
      this.home(global.dataStorage)
    } else {
      document.querySelector(`#${page} .loader`).classList.remove('hide')
      api.getData(page, breed)
        // Promise resolved 
        .then((data) => {
          api.handleData(data, curBreed, page)
        })
        // Catch errors
        .catch((err) => {
          console.log(err)
        })
    }
    template.toggle(page)

  },
  search: function (data, value) {
    let newData = data.filter((breed) => {
      return breed.includes(value)
    })
    let content = document.querySelector(location.hash + ' .content')

    // Remove previous content before adding new content
    while (content.firstChild) {
      content.removeChild(content.firstChild)
    }
    template.home(newData)
  },
  home: function (data) {
    const breedArr = data
    let html = '<ul>'
    breedArr.forEach((breed, i) => {
      html += `
        <li>
          <a href="#home/${breed}">${helper.capitalize(breed)}</a>
        </li>
        `
    })
    html += '</ul>'
    this.render(html)
  },
  random: function (data) {
    let html = `<img src="${data}">`
    this.render(html)
  },
  detail: function (data, breed, page) {
    var breed = helper.capitalize(breed)
    let html = `<h1>${breed}</h1>`
    // Shuffle images array and only show the first 15
    helper.shuffle(data).slice(0, 15).forEach((img) => {
      html += `
            <img src="${img}">
            `
    })
    this.render(html, breed, page)
  },
  // Hide all sections
  hideSections: function () {
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      section.classList.remove('active')
    })
  },
  toggle: function (page) {
    // Show current section
    if (page === 'detail') {
      var active = document.querySelector('#detail')
    } else {
      var page = location.hash
      var active = document.querySelector(page)
    }
    template.hideSections()
    active.classList.add('active')
  },
  render: function (html, breed, page) {
    let content = function () {
      if (breed) {
        return document.querySelector('#detail .content')
      } else {
        return document.querySelector(location.hash + ' .content')
      }
    }
    // Define element ID for hiding loader
    let elId = function () {
      if (page) {
        return '#detail'
      } else {
        return location.hash
      }
    }
    document.querySelector(elId() + ' .loader').classList.add('hide')

    // Check if html to render is more than <ul></ul>
    if (html.length > 9) {
      content().insertAdjacentHTML('beforeend', html)
    } else {
      content().insertAdjacentHTML('beforeend', 'Nothing found...')
    }
  }
}


export default template;