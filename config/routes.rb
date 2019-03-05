Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :bookings, except: [:destroy, :create]
  delete 'delete_booking', to: 'bookings#destroy'
  post 'create_booking', to: 'bookings#create'
  resources :freelancers
  resources :users
  post 'login', to: 'users#login'
  post 'register', to: 'users#create'
  get 'validate', to: 'users#validate'
end
