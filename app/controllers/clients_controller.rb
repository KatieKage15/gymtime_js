class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destory]

  def index
    @client = Client.all
  end

  def show
    @client = Client.find(params[:id])
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.create(client_params)
      if @client.save
        redirect_to @client, notice: 'Client was successfully created.'
      else
        render :new
      end
  end

  def edit
  end

  def update
    if @client.update(client_params)
      redirect_to @client, notice: 'Client was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @client.destroy
    redirect_to clients_url, notice: 'Client was successfully destroyed.'
  end

private
  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:id, :name, :age, :goals)
  end
end
