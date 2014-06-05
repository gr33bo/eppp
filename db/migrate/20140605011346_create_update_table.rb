class CreateUpdateTable < ActiveRecord::Migration
  def up
    
    create_table(:updates) do |t|
      t.text :update_explanation
      t.timestamps
    end
  end

  def down
    drop_table :updates
  end
end
