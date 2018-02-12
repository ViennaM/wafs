(function () {

  // App
  const app = {
    init: function () {
      routes.init()
      this.handleEvents()
    },
    handleEvents: function () {
      document.querySelectorAll("nav a").forEach(function (element){
        element.addEventListener("click", function(event) {
            event.preventDefault()
            location.hash = this.hash
        })
      })
      document.querySelector('.random').addEventListener('click', () => {
        api.load()
      })
    }
  }

  // Routes 
  const routes = {
    init: function () {
      routie({
        'start': function () {
          api.load()
          sections.toggle(location.hash)
        },
        'start/:breed?': function (breed) { 
          sections.toggle('#detail')
          console.log(breed)
        },
        'random': function () {
          api.load()
          sections.toggle(location.hash)
        }
      })
    }
  }

  // Render section from hash
  const sections = {
    toggle: function (route) {
      const sections = document.querySelectorAll('section')
      let active = document.querySelector(route)
      sections.forEach(function (section) {
        section.classList.remove('active')
      })
      active.classList.add('active')
    }
  }

  // Dog api
  const api = {
    load: function () {
      const url = {
        breeds: 'https://dog.ceo/api/breeds/list',
        random: 'https://dog.ceo/api/breeds/image/random'
      }
    
      const request = new XMLHttpRequest()
      location.hash === '#start' ? request.open('GET', url.breeds, true) : request.open('GET', url.random, true)
      
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
        // Success!
          var data = JSON.parse(request.responseText)

          function toObject(arr) {
            var rv = [];
            for (var i = 0; i < arr.length; ++i) {
              let x = {}
              x.breed = arr[i]
              rv.push(x)
            }
            return rv;
          }

          if (location.hash === '#start') {

            var breed = toObject(data.message)
            Transparency.render(document.getElementById('breeds'), breed);

          } else if (location.hash === '#random') {

            document.querySelector('#image').src = data.message

          }

        } else {
        // We reached our target server, but it returned an error
        }
      };
    
      request.onerror = function() {
      // There was a connection error of some sort
      };
    
      request.send();
    }
  }

  app.init()
})()
