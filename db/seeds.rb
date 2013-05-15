# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# '<,'>s/\(\d*\.\d*\),\(\d\.\d*\)/Coordinate.create( lat: \1, lon: \2)/

Trail.delete_all

first_trail = Trail.create( name: 'Moutier', coordinate: Coordinate.new( coordinates: [
 [7.371805, 47.28485],
 [7.371665, 47.284369],
 [7.371987, 47.284223],
 [7.372159, 47.284092],
 [7.373159, 47.284092],
 [7.374159, 47.284392]]))

first_trail.save!
