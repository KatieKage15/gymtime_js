class InstructorController < ApplicationController

  def index
  end

  def show
    @instructor = Instructor.find(params[:id])
    render json: @instructor, status: 200
  end
end
