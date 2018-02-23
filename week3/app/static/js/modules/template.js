import global from './global.js'
import api from './api.js'
import helper from './helper.js'

const template = {
  init: function (page, breed) {
    global.removeContent(breed) // Remove previous content
    global.elements.input.value = '' // Empty search input
    this.toggle(page) // Toggle right section

    // Handle list data from data storage only when available
    if (page === 'home' && global.dataStorage.length > 0) {
      this.home(global.dataStorage)
    } else {
      // Show loader
      document.querySelector(`#${page} .loader`).classList.remove('hide')

      // Get api data from promise
      api.getData(page, breed)
        .then((data) => { // Promise resolved
          api.handleData(data, breed, page) // Do something with data from api request
        })
        .catch((err) => {
          console.log(err)
        })
    }

  },
  search: function (data, value) {
    let newData = data.filter((breed) => {
      return breed.includes(value)
    })

    global.removeContent() // Remove previous content

    this.home(newData)
  },
  home: function (data) {
    const breedArr = data

    // When array is empty, give feedback
    if (breedArr.length === 0) {
      this.render('Nothing found...')
    } else {
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
    }
  },
  random: function (data) {
    let html = `<img src="${data}">`
    this.render(html)
  },
  detail: function (data, breed, page) {
    var breed = helper.capitalize(breed) // Start breed with capital
    let html = `<h1>${breed}</h1>`
    // Shuffle images in array and only show the first 15
    helper.shuffle(data).slice(0, 15).forEach((img) => {
      html += `
            <img src="${img}">
            `
    })
    this.render(html, breed, page)
  },
  hideSections: function () {
    // Hide all sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      section.classList.remove('active')
    })
  },
  toggle: function (page) {
    // Define page to show
    if (page === 'detail') {
      var active = document.querySelector('#detail')
    } else {
      var page = location.hash
      var active = document.querySelector(page)
    }
    this.hideSections() // Hide all sections
    active.classList.add('active') // Show section which is active
  },
  render: function (html, breed, page) {
    // Hide loader
    document.querySelectorAll('.loader').forEach(function(loader) {
      loader.classList.add('hide')
    })
   
    // Define wrapper to insert html 
    let content = function () {
      if (breed) {
        return document.querySelector('#detail .content')
      } else {
        return document.querySelector(location.hash + ' .content')
      }
    }
    // Insert html into content wrapper
    content().insertAdjacentHTML('beforeend', html) //
  }
}


export default template;