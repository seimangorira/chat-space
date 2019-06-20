class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.where("id > ?", params[:message][:id])
  end
end