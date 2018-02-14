(function () {
  var app = {
    init: function () {
      routes.init()
      this.handleEvents()
    },
    handleEvents: function () {
      // Prevent default
      document.querySelectorAll("nav a").forEach(function (element) {
        element.addEventListener("click", function (event) {
          event.preventDefault()
          location.hash = this.hash
        })
      })
      document.querySelector('.random').addEventListener('click', () => {
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
      var data = api.getData('home', home)
    },
    render: function (data) {
      var list
      data.forEach(function (item) {
        var img = api.getImg(item)
        console.log(item)
        list += `
        <li>
          <img src="gggg">
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
      var data = api.getData('random', random)
    },
    render: function (data) {
      document.querySelector('#image').src = data
    }
  }

  var detail = {
    init: function (breed) {
      template.toggle('#detail')
      var data = api.getData('detail', detail, breed)
      
    },
    render: function (data, breed) {
      var list
      data.forEach(function (item) {
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
      var request = new XMLHttpRequest()
      request.open('GET', url(), true)
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText)

          page.render(data.message, breed)

        } else {
          // Error
        }
      }
      request.onerror = function () {
        // There was a connection error of some sort
      }
      request.send()
    },
    getImg: function (breed) {
      var url = `https://dog.ceo/api/breed/${breed}/images/random`
      var request = new XMLHttpRequest()
      var img
      request.open('GET', url, true)
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText)

          console.log(data)

        } else {
          // Error
        }
      }
      request.onerror = function () {
        // There was a connection error of some sort
      }
      request.send()
    }
  }

  var template = {
    init: function () {
      this.toggle(location.hash)
    },
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
