(function () {

    const app = {
      init: function () {
        routes.init()
        blocks.toggle(location.hash)
      }
    }

    const routes = {
      init: function () {
            window.addEventListener('hashchange', () => {
            blocks.toggle(location.hash)
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