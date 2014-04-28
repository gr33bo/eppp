class AddReportedProblemToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :problem_reported, :boolean
  end
end
