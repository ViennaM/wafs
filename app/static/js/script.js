(function () {

    const app = {
      init: function () {
        routes.init()
        blocks.toggle(window.location.hash)
        document.querySelector('a').addEventListener((e) => {
          e.preventdefault()
        })
      }
    }

    const routes = {
      init: function () {
            window.addEventListener('hashchange', () => {
            blocks.toggle(window.location.hash)
        })
      }
    }

    const blocks = {
      toggle: function (route) {
        const sections = document.querySelectorAll('section')
        let active = document.querySelector(route)
        
        sections.forEach(function(section) {
            section.classList.remove('active')
        })
        active.classList.add('active')
      }
    }

    app.init()
    
  })()