class RemoveDateTotalCostFromBookings < ActiveRecord::Migration[5.2]
  def change
    remove_column :bookings, :date, :datetime
    remove_column :bookings, :total_cost, :integer
  end
end
