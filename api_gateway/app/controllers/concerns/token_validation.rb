module TokenValidation
  extend ActiveSupport::Concern

  ##
  # Validates the token in the user services. Returns related responses if the token is invalid
  # otherwise if sets the current user.
  #
  def validate_token_user_service
    render json: { status: { code: 401, message: 'Missing token' } }, status: :unauthorized unless extract_token_from_header.present?

    response = Faraday.post('http://localhost:3000/validate_token') do |req|
      common_request_headers(req)
    end

    @current_user = JSON.parse(response.body)["status"]["user"]["data"] if response.status == 200
    render json: { status: { code: 401, message: 'Invalid token' } }, status: :unauthorized if response.status != 200
  end

  ##
  # Retrieves the token from the request header. Returns the token, else nil.
  #
  # @return [String, nil]
  def extract_token_from_header
    auth_header = request.headers['Authorization']
    auth_header.present? && auth_header.start_with?('Bearer ') ? auth_header.split(' ').last : nil
  end
end