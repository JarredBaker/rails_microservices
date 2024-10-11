# app/controllers/gateway_controller.rb
class GatewayController < ApplicationController
  # Proxy incoming requests to the appropriate microservice based on the URL path
  def proxy
    service_url = determine_service_url

    # Forward the incoming request to the appropriate service
    response = Faraday.send(request.method.downcase) do |req|
      req.url "#{service_url}#{request.fullpath}"
      req.headers['Content-Type'] = 'application/json'
      req.headers['X-Api-Key'] = "als234qdscasdafasdfasdcaklncpiUASCGLKabcso3onSSKJADCNKASDBCJAKVkhsjvcaCScdjnasdncj03" # TODO: store this securely
      req.headers['Authorization'] = request.headers['Authorization'] if request.headers['Authorization'].present?

      # Forward the request body (for POST, PUT, PATCH requests)
      req.body = request.body.read if %w[post put patch].include?(request.method.downcase)
    end

    if response.headers['Authorization'].present?
      headers['Authorization'] = response.headers['Authorization'] # Set the token in the response headers
    end

    # Return the user data and the status code from the User Service
    render json: JSON.parse(response.body), status: response.status
  rescue Faraday::ConnectionFailed
    render json: { error: 'Service unavailable' }, status: 503
  end

  private

  # TODO: setup docker here for the correct URLs: http://product_service:3002
  # This method determines which service URL to forward the request to based on the path
  def determine_service_url
    case request.fullpath
    when /^\/users/
      'http://localhost:3000'
    when /^\/products/
      'http://product_service:3002'
    when /^\/orders/
      'http://order_service:3003'
    else
      render json: { error: 'Service not found' }, status: 404
    end
  end
end
