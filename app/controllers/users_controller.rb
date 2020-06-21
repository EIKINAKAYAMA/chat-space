class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def index
    return nil if params[:keyword] == ""
    if params[:groupId].present?
      @group = Group.find(params[:groupId])
      @ids = @group.users.ids
      @users = User.where.not(id: @ids).where(['name LIKE ?', "%#{params[:keyword]}%"] )
    else
      @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    end
    respond_to do |format|
      # format.html
      format.json
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
