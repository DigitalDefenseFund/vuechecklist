class Checklist < ApplicationRecord
  has_many :todos, ->{ order(position: :asc) }, dependent: :destroy
end
