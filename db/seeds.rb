Freelancer.destroy_all
User.destroy_all

users = User.create ([
    {
        name: "name1",
        username: "username1",
        password: "password1",
        company: "company1",
        email: "email1",
        telephone: "telephone1"
    },
    {
        name: "name2",
        username: "username2",
        password: "password2",
        company: "company2",
        email: "email2",
        telephone: "telephone2"
    },
    {
        name: "name3",
        username: "username3",
        password: "password3",
        company: "company3",
        email: "email3",
        telephone: "telephone3"
    }
    


])

freelancers = Freelancer.create ([
    {
        name: "name1",
        username: "username1",
        password: "password1",
    },
])
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?