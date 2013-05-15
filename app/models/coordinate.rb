class Coordinate
  include MongoMapper::EmbeddedDocument

  key :type, String, :default => 'LineString'
  key :coordinates, Array

  #belongs_to :trail
end
