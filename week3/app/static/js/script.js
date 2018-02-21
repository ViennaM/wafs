// To do:
// - Modules
// - ES6
// - Navigation active 
// - CSS

(function () {
  'use strict'

  // General app object
  const app = {
    init: function () {
      routes.init()
      this.handleEvents()
    },
    elements: {
      input: document.querySelector('#search'),
      refresh: document.querySelector('#refresh')
    },
    handleEvents: function () {
      app.elements.refresh.addEventListener('click', () => {
        template.init('random')
      })
      // Trigger search function on input
      app.elements.input.addEventListener('input', () => {
        template.search(app.dataStorage, app.elements.input.value.toLowerCase())
      })

    },
    dataStorage: []
  }

  const routes = {
    init: function () {
      routie({
        'home': () => {
          template.init('home')
        },
        'random': () => {
          template.init('random')
        },
        // Detail page of a breed from list
        'home/:breed?': (breed) => {
          template.init('detail', breed)
        },
        // Go directly to app's home
        '': () => {
          routie('home')
        },
        // Go to home if page doesn't exist
        '*': () => {
          location.hash = '#home'
        }
      })
    }
  }

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
      app.elements.input.value = ''
      let curBreed = breed,
        curPage = page
      // Handle list data from data storage when available
      if (page === 'home' && app.dataStorage.length > 0) {
        this.home(app.dataStorage)
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
      this.toggle(page)
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
      this.hideSections()
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

  // Api functions
  const api = {
    getData: function (page, breed) {
      // Set api url
      let url = function () {
        if (page === 'home') {
          return 'https://dog.ceo/api/breeds/list'
        } else if (page === 'random') {
          return 'https://dog.ceo/api/breeds/image/random'
        } else if (page === 'detail') {
          return `https://dog.ceo/api/breed/${breed}/images`
        }
      }
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('GET', url(), true)
        request.onload = () => {
          resolve(request)
        }
        request.onerror = () => {
          reject('error')
          template.render('Nothing found...')
        }
        request.send()
      })
    },
    handleData: function (result, breed, page) {
      if (result.status >= 200 && result.status < 400) {
        let data = JSON.parse(result.responseText)
        // Handle received data for page: home
        if (location.hash === '#home') {
          // Store list data in memory
          if (app.dataStorage.length == 0) {
            app.dataStorage = data.message
          }
          template.home(data.message)
        }
        // Handle received data for page: random
        else if (location.hash === '#random') {
          template.random(data.message)
        }
        // Handle received data for page: detail
        else {
          template.detail(data.message, breed, page)
        }
      }
    }
  }

  const helper = {
    // Shuffle items in an array, from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle: (a) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    // Capitalize first letter in string, from: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalize: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  // Start the app!
  app.init()
})()
