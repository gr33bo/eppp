class AddFields < ActiveRecord::Migration
  def up
    add_column :answers, :answer_identifier, :text
 
    create_table :categories do |t|
      t.text :name
    end

    add_column :questions, :category_id, :integer
    add_column :questions, :answer_explanation, :text
  end

  def down
    remove_column :questions, :category_id
    drop_table :categories
    remove_column :answers, :answer_identifier
    remove_column :questions, :answer_explanation
  end
end
