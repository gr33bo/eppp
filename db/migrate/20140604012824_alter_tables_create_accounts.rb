class AlterTablesCreateAccounts < ActiveRecord::Migration
  def up
    drop_table :devices_questions_answers

    create_table :accounts do |t|
      t.text :username
      t.text :password
      t.text :password_salt
    end


    create_table(:accounts_questions_answers) do |t|
      t.integer :account_id
      t.integer :question_id
      t.integer :answer_id

      t.timestamps
    end
  end

  def down
    drop_table :accounts_questions_answers
    drop_table :accounts
  end
end
