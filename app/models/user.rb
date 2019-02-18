class User < ApplicationRecord
    has_many :bookings
    has_many :freelancers, through: :bookings
end
