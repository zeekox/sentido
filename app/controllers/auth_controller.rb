include SessionsHelper

class AuthController < ApplicationController

	before_filter :authenticate, :except => [:user, :login]

	def user
		response = { :current_user => current_user }
		render :json => response
	end		

	def login
		SessionsController.create
	end

  def sign_in(user)
    cookies.permanent[:remember_token] = user.remember_token
    self.current_user = user
    redirect_to dashboard_url
  end

  def logout
    SessionsHelper.current_user= nil
    cookies.delete(:remember_token)
    render :json => { :status => 'ok' }
  end
end
