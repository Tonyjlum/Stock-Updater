class V1::UsersController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    render json: @users
  end

  def login
    @user = User.find_by(email: user_params["email"], password: user_params["password"])
    if @user
      render json: @user
    else
      render json: {id:0, errors: "Incorrect email or password. Please try again."}
    end

  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    params["email"] = email_downcase(params["email"])
    @user = User.create(user_params)
    if @user.id
      render json: {id: @user.id}
    else
      render json: {id:0, errors: "Email address already in use. Please login or make use a different email."}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

  def email_downcase(email)
    email.downcase
  end

end
