# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).

require 'gpx_helper'
require 'distance_helper'

Trail.delete_all

count = 0

file_loc = 'db/gpx'

Dir.glob(file_loc + '/*.gpx') do |gpx|

  coordinates = GpxHelper.parse_gpx(gpx)

  l_val = DistanceHelper.compute_total(coordinates)
  
  length = DistanceHelper.to_display(l_val)

  puts "#{gpx} #{coordinates.length} coordinates, length #{length}"


  Trail.create( name: gpx.gsub(/#{file_loc}\/(.*)\.gpx/, '\\1'),
               length: length,
               l_val: l_val,
               path: Path.new( coordinates: coordinates)).save!


  count += 1
end

puts "Inserted #{count} trails"
