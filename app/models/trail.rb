class Trail
  include MongoMapper::Document

  key :name, String

  key :l_val, Float

  key :length, String
  
  one :path

  ensure_index [[:path, "2dsphere"]]
end
