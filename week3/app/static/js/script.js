(function () {
  'use strict'

  // General app object
  var app = {
    init: function () {
      routes.init()
    },
    dataStorage: []
  }

  var routes = {
    init: function () {
      routie({
        'home': function () {
          template.init('home')
        },
        'random': function () {
          template.init('random')
        },
        // Detail page of a breed from list
        'home/:breed?': function (breed) {
          template.init('detail', breed)
        },
        // Go directly to app's home
        '': function () {
          routie('home')
        }
      })
    }
  }

  // Api functions
  var api = {
    getData: function (page, breed) {
      // Set api url
      if (page === 'home') {
        var url = 'https://dog.ceo/api/breeds/list'
      } else if (page === 'random') {
        var url = 'https://dog.ceo/api/breeds/image/random'
      } else if (page === 'detail') {
        var url = `https://dog.ceo/api/breed/${breed}/images`
      }
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onload = function () {
          resolve(request)
        }
        request.onerror = function () {
          reject('error')
        }
        request.send()
      })
    }
  }

  var template = {
    init: function (page, breed) {
      var curBreed = breed
      // Handle list data from data storage when available
      if (page === 'home' && app.dataStorage.length > 0) {
        template.handleData(app.dataStorage, curBreed)
      } else {
        api.getData(page, breed)
          // Promise resolved (data received)
          .then(function (data) {
            template.handleData(data, curBreed)
          })
          // Promise rejected (no data received)
          .catch(function () {
            console.log('errorrrertje')
          })
      }
      this.toggle(page)
    },

    handleData: function (result, breed) {
      if (result.status >= 200 && result.status < 400) {
        var data = JSON.parse(result.responseText)
        // Handle received data for page: home
        if (location.hash === '#home') {
          // Store list data in memory
          if (app.dataStorage.length == 0) {
            app.dataStorage.push(data.message)
          }
          var breedArr = data.message
          app.dataStorage = data.message
          var html = '<ul>'
          breedArr.forEach(function (breed, i) {
            html += `
            <li>
              <a href="#home/${breed}">${breed}</a>
            </li>
            `
          })
          html += '</ul>'
          document.querySelector('#home .loader').classList.add('hide')
          this.render(html)
        }
        // Handle received data for page: random
        else if (location.hash === '#random') {
          html = `<img src="${data.message}">`
          document.querySelector('#random .loader').classList.add('hide')
          this.render(html)
        }
        // Handle received data for page: detail
        else {
          var html = `<h1>${breed}</h1>`
          // Shuffle images array and only show the first 15
          helper.shuffle(data.message).slice(0, 15).forEach(function (img) {
            html += `
            <img src="${img}">
            `
          })
          document.querySelector('#detail .loader').classList.add('hide')
          this.render(html, breed)
        }
      }
    },
    // Hide all sections
    hideSections: function () {
      var sections = document.querySelectorAll('section')
      sections.forEach(function (section) {
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
      document.querySelector('.loader').classList.remove('hide')
    },
    render: function (html, breed) {
      if (breed) {
        var content = document.querySelector('#detail .content')
      } else {
        var content = document.querySelector(location.hash + ' .content')
      }
      // Remove previous content before adding new content
      while (content.firstChild) {
        content.removeChild(content.firstChild)
      }
      content.insertAdjacentHTML('beforeend', html)
      document.querySelector('#home .loader').classList.add('hide')
    }
  }

  var helper = {
    // Shuffle items in an array, from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle: function (a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }

  // Start the app!
  app.init()
})()
