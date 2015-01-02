class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  helper_method :current_user
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
  end

  private

  def user_not_authorized
    puts "You are not authorized to perform this action."
    render :json => []
  end
end
