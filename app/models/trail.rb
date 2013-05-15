class Trail
  include MongoMapper::Document

  key :name, String

  one :path

  ensure_index [[:path, "2dsphere"]]
end
