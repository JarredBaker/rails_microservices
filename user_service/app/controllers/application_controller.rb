class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :restrict_origin

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar])
  end

  # Only allow requests from localhost:3001 (This is the API Gateway... we don't want direct external access TODO: improve this using network request IP blocking)
  def restrict_origin
    api_key = request.headers['X-Api-Key']
    allowed_keys = ["als234qdscasdafasdfasdcaklncpiUASCGLKabcso3onSSKJADCNKASDBCJAKVkhsjvcaCScdjnasdncj03"] # TODO: store this securely

    unless allowed_keys.include?(api_key)
      render json: { error: 'Forbidden' }, status: 403
    end
  end
end
