class TokensController < ApplicationController
  before_action :authenticate_user_with_token!

  ##
  # If the token is valid we return a successful result containing the users data.
  #
  def validate_token
    render json: { status: { code: 200, message: 'Token is valid', user: UserSerializer.new(@current_user) } }, status: :ok
  end

  private

  ##
  # Decodes and checks token validity. If valid we set the current user else we return related errors.
  #
  def authenticate_user_with_token!
    token = request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?

    if token.present?
      begin
        decoded_token = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!, true, { algorithm: 'HS256' })
        @current_user = User.find(decoded_token[0]['sub'])
      rescue JWT::ExpiredSignature => e
        render json: { status: { code: 401, message: "Token expired: #{e.message}" } }, status: :unauthorized
      rescue JWT::DecodeError, JWT::VerificationError => e
        render json: { status: { code: 401, message: "Invalid token: #{e.message}" } }, status: :unauthorized
      end
    else
      render json: { status: { code: 401, message: 'Missing token' } }, status: :unauthorized
    end
  end
end
