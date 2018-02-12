(function () {
  const app = {
    init: function () {
      routes.init()
      blocks.init()
      this.handleEvents()
    },
    handleEvents: function () {
      document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault() // prevent jump
          blocks.toggle(e.target.hash)
          window.location.hash = e.target.hash // set url to match hash
        })
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
    init: function () {
      blocks.toggle(window.location.hash)
    },
    toggle: function (route) {
      const sections = document.querySelectorAll('section')
      let active = document.querySelector(route)
      sections.forEach(function (section) {
        section.classList.remove('active')
      })
      active.classList.add('active')
    }
  }
  app.init()
})()
