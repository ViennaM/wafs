(function () {
  'use strict'
  var app = {
    init: function () {
      routes.init()
    }
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
        'home/:breed?': function (breed) {
          template.init('detail', breed)
        },
        '': function () {
          location.hash = '#home'
        }
      })
      
    }
  }

  var api = {
    getData: function (page, breed) {
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
        request.onerror = function () {}
        request.send()
      })
    },
    collectData: []
  }

  var template = {
    init: function (page, breed) {
      var curBreed = breed
      if (page === 'home' && api.collectData.length > 0) {
        template.handleData(api.collectData, curBreed)
      } else {
        console.log('doei')
        api.getData(page, breed)
          .then(function (data) {
            template.handleData(data, curBreed)
          })
          .catch(function () {
            console.log('errorrrertje')
          })
      }

      this.toggle(page)
    },
    handleData: function (result, breed) {
      if (result.status >= 200 && result.status < 400) {
        var data = JSON.parse(result.responseText)
        if (location.hash === '#home') {
          if (!api.collectData) {
            api.collectData.push(data.message)
          }
          var breedArr = data.message
          api.collectData = data.message
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
        } else if (location.hash === '#random') {
          html = `<img src="${data.message}">`
          document.querySelector('#random .loader').classList.add('hide')
          this.render(html)
        } else {
          var html = `<h1>${breed}</h1>`
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
    hideSections: function () {
      var sections = document.querySelectorAll('section')
      sections.forEach(function (section) {
        section.classList.remove('active')
      })
    },
    toggle: function (page) {
      // Show section from hash
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
    // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle: function (a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }

  app.init()
})()
