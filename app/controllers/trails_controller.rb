class TrailsController < ApplicationController
  def index

    @trails = Trail.all

    respond_to do |format|
      format.html 
      format.xml {render :xml => @trails}
      format.js  {render :json => @trails}
    end
  end

  def around

    @lon = Float(params[:lon])
    #@lon = 7.37180 #Float(params[:lon])
    @lat =  Float(params[:lat])
    #@lat =  47.28485 #Float(params[:lat])

    @trails = Trail.where(:path => {'$near' => {  '$geometry' => { 'type' => 'Point', 'coordinates' => [@lon, @lat]}}, '$maxDistance' => 100}).all

    respond_to do |format|
      format.html 
      format.xml {render :xml => @trails}
      format.js  {render :json => @trails}
    end
  end
end
