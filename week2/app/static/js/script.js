// SOS:
// - Lijsten geven eerst 'undefined' terug
// - Random plaatje van ras (api.getImg) 
// - Plaatje op #random verspringt vanuit #home

(function () {
  'use strict'
  var app = {
    init: function () {
      routes.init()
      this.handleEvents()
    },
    handleEvents: function () {
      location.hash = "#home"
      // Prevent default
      document.querySelectorAll("nav a").forEach(function (element) {
        element.addEventListener("click", function (event) {
          event.preventDefault()
          location.hash = this.hash
        })
      })
      document.querySelector('#refresh').addEventListener('click', () => {
        random.init()
      })
    }

  }

  var routes = {
    init: function () {
      routie({
        'home': function () {
          home.init()
        },
        'random': function () {
          random.init()
        },
        'home/:breed?': function (breed) {
          detail.init(breed)
        }
      })
    }
  }

  var home = {
    init: function () {
      template.toggle(location.hash)
      api.getData('home', home).then(function (result) {
        if (result.status >= 200 && result.status < 400) {
          var data = JSON.parse(result.responseText)
          var breedArr = data.message
          console.log(breedArr)
          // breedArr.forEach(function (breed, i) {
          //   api.getImg(breed).then(function (result) {
          //     if (result.status >= 200 && result.status < 400) {
          //       var data = JSON.parse(result.responseText)
          //       console.log(breedArr)
          //       var imgArr = data.message
          //       home.render(breedArr, imgArr)
          //     }
          //   })
          // })
          home.render(breedArr)
        }
      })
    },
    render: function (data) {
      var list = ''
      data.forEach(function (item) {
        list += `
        <li>
          <a href="#home/${item}">${item}</a>
        </li>
        `
      })
      document.querySelector('#list').innerHTML = list
    }
  }

  var random = {
    init: function () {
      template.toggle(location.hash)
      api.getData('random', random).then(function (result) {
        if (result.status >= 200 && result.status < 400) {
          var data = JSON.parse(result.responseText)
          random.render(data.message)
        }
      })
    },
    render: function (data) {
      document.querySelector('#image').src = data
    }
  }

  var detail = {
    init: function (breed) {
      template.toggle('#detail')
      api.getData('detail', detail, breed).then(function (result) {
        if (result.status >= 200 && result.status < 400) {
          var data = JSON.parse(result.responseText)
          detail.render(data.message, breed)
        }
      })

    },
    render: function (data, breed) {
      var list = ''
      data.slice(0, 5).forEach(function (item) {
        list += `
        <li>
          <img src="${item}">
        </li>
        `
      })
      document.querySelector('#detail').innerHTML = `
        <h1>${breed}</h1>
        <a href="#home">terug</a>
        <ul>${list}</ul>
        `
    }
  }

  var api = {
    getData: function (section, page, breed) {
      var url = function () {
        if (section == 'home') {
          return 'https://dog.ceo/api/breeds/list'
        } else if (section == 'random') {
          return 'https://dog.ceo/api/breeds/image/random'
        } else if (section == 'detail') {
          return `https://dog.ceo/api/breed/${breed}/images`
        }
      }
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url(), true)
        request.onload = function () {
          resolve(request)
        }
        request.onerror = function () {}
        request.send()
      })
    },
    getImg: function (breed) {
      var url = `https://dog.ceo/api/breed/${breed}/images/random`
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onload = function () {
          resolve(request)
        }
        request.onerror = function () {}
        request.send()
      })
    }

  }

  var template = {
    toggle: function (route) {
      // Show section from hash
      var sections = document.querySelectorAll('section')
      var active = document.querySelector(route)
      sections.forEach(function (section) {
        section.classList.remove('active')
      })
      active.classList.add('active')
    },
    render: function (data) {
      if (location.hash === '#home') {}
    }
  }

  app.init()
})()
