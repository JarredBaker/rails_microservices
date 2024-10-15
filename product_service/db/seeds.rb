Product.destroy_all

product_data = [
  { name: 'Product 1', description: 'Description for product 1', image: 'image_one.jpg', price_cents: 5000, user_id: "c2e61ca1-c75d-4aa7-8b15-8620adad7f8b", stock_quantity: 3 },
  { name: 'Product 2', description: 'Description for product 2', image: 'image_two.jpg', price_cents: 2000, user_id: "c2e61ca1-c75d-4aa7-8b15-8620adad7f8b", stock_quantity: 1 },
  { name: 'Product 3', description: 'Description for product 3', image: 'image_three.jpg', price_cents: 9000, user_id: "c2e61ca1-c75d-4aa7-8b15-8620adad7f8b", stock_quantity: 10 },
]

product_data.each do |data|
  begin
    image_file_path = File.join(Rails.root.join('db', 'seeds', 'images'), data[:image].to_s)

    product = Product.create(data.except(:image))

    begin
      product.image.attach(io: File.open(image_file_path), filename: data[:image].to_s)
      product.save!
    rescue => e
      puts "Error attaching image for #{data[:name]}. Error: #{e.message}"
    end
  rescue => e
    puts "Error creating product or attaching image for #{data[:name]}. Error: #{e.message}"
  end
end
