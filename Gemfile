source 'https://rubygems.org'

gem 'rails', '3.2.13'
gem "mongo_mapper"
gem 'bson_ext'
gem "omniauth-google-oauth2", "~> 0.2.1"
gem 'enumerize'

# Needs
# sudo apt-get install libxslt-dev libxml2-dev
gem 'nokogiri'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

group :development, :test do
  gem 'rspec-rails', '~> 2.0'
end

# Heroku logging
gem 'rails_12factor', group: :production
ruby '1.9.3'
