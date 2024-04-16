namespace :seismic do
    desc "Fetch seismic data from USGS"
    task fetch: :environment do
      require 'open-uri'
      require 'json'
  
      # Check if we already have data for the last 30 days
      last_data_date = SeismicDato.order(time: :desc).first&.time&.to_date
      if last_data_date.nil? || last_data_date < Date.today
        # If we don't have data for the last 30 days, fetch it
        start_date = last_data_date ? last_data_date + 1.day : 30.days.ago.to_date
        url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=#{start_date.strftime('%F')}&endtime=#{Date.today.strftime('%F')}"
        data = JSON.parse(URI.open(url).read)
  
        data['features'].each do |feature|
          # Extract the required data from the feature
          external_id = feature['id']
          magnitude = feature['properties']['mag']
          place = feature['properties']['place']
          time = Time.at(feature['properties']['time'] / 1000)
          url = feature['properties']['url']
          tsunami = feature['properties']['tsunami']
          mag_type = feature['properties']['magType']
          title = feature['properties']['title']
          longitude = feature['geometry']['coordinates'][0]
          latitude = feature['geometry']['coordinates'][1]
  
          # Check if the data already exists in the database and if required fields are not null
          unless SeismicDato.exists?(external_id: external_id) || title.nil? || url.nil? || place.nil? || mag_type.nil? || longitude.nil? || latitude.nil?
            # If the data does not exist and required fields are not null, create it
            SeismicDato.create(
              external_id: external_id,
              magnitude: magnitude,
              place: place,
              time: time,
              url: url,
              tsunami: tsunami,
              mag_type: mag_type,
              title: title,
              longitude: longitude,
              latitude: latitude
            )
          end
        end

        # Delete data older than 30 days
        SeismicDato.where('time < ?', 30.days.ago).destroy_all
      end
    end
  end