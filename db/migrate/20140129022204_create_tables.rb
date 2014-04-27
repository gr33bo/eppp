class CreateTables < ActiveRecord::Migration
  def up
    create_table(:devices) do |t|
      t.text :device_id
      t.timestamps
    end

    create_table(:exams) do |t|
      t.text :name
    end

    create_table(:questions) do |t|
      t.integer :question_number
      t.text :question_text
    end

    create_table(:answers) do |t|
      t.text :answer_text
      t.boolean :is_correct_answer
    end

    create_table(:devices_exams) do |t|
      t.integer :device_id
      t.integer :exam_id
    end

    create_table(:devices_exams_questions_answers) do |t|
      t.integer :device_exam_id
      t.integer :question_id
      t.integer :answer_id
    end
  end

  def down
    drop_table :devices_exams_questions_answers
    drop_table :devices_exams
    drop_table :answers
    drop_table :questions
    drop_table :exams
    drop_table :devices
  end
end
