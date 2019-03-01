Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :bookings
  resources :freelancers
  resources :users
  post 'signin', to: 'users#signin'
  post 'signup', to: 'users#signup'
  get 'validate', to: 'users#validate'
end
