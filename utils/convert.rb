#!/usr/bin/ruby

require 'json'

ARGV.each do|a|
	
	json_array = []

	File.open(a, "r"){ |file| 
   file.readlines.each_with_index do |line, idx|
      line.gsub(/lat="(.*)" lon="(.*)"/) do
      	coord = {lat: $1.to_f, lng: $2.to_f}
      	json_array << coord
			end
   end
	}
	File.open(a.gsub(/gpx/, "json"), "w"){ |file|
    file.write(json_array.to_json)
	}
 
end
