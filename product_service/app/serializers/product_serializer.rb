class ProductSerializer
  include JSONAPI::Serializer
  include MoneyRails
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :stock_quantity

  attribute :price do |prod|
    prod.price.format
  end

  attribute :raw_price do |prod|
    prod.price
  end

  attribute :image_url do |prod|
    # ActiveStorage::Current.host = "http://localhost:3000"
    if prod.image.attached?
      Rails.application.routes.url_helpers.url_for(prod.image)
    else
      nil
    end
  end
end
