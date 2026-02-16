class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.string :title, null: false, limit: 255
      t.text :content
      t.references :group, foreign_key: true, null: true

      t.timestamps
    end

    add_index :notes, :updated_at
  end
end
