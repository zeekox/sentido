# haversine formula to compute the great circle distance between two points given their latitude and longitudes
#
# Copyright (C) 2008, 360VL, Inc
# Copyright (C) 2008, Landon Cox
#
# http://www.esawdust.com (Landon Cox)
# contact:
# http://www.esawdust.com/blog/businesscard/businesscard.html
#
# LICENSE: GNU Affero GPL v3
# The ruby implementation of the Haversine formula is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License version 3 as published by the Free Software Foundation.  
#
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the 
# implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public 
# License version 3 for more details.  http://www.gnu.org/licenses/
#
# Landon Cox - 9/25/08
# 
# Notes:
#
# translated into Ruby based on information contained in:
#   http://mathforum.org/library/drmath/view/51879.html  Doctors Rick and Peterson - 4/20/99
#   http://www.movable-type.co.uk/scripts/latlong.html
#   http://en.wikipedia.org/wiki/Haversine_formula
#
# This formula can compute accurate distances between two points given latitude and longitude, even for 
# short distances.

# PI = 3.1415926535
RAD_PER_DEG = 0.017453293  #  PI/180

# the great circle distance d will be in whatever units R is in

#Rmiles = 3956           # radius of the great circle in miles
Rkm = 6371              # radius in kilometers...some algorithms use 6367
#Rfeet = Rmiles * 5282   # radius in feet
Rmeters = Rkm * 1000    # radius in meters


=begin rdoc
given two lon/lat points, compute the distance between the two points using the haversine formula
=end
module DistanceHelper


  def self.compute(lon1, lat1, lon2, lat2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    dlon_rad = dlon * RAD_PER_DEG 
    dlat_rad = dlat * RAD_PER_DEG

    lat1_rad = lat1 * RAD_PER_DEG

    lat2_rad = lat2 * RAD_PER_DEG


    a = (Math.sin(dlat_rad/2))**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * (Math.sin(dlon_rad/2))**2
    c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a))

    #dMi = Rmiles * c          # delta between the two points in miles
    #dKm = Rkm * c             # delta in kilometers
    #dFeet = Rfeet * c         # delta in feet

    Rmeters * c     # delta in meters
  end

  def self.compute_total(lonlats)

    total = 0.0
    lon = 0.0
    lat = 0.0

    lonlats.each_with_index { |ll, idx|
      if (idx != 0)
        total += compute(lon, lat, ll[0], ll[1])
      end

      lon = ll[0]
      lat = ll[1]
    }

    total.round(0)

  end

  def self.to_display(distance)
    if (distance < 1000)
      "#{distance}m"
    else
      km = distance/1000.0
      "#{km.round(1)}km"
    end
  end
end
