# app/controllers/gateway_controller.rb
#
class GatewayController < ApplicationController
  before_action :validate_token_user_service, unless: :whitelisted_route?, only: :proxy
  include Proxyable
  include ImageProxyable
  include TokenValidation

  ##
  # Entry point to the microservice. Performs related forwarding, validation and result set processing.
  #
  def proxy
    response = proxy_request
    headers['Authorization'] = response.headers['Authorization'] if response.headers['Authorization'].present?

    if response.body.blank?
      render json: { error: 'Something went wrong, please try again later.' }, status: :unprocessable_entity
    else
      render json: JSON.parse(response.body || "{}"), status: response.status
    end

  rescue Faraday::ConnectionFailed
    render json: { error: 'Service unavailable' }, status: 503
  end

  ##
  # Entry point for image access. Forwards the request's the the related service and
  # sends the image data back to the user.
  def proxy_image
    response = forward_image_proxy

    if response.success?
      send_data response.body, type: response.headers['Content-Type'], disposition: 'inline'
    else
      render json: { error: 'Image not found' }, status: :not_found
    end
  end

  private

  ##
  #  Whitelisted urls that are excluded from token based authentication.
  def whitelisted_route?
    whitelisted_paths = %w[/users/logout /users/login /users/signup]
    whitelisted_paths.include?(request.path)
  end
end
