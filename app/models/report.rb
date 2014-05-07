class Report < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :question

  attr_accessible :question_id, :reason
end
