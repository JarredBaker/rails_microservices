# frozen_string_literal: true
#
module Proxyable
  extend ActiveSupport::Concern

  SERVICE_MAPPING = {
    users: 'http://localhost:3000',
    products: 'http://localhost:3002',
    orders: 'http://localhost:3003'
  }

  ##
  # Performs our internal service request if all request preparation and security checks pass.
  #
  # @return [Faraday::Response]
  def proxy_request
    merged_body = prepare_request_body
    service_url = determine_service_url

    Faraday.send(request.method.downcase) do |req|
      req.url "#{service_url}#{request.fullpath}"
      common_request_headers(req)
      req.body = merged_body.to_json
    end
  end

  private

  ##
  # Returns the service url based on the service name found in the request path.
  # If no service is found we return an error.
  #
  # @return [String]
  def determine_service_url
    SERVICE_MAPPING.fetch(get_service_from_path) { service_not_found }
  end

  ##
  # Retrieves the service name from the path as a symbol.
  # Used in the service_mapping hash.
  #
  # @return [Symbol, nil]
  def get_service_from_path
    request.fullpath.split('/')[1]&.to_sym
  end

  ##
  # Returns the related service not found error.
  def service_not_found
    render json: { error: 'Service not found' }, status: 404
  end

  ##
  # Sets the common request header for out inter service requests.
  # Addition of the X-Api-Key to block requests made directly to our services that haven't gone through our
  # api gateway.
  #
  # @param [Faraday::Connection] req object
  def common_request_headers(req)
    req.headers['Content-Type'] = 'application/json'
    req.headers['X-Api-Key'] = "als234qdscasdafasdfasdcaklncpiUASCGLKabcso3onSSKJADCNKASDBCJAKVkhsjvcaCScdjnasdncj03"
    req.headers['Authorization'] = request.headers['Authorization'] if request.headers['Authorization'].present?
  end

  ##
  # Merges the user data retrieved through the token validation service into the request body for access in
  # internal services.
  # Ensures the user object cannot be passed from the UI.
  #
  # @return [Hash] the request body.
  def prepare_request_body
    if %w[post put patch].include?(request.method.downcase)
      existing_body = JSON.parse(request.body.read || "{}")

      # [SECURITY] Remove any user data passed from the UI. We want to fetch this manually when checking the token validity.
      whitelisted_route? ? existing_body : existing_body.except('user').merge(user: @current_user)
    else
      { user: @current_user }
    end
  end
end