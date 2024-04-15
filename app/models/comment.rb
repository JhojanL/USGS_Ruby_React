class Comment < ApplicationRecord
  belongs_to :seismic_dato

  validates :body, presence: true
end
