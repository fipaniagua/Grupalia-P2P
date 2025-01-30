# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Bid.destroy_all()
Bid.create!(
    [
        {
            "owner": "Don Juan",
            "amount": 1111,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 2222,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 3333,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 4444,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 55555,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 66666,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
        {
            "owner": "Don Juan",
            "amount": 7777,
            "contact": "56990389421",
            "kind": "sell",
            "state": "open"
        },
    ]
)