class Trail
  include MongoMapper::Document

  key :name, String

  key :length, Float

  one :path

  ensure_index [[:path, "2dsphere"]]
end
