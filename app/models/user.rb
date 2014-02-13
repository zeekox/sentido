class User
  include MongoMapper::Document

  attr_accessible :identity_url
end
