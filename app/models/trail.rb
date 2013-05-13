class Trail
  include MongoMapper::Document

  key :name, String

  many :coordinates
end
