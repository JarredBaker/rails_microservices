# frozen_string_literal: true

##
# Service helper used to send and retried data from the product_service.
class ProductService
  PRODUCT_SERVICE_URL = "http://localhost:3002/products/products"

  def initialize(request)
    @request = request
  end

  ##
  # Retrieves the related products from the product service for a collection of Orders.
  #
  # @param [ActiveRecord<Orders>] user_orders
  #
  # @return [Array<Products>]
  def get_related_products(user_orders)
    response = Faraday.get(PRODUCT_SERVICE_URL) do |req|
      common_request_headers(req)
      req.body = { product_orders: { id: user_orders.pluck(:product_id) } }.to_json
    end

    response.success? ? JSON.parse(response.body) : []
  end

  ##
  # Calls the product service to check the stock count. Returns the related request body.
  #
  # @param [String] product_id
  # @param [String] quantity
  #
  # @return [Hash]
  def check_product_stock(product_id, quantity)
    response = Faraday.get("#{PRODUCT_SERVICE_URL}/#{product_id}/check_stock", product: { id: product_id, quantity: quantity }) do |req|
      common_request_headers(req);
    end

    JSON.parse(response.body, symbolize_names: true)
  end

  ##
  # Calls the product service to update the stock count. Returns the related request body.
  #
  # @param [String] product_id
  # @param [String] quantity
  #
  # @return [Hash]
  def update_product_stock(product_id, quantity)
    response = Faraday.post("#{PRODUCT_SERVICE_URL}/#{product_id}/update_stock") do |req|
      common_request_headers(req)
      req.body = { product: { id: product_id, quantity: quantity } }.to_json
    end

    JSON.parse(response.body, symbolize_names: true)
  end

  private

  ##
  # Sets the common request header for out inter service requests.
  # Addition of the X-Api-Key to block requests made directly to our services that haven't gone through our
  # api gateway.
  #
  # @param [Faraday::Connection] req object
  def common_request_headers(req)
    req.headers['Content-Type'] = 'application/json'
    req.headers['X-Api-Key'] = "als234qdscasdafasdfasdcaklncpiUASCGLKabcso3onSSKJADCNKASDBCJAKVkhsjvcaCScdjnasdncj03" # TODO: store this securely
    req.headers['Authorization'] = @request.headers['Authorization'] if @request.headers['Authorization'].present?
  end
end