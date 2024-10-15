# frozen_string_literal: true
#
module ImageProxyable
  extend ActiveSupport::Concern

  PRODUCT_IMAGE_PATH = "http://localhost:3002/rails/active_storage/blobs/"

  ##
  # Forwards image requests to the relevant services.
  # Accounts for any redirects.
  #
  # @return [Faraday::Response]
  def forward_image_proxy
    response = Faraday.get("#{PRODUCT_IMAGE_PATH}#{params[:path]}")

    if response.status == 302
      redirect_url = response.headers['location']
      Faraday.get(redirect_url)
    end
  end
end