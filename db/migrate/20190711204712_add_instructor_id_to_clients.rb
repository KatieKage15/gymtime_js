class AddInstructorIdToClients < ActiveRecord::Migration[5.2]
  def change
    add_column :clients, :instructor_id, :integer
  end
end
