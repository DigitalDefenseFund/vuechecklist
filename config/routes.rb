Rails.application.routes.draw do
  resources :checklists do
    resources :todos do
      member do
        patch :move
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  root to: "checklists#index"
end
