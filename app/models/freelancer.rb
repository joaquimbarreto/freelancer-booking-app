class Freelancer < ApplicationRecord
    
    has_secure_password

    has_many :bookings
    has_many :users, through: :bookings
end
