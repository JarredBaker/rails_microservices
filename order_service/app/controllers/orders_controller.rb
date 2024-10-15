class OrdersController < ApplicationController

  ##
  # Retrieves the Orders and related product for a given user.
  #
  def index
    user_orders = Order.where(user_id: user_params[:id])
    products = ProductService.new(request).get_related_products(user_orders)
    render json: { status: 'success', data: OrderSerializer.new(user_orders, { params: { products: products["data"] } }).serializable_hash[:data] }, status: :ok
  end

  ##
  # Creates a product order. Sends requests to the product service to check stock count and update
  # it if the order is successful and there is enough stock.
  #
  def create
    product_id = create_params[:product_id]
    quantity = create_params[:quantity].to_i
    product_service = ProductService.new(request)

    stock_check_response = product_service.check_product_stock(product_id, quantity)
    return render json: { status: 'error', error: 'Insufficient stock to fulfill the order.' }, status: :unprocessable_entity unless stock_check_response[:available]

    order = Order.create!(create_params.merge(user_id: user_params[:id]))
    return render json: { status: 'error', errors: order.errors.full_messages }, status: :unprocessable_entity unless order.persisted?

    stock_update_response = product_service.update_product_stock(product_id, quantity)

    if stock_update_response[:success]
      render json: { status: 'success', order: order }, status: :created
    else
      order.destroy
      render json: { error: 'Failed to update stock. Order has been rolled back.' }, status: :unprocessable_entity
    end
  end

  private

  def create_params
    params.require(:order).permit(
      :product_id,
      :user_id,
      :quantity,
    )
  end

  def user_params
    params.require(:user).permit(
      :id, :name, :email
    )
  end
end
