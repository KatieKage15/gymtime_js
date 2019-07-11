class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :goals
  belongs_to :instructor 
end
