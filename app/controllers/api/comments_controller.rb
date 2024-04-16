class Api::CommentsController < ApplicationController
  def index
    @seismic_dato = SeismicDato.find_by(id: params[:feature_id])
    if @seismic_dato.nil?
      render json: { error: 'SeismicDato not found' }, status: :not_found
    else
      @comments = @seismic_dato.comments
      render json: @comments
    end
  end
    
    def create
        @seismic_dato = SeismicDato.find(params[:feature_id])
        @comment = @seismic_dato.comments.create(comment_params)
        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end
    
      private
    
      def comment_params
        params.require(:comment).permit(:body)
      end
end
