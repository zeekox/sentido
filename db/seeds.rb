# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).

require 'nokogiri'

Trail.delete_all

count = 0

file_loc = 'db/gpx'

def parse_gpx(file)
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

Dir.glob(file_loc + '/*.gpx') do |gpx|

  coordinates = []

  File.open(gpx, "r"){ |file| 

    coordinates = parse_gpx(file)

    puts "#{gpx} #{coordinates.length} coordinates"
    
    Trail.create( name: gpx.gsub(/#{file_loc}\/(.*)\.gpx/, '\\1'),
                 path: Path.new( coordinates: coordinates)).save!


    count += 1
  }
end

puts "Inserted #{count} trails"
