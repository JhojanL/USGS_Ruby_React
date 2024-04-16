class SeismicDato < ApplicationRecord
    has_many :comments, dependent: :destroy
end
