class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password
      t.string :company
      t.string :email
      t.string :telephone

      t.timestamps
    end
  end
end
