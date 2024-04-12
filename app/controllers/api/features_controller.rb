require 'rake'
class Api::FeaturesController < ApplicationController
    def index
        # Fetch the seismic data
        Rails.application.load_tasks
        Rake::Task['seismic:fetch'].invoke

        mag_types = params[:mag_type]
        page = params[:page] || 1
        per_page = params[:per_page] ? [params[:per_page].to_i, 1000].min : 25
  
        seismic_data = SeismicDato.all
        seismic_data = seismic_data.where(mag_type: mag_types) if mag_types.present?
        seismic_data = seismic_data.page(page).per(per_page)
  
        render json: { data: ActiveModelSerializers::SerializableResource.new(seismic_data, each_serializer: SeismicDatoSerializer), pagination: pagination_dict(seismic_data) }
    end
  
    private
  
    def pagination_dict(collection)
    {
        current_page: collection.current_page,
        total: collection.total_count,
        per_page: collection.limit_value
    }
    end
end
