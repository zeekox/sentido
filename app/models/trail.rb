class Trail
  include MongoMapper::Document

  key :code, String

  key :name, String

  key :date, Date

  key :l_val, Float

  key :length, String
  
  key :state, String
  
  key :diff, String
  
  key :region, String
  
  key :comment, String

  key :map, String

  key :down, Boolean
  
  one :path

  ensure_index [[:path, "2dsphere"]]
end
