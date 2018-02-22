import global from './global.js'
import template from './template.js'
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
          if (global.dataStorage.length == 0) {
            global.dataStorage = data.message
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

  export default api;