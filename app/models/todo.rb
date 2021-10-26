class Todo < ApplicationRecord
  belongs_to :checklist

  acts_as_list scope: :checklist
end
