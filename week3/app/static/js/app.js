// To do:
// - Modules
// - Navigation active 

import routes from '/static/js/modules/routes.js'
import global from '/static/js/modules/global.js'

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
