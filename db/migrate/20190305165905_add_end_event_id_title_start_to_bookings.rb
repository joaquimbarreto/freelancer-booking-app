class AddEndEventIdTitleStartToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :end, :string
    add_column :bookings, :event_id, :string
    add_column :bookings, :title, :string
    add_column :bookings, :start, :string
  end
end
