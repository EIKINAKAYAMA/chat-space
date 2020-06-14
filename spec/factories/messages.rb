FactoryBot.define do

  factory :message do
    content  {Faker::Superhero.name}
    image    {File.open("#{Rails.root}/public/images/IMG_1623.jpg")}
    user
    group
  end

end