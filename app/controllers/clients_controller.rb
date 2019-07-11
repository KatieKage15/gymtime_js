class ClientsController < ApplicationController

  before_action :set_client, only: [:show, :edit, :update]

  def index
    @client = Client.all
    render json: @client, status: 200
  end

  def show
    @client = Client.find(params[:id])
    render json: @client, status: 200
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.create(client_params)
    @client.save
    render json: @client, status: 201
  end

  def edit
  end

  def update
    @client.update(client_params)
    render json: @client, status: 202
  end

private
  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :age, :goals)
  end
end
