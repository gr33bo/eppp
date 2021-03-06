class Question < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :exam
  belongs_to :category

  has_many :answers
  has_many :reports


  attr_accessible :question_number, :question_text, :category_id, :answer_explanation, :exam_id
end
