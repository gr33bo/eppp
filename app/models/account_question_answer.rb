class AccountQuestionAnswer < ActiveRecord::Base
  self.table_name = 'accounts_questions_answers'

  attr_accessible :question_id, :answer_id, :account_id
end
