class Path
  include MongoMapper::EmbeddedDocument

  key :type, String, :default => 'LineString'
  key :coordinates, Array
end
