class Note < ApplicationRecord
  belongs_to :group, optional: true
  belongs_to :user

  validates :title, presence: true, length: { maximum: 255 }
end
