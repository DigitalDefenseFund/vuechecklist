json.extract! todo, :id, :checklist_id, :description, :position, :created_at, :updated_at
json.url checklist_todo_url(@checklist, todo, format: :json)
