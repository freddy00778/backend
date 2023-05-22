import {DataProvider} from "../src/data";
import {Database} from "../src/config";

exports.seed = async function() {
    const provider = await DataProvider.create()
    const games = () => provider.postgres.withSchema(Database.schema).table('Game')

            return games().insert([
                {name: "Change Management Game", instruction: "Instructions in relation to the game", no_of_rows: 4, no_of_columns: 5},
                {name: "Change Curve Game", instruction: "Instructions in relation to the game", no_of_rows: 4, no_of_columns: 5},
            ])
};

