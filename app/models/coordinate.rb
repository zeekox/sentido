class Coordinate
  include MongoMapper::EmbeddedDocument

  key :lat, Float
  key :lon, Float
end
