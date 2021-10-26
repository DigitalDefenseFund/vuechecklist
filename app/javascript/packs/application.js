// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

require("bootstrap")
import "../stylesheets/application";


Rails.start()
Turbolinks.start()
ActiveStorage.start()

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  var element = document.querySelector("#todos")
  const app = new Vue({
    el: element,
    data: {
      todos: JSON.parse(element.dataset.todos),
      checklist: element.dataset.checklist,
    },
    template: "<App :original_todos='todos' :checklist='checklist' />",
    components: { App }
  })
})
