class ProductsController < ApplicationController
  before_action :get_product, only: [:check_stock, :update_stock]

  respond_to? :json

  ##
  # Retrieves the products for a specific user otherwise all products for the index page.
  #
  def index
    products = params[:product_orders].present? ? Product.where(id: index_params[:id]) : Product.all
    render json: {
      status: { code: 200 },
      data: ProductSerializer.new(products).serializable_hash[:data]
    }
  end

  ##
  # Checks the available stock count for a specific order request.
  #
  def check_stock
    if @product.stock_quantity >= stock_update_params[:quantity]
      render json: { available: true }
    else
      render json: { available: false }, status: :unprocessable_entity
    end
  end

  ##
  # Updates the stock count once an order has been placed. Returns related errors if the stock has since changed.
  #
  def update_stock
    quantity = stock_update_params[:quantity]
    return render json: { error: 'Insufficient stock' }, status: :unprocessable_entity unless @product.stock_quantity >= quantity

    if @product.update(stock_quantity: @product.stock_quantity - quantity)
      render json: { success: true, new_stock: @product.stock_quantity }
    else
      render json: { error: @product.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def stock_update_params
    params.require(:product).permit(:id, :quantity).tap do |param|
      param[:quantity] = param[:quantity].to_i
    end
  end

  def index_params
    params.require(:product_orders).permit(id: [])
  end

  def get_product
    @product = Product.find(stock_update_params[:id])
  end
end