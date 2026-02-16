class Note < ApplicationRecord
  belongs_to :group, optional: true

  validates :title, presence: true, length: { maximum: 255 }
end
