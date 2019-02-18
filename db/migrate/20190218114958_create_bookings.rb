class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.datetime :date
      t.integer :total_cost
      t.integer :user_id
      t.integer :freelancer_id

      t.timestamps
    end
  end
end
