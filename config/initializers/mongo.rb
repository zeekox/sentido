#include MongoMapper

db_config = YAML::load(File.read(File.join(Rails.root, "/config/mongo.yml")))
#
if db_config[Rails.env] && db_config[Rails.env]['adapter'] == 'mongodb'
  mongo = db_config[Rails.env]

  if mongo['host'] && mongo['port']
    MongoMapper.connection = Mongo::Connection.new(mongo['host'], mongo['port'],:logger => Rails.logger)
  elseif mongo['uri']
    MongoMapper.connection = Mongo::Connection.new(mongo['uri'],:logger => Rails.logger)
  end

  MongoMapper.database = mongo['sentido-#{Rails.env']

  if mongo['username'] && mongo['password']
    MongoMapper.database.authenticate(mongo['username'], mongo['password'])
  end
end

if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    MongoMapper.connection.connect if forked
  end
end
