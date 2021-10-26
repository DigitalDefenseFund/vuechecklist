<template>
  <div id="app">
    <div class="form-group">
      <draggable :todo="todos" :options="{group: 'lists'}" class="dragArea" @end="todoMoved">
        <div v-for="(todo, id) in todos" class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="{{ todo.id }}">
          <label class="form-check-label" for="{{ todo.id }}">{{ todo.description }}</label>
        </div>
      </draggable>
    </ul>
    <div class="card">
      <input class="form-control" v-model="item" placeholder="item"></textarea>
      <button v-on:click="addItem" class="btn btn-primary">Add Item</button>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: ["original_todos", "checklist"],
  data: function() {
    return {
      item: '',
      todos: this.original_todos,
    }
  },
  methods: {
    addItem: function() {
      var data = new FormData
      data.append("todo[checklist_id]", this.checklist)
      data.append("todo[description]", this.item)

      Rails.ajax({
        url: `${this.checklist}/todos`,
        type: "POST",
        data: data,
        dataType: "json",
        success: (data) => {
          this.todos.push(data)
          this.item = undefined
        }
      })
    },
    todoMoved: function(event) {
      var data = new FormData
      data.append("todo[id]", this.todos[event.oldIndex].id)
      data.append("todo[new_position]", event.newIndex + 1)
      Rails.ajax({
        url: `${this.checklist}/todos/${this.todos[event.oldIndex].id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json"
      })
    }
  },
  computed: {
    incomplete() {
      return this.todos.filter(todo => todo.complete == false)
    },

    complete() {
      return this.todos.filter(todo => todo.complete == true)
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}

.dragArea {
  min-height: 20px;
}
</style>
