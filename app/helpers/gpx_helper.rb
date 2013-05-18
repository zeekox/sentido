require 'nokogiri'

module GpxHelper

  ##  
  # Parse the given gpx file given its path, and return an Array of Arrays containing longitude first then latitude.
  def self.parse_gpx(gpx)

    coordinates = []
    
    File.open(gpx, "r"){ |file| 
      doc = Nokogiri::XML(file)
      trackpoints = doc.xpath('//xmlns:trkpt | //xmlns:rtept')

      trackpoints.each do |trkpt|
        lat = trkpt.xpath('@lat').to_s.to_f
        lon = trkpt.xpath('@lon').to_s.to_f
        #ele = trkpt.text.strip.to_f
        coordinates << [lon, lat]
      end
    }

    coordinates.uniq
  end
end
