class InstructorsController < ApplicationController

  before_action :set_instructor, only: [:show, :edit, :update, :destroy]

  def index
    @instructor = Instructor.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @instructor}
    end
  end

  def show
    @instructor = Instructor.find(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @instructor}
    end
  end

  def new
    @instructor = Instructor.new
  end

  def edit

  end

  def create
    @instructor = Instructor.new(instructor_params)
    if @instructor.save
      respond_to do |f|
        f.html {redirect_to @instructor, notice: 'Instructor was successfully created.'}
        f.json {render json: @instructor}
      end
    else
      render :new
    end
  end

  def update
    if @instructor.update(instructor_params)
      respond_to do |f|
        f.html {redirect_to @instructor, notice: 'Instructor was successfully updated.'}
        f.json {render json: @instructor}
      end
    else
      render :edit
    end
  end


  def destroy
    @instructor.destroy
    respond_to do |f|
      f.html {redirect_to instructors_url, notice: 'Instructor was successfully destroyed.'}
      f.json {head :no_content}
    end
  end

  private

    def set_instructor
      @instructor = Instructor.find(params[:id])
    end

    def post_params
      params.require(:instructor).permit(:name, :bio)
    end
end
