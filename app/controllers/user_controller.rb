class UserController < ApplicationController
  respond_to :json
  def index
    if current_user.nil?
      info = {:logged_in => false, :login_url => "/auth/google_oauth2"}
    else
      info = {:logged_in => true, :name => current_user.name, :email => current_user.email, :logout_url => "/signout"}
    end
    respond_with info
  end
end
