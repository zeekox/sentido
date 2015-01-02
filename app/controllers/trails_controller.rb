class TrailsController < ApplicationController

  def around
    authorize Trail.new, :show?
    @sw_lon = Float(params[:sw_lon])
    @sw_lat =  Float(params[:sw_lat])
    @ne_lon = Float(params[:ne_lon])
    @ne_lat =  Float(params[:ne_lat])

    @nw = [@sw_lon, @ne_lat]
    @ne = [@ne_lon, @ne_lat]
    @se = [@ne_lon, @sw_lat]
    @sw = [@sw_lon, @sw_lat]
    
    #Polygone must be closed, so that first coordinate = last coordinate
    @trails = Trail.where(:path => {'$geoIntersects' => {  '$geometry' => { 'type' => 'Polygon', 'coordinates' => [[ @nw, @ne, @se, @sw, @nw ]] }}}).all

    respond_to do |format|
      format.html 
      format.xml {render :xml => @trails}
      format.js  {render :json => @trails}
    end
  end
end
