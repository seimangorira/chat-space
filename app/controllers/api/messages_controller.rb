class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.where("id > ?", params[:id]).where(group_id: params[:group_id])
    respond_to do |format|
      format.html
      format.json
    end
  end
end