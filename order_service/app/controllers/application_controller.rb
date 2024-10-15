# frozen_string_literal: true
#
class ApplicationController < ActionController::API
  before_action :restrict_origin

  ALLOWED_KEYS = ["als234qdscasdafasdfasdcaklncpiUASCGLKabcso3onSSKJADCNKASDBCJAKVkhsjvcaCScdjnasdncj03"]

  protected

  ##
  # Checks the request header for the X-Api-Key. If present and matched the request is allowed.
  # Otherwise we return a forbidden error.
  #
  # This ensures users can't directly access our services. (IP blocking in production is preferred)
  #
  def restrict_origin
    api_key = request.headers['X-Api-Key']

    unless ALLOWED_KEYS.include?(api_key)
      render json: { error: 'Forbidden' }, status: 403
    end
  end
end