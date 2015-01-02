class User
  include MongoMapper::Document
  extend Enumerize

  def self.from_omniauth(auth)
    find_or_create_by_provider_and_uid(auth.provider, auth.uid).tap do |user|
      user.name = auth.info.name
      user.email = auth.info.email
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  key :uid, String
  key :name, String
  key :email, String
  key :provider, String
  key :oauth_token, String
  key :oauth_expires_at, Time
  key :role
  enumerize :role, in: [:human, :jedi], default: :human

  def jedi?
    role.jedi?
  end
end
