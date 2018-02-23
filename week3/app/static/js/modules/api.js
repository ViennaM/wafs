import global from './global.js'
import template from './template.js'

  const api = {
    getData: function (page, breed) {
      // Define api url to request
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
          resolve(request) // Promise resolved
        }
        request.onerror = () => {
          reject('error') // Promise rejected
          template.render('Nothing found... Please try again later.')
        }
        request.send()
      })
    },
    handleData: function (result, breed, page) {
      if (result.status >= 200 && result.status < 400) {
        let data = JSON.parse(result.responseText)
        // Handle received data for page: home
        if (page === 'home') {
          // Store list data in memory
          if (global.dataStorage.length == 0) {
            global.dataStorage = data.message
          }
          template.home(data.message)
        }
        // Handle received data for page: random
        else if (page === 'random') {
          template.random(data.message)
        }
        // Handle received data for page: detail
        else if (page === 'detail') {
          template.detail(data.message, breed, page)
        }
      }
    }
  }

  export default api;