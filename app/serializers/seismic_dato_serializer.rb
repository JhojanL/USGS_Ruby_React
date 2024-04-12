class SeismicDatoSerializer < ActiveModel::Serializer
    attributes :id, :type, :feature_attributes, :links
  
    def id
      object.id
    end
  
    def type
      'feature'
    end
  
    def feature_attributes
      {
        external_id: object.external_id,
        magnitude: object.magnitude,
        place: object.place,
        time: object.time,
        tsunami: object.tsunami,
        mag_type: object.mag_type,
        title: object.title,
        coordinates: {
          longitude: object.longitude,
          latitude: object.latitude
        }
      }
    end
  
    def links
      { external_url: object.url }
    end
  end