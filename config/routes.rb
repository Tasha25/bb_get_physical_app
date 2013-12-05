BbGetPhysicalApp::Application.routes.draw do

  resources :exercises, :workouts

  root to: 'welcome#index'

end
