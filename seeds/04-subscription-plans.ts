import {DataProvider} from "../src/data";
import {Database} from "../src/config";
import {Game} from "../src/data/game/GameData";

exports.seed = async function() {
    const provider = await DataProvider.create()
    const games = () => provider.postgres.withSchema(Database.schema).table('Game')
    const plans = () => provider.postgres.withSchema(Database.schema).table('SubscriptionPlan')

            const game = (await games().select().orderBy("created_at", "asc") as Game)
            // const gameTwo = (await games().select().last() as Game)
            return plans().insert([
                {
                    name: "Change Management Game Plan",
                    price_per_person: 50,
                    price_per_person_europe: 100,
                    duration_in_days: 90,
                    game: game[0].id
                },

                {
                    name: "Change Curve Game Plan",
                    price_per_person: 150,
                    price_per_person_europe: 200,
                    duration_in_days: 90,
                    game: game[1].id
                },
            ])
}