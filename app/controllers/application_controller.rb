include SessionsHelper

class ApplicationController < ActionController::Base
	protect_from_forgery

	before_filter :authenticate

	protected
	def authenticate
		if(!signed_in?)
			error = { :error => "Log in!" }
			render :json => error, :status => 401
		end
	end
end
