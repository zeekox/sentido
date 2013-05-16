# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).

Trail.delete_all

count = 0

file_loc = 'db/gpx'

Dir.glob(file_loc + '/*.gpx') do |gpx|
  
  coordinates = []

  File.open(gpx, "r"){ |file| 
    file.readlines.each_with_index do |line, idx|

      line.gsub(/lat="(.*)" lon="(.*)"/) do

        coord = [$2.to_f, $1.to_f]

        coordinates << coord

      end
    end


    Trail.create( name: gpx.gsub(/#{file_loc}\/(.*)\.gpx/, '\\1'),
                 path: Path.new( coordinates: coordinates)).save!

                 
     count += 1
  }
end

puts "Inserted #{count} trails"
