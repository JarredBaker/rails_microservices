# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  include RackSessionsFix

  respond_to :json

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end

  private

  ##
  # Successful login response.
  #
  def respond_with(current_user, _opts = {})
    render json: {
      status: { code: 200, message: 'Logged in successfully.', },
      data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  ##
  # Invalidates the user token if it hasn't expired.
  # Returns related results.
  #
  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  rescue JWT::ExpiredSignature => e
    render json: {
      status: 200,
      message: 'Logged out successfully.'
    }, status: :ok
  end
end
