class OrderSerializer
  include JSONAPI::Serializer

  attributes :id, :user_id, :product_id, :quantity

  attribute :status do |order|
    order.status.humanize
  end

  attribute :products do |order, params|
    params[:products].select { |product| product['id'] == order.product_id } if params[:products].present?
  end
end
