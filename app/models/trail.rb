class Trail
  include MongoMapper::Document

  key :name, String

  one :coordinate

  ensure_index [[:coordinate, "2dsphere"]]
end
