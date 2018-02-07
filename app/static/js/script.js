(function () {

    var app = {
      init: function () {
        routes.init()
        sections.toggle(window.location.hash)
      }
    }

    var routes = {
      init: function () {
            window.addEventListener('hashchange', () => {
            sections.toggle(window.location.hash)
        })
      }
    }

    var sections = {
      toggle: function (route) {
        var sections = document.querySelectorAll('section')
        var active = document.querySelector(`${route}`)
        
        sections.forEach(function(section) {
            section.classList.remove('active')
        })
        active.classList.add('active')
      }
    }

    app.init()
    
  })()