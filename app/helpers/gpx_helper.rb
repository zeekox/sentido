require 'nokogiri'

module GpxHelper
  def self.parse_gpx(file)
    doc = Nokogiri::XML(file)
    trackpoints = doc.xpath('//xmlns:trkpt | //xmlns:rtept')
    coordinates = []

    trackpoints.each do |trkpt|
      lat = trkpt.xpath('@lat').to_s.to_f
      lon = trkpt.xpath('@lon').to_s.to_f
      #ele = trkpt.text.strip.to_f
      coordinates << [lon, lat]
    end

    coordinates.uniq
  end
end
