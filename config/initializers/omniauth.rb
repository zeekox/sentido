OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '181717409328-kocpk45ke2ch9575p94u2o5h2chdk9a9.apps.googleusercontent.com', 'n25t7kzA1ZFKGWfHaY1p7Hr7', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
