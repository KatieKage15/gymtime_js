class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :goals, :instructor_id 
  belongs_to :instructor
end
