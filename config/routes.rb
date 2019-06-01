Rails.application.routes.draw do
  devise_for :users
  get "/" => "messages#index"
end
