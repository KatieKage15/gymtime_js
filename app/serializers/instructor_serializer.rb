class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio 
  has_many :clients
end
