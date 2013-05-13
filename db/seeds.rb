# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# '<,'>s/\(\d*\.\d*\),\(\d\.\d*\)/Coordinate.create( lat: \1, lon: \2)/

first_trail = Trail.create( name: 'Moutier', coordinates: [
Coordinate.new( lat: 47.28485, lon: 7.371805),
Coordinate.new( lat: 47.284369, lon: 7.371665),
Coordinate.new( lat: 47.284223, lon: 7.371987),
Coordinate.new( lat: 47.284092, lon: 7.372159),
Coordinate.new( lat: 47.284092, lon: 7.373159),
Coordinate.new( lat: 47.284392, lon: 7.374159)
])
