# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).
#
# Numéro;Date Modif;Nom du Sentier;Etat;Difficulté;Km;Sous_Régions;Lien carte;Nbre secteurs;Tous secteurs=même auteur;Date sentier terminé;Remarque;Carte 25'000;Trace gps;r7;Montée
#

require 'gpx_helper'
require 'distance_helper'
require 'csv'

Trail.delete_all

count = 0

file_loc = 'db/gpx/'
source_file = 'db/DataAccess.csv'

if File.exist?(source_file)
  CSV.foreach(source_file, {:col_sep => ';'}) do |row|

    gpx = file_loc + row[0] + '.gpx'

    if File.exist?(gpx)
      coordinates = GpxHelper.parse_gpx(gpx)
      l_val = DistanceHelper.compute_total(coordinates)
      length = DistanceHelper.to_display(l_val)
      puts "#{gpx} #{coordinates.length} coordinates, length #{length}"

      date = nil
      if row[1]
        date = Date.strptime(row[1], '%m/%d/%Y')
      end   

      Trail.create(code: row[0],
                   name: row[2],
                   date: (date or ''),
                   state: (row[3] or ''),
                   diff: (row[4] or ''),
                   region: (row[6] or ''),
                   comment: (row[11] or ''),
                   map: (row[12] or ''),
                   down: row[15] && row[15].downcase == 'non',
                   length: length,
                   l_val: l_val,
                   path: Path.new( coordinates: coordinates)).save!

      count += 1
    end
  end
end
puts "Inserted #{count} trails"

jedis = ['103033479741240618049']
jedis.each do |id|
   User.find_by_uid(id).tap do |user|
     user.role = :jedi
     puts "#{user.email} became is now a master."
     user.save!
   end
end
