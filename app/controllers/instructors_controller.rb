class InstructorsController < ApplicationController

  before_action :set_client, only: [:show, :edit, :update, :destroy]

  def index
    @instructor = Instructor.all
  end

  def show
    @instructor = Instructor.find(params[:id])
    render json: @instructor, status: 200
  end
end
