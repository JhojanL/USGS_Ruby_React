class Api::CommentsController < ApplicationController
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
