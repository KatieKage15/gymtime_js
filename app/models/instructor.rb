class Instructor < ActiveRecord::Base
  has_many :clients
end
