import template from './template.js'

var routes = {
  init: function () {
    routie({
      'home': () => {
        template.init('home')
      },
      'random': () => {
        template.init('random')
      },
      // Detail page of a breed from list
      'home/:breed?': (breed) => {
        template.init('detail', breed)
      },
      // Go directly to app's home
      '': () => {
        routie('home')
      },
      // Go to home if page doesn't exist
      '*': () => {
        location.hash = '#home'
      }
    })
  }
}

export default routes