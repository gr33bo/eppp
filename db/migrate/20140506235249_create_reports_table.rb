class CreateReportsTable < ActiveRecord::Migration
  def up

    create_table(:reports) do |t|
      t.integer :question_id
      t.text :reason
      t.timestamps
    end
  end

  def down
  end
end
