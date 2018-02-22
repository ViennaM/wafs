// To do:
// - Modules
// - Navigation active 

import routes from './modules/routes.js'
import global from './modules/global.js'

(function () {
  'use strict'

  // General app object
  const app = {
    init: function () {
      routes.init()
      global.handleEvents()
    }
  }

  // Start the app!
  app.init()
})()
