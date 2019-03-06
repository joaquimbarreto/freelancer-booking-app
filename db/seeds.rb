Freelancer.destroy_all
User.destroy_all

freelancers = Freelancer.create ([
    {
        name: "name1",
        username: "username1",
        password: "password1",
    },
])
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?