#mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install --yes mongodb-org

echo "filling the local db"
rake db:seed

#depending on ruby version and how you installed ruby for ruby-dev
sudo apt-get install libxslt-dev libxml2-dev zlib1g-dev liblzma-dev ruby-dev
