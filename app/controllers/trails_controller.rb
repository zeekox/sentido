class TrailsController < ApplicationController
  def index

    @trails = Trail.all

    respond_to do |format|
      format.html 
      format.xml {render :xml => @trails}
      format.js  {render :json => @trails}
    end
  end
end
