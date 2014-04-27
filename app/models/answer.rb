class Answer < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :question


  attr_accessible :question_id, :answer_identifier, :is_correct_answer, :answer_text
end
