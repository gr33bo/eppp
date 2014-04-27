class AlterExamTables < ActiveRecord::Migration
  def up
    drop_table :devices_exams_questions_answers
    drop_table :devices_exams

    remove_column :devices, :device_id
    add_column :devices, :uuid, :text
    add_column :devices, :platform, :text

    create_table(:timed_exams) do |t|
      t.integer :device_id
      t.integer :exam_id
      t.integer :time_taken
      t.timestamps
    end

    create_table(:devices_questions_answers) do |t|
      t.integer :device_id
      t.integer :question_id
      t.integer :answer_id
      t.integer :timed_test_id #optional
    end
  end

  def down
  end
end
