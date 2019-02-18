class CreateFreelancers < ActiveRecord::Migration[5.2]
  def change
    create_table :freelancers do |t|
      t.string :name
      t.string :username
      t.string :password

      t.timestamps
    end
  end
end
