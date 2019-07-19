class User < ApplicationRecord
  has_secure_password
  validates :name, :email, :password, presence: true
  validates :email, uniqueness: true
  validates :password, confirmation: true
  has_many :instructors
end
