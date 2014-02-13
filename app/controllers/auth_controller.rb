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
end
