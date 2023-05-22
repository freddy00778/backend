import {DataProvider} from "../src/data";
import {Database} from "../src/config";

exports.seed = async function() {
    const provider = await DataProvider.create()
    // const steps = () => provider.postgres.withSchema(Database.schema).table('Step')
    const phases = () => provider.postgres.withSchema(Database.schema).table('Phase')
    const Question = () => provider.postgres.withSchema(Database.schema).table('Question')
    // const PhaseStep = () => provider.postgres.withSchema(Database.schema).table('PhaseStep')
    // const Game = () => provider.postgres.withSchema(Database.schema).table('Game')

        // return steps().insert([
        //     {name: "Step one", order: 1,},
        //     {name: "Step two", order: 2,},
        //     {name: "Step three", order: 3,},
        //     {name: "Step four", order: 4},
        //     {name: "Step five", order: 5},
        //     {name: "Step six", order: 6},
        //     {name: "Step seven", order: 7},
        //     {name: "Step eight", order: 8},
        //     {name: "Step nine", order: 9},
        //     {name: "Step ten", order: 10},
        //     {name: "Step eleven", order: 11},
        //     {name: "Step twelve", order: 12},
        //     {name: "Step thirteen", order: 13},
        //     {name: "Step fourteen", order: 14},
        //     {name: "Step fifteen", order: 15},
        //     {name: "Step sixteen", order: 16},
        //     {name: "Step seventeen", order: 17},
        //     {name: "Step eighteen", order: 18},
        //     {name: "Step nineteen", order: 19},
        //     {name: "Step twenty", order: 20},
        //
        // ])

            // .then(async() => {
                return phases().insert([
                    {
                        name: "Change Landscape",
                        description: "Change Landscape",
                        background: "Board-Design-1",
                        steps_count: 20,
                        order: 1,
                    },

                    {
                        name: "Start up",
                        description: "Start up",
                        background: "Board-Design-2",
                        steps_count: 20,
                        order: 2,
                    },

                    {
                        name: "Implementation",
                        description: "Implementation",
                        background: "Board-Design-3",
                        steps_count: 20,
                        order: 3,
                    },

                    {
                        name: "Anchoring",
                        description: "Anchoring",
                        background: "Board-Design-4",
                        steps_count: 20,
                        order: 4,
                    }
                ]).then(async() => {
                    await Question().insert([

                    ])

                    // const stepList = (await steps().select())
                    // const phase_id = (await phases().select().first()).id
                    // const game_id =  (await Game().select().first()).id
                    // const stepListArray = stepList.map((item)=> {
                    //     return  {
                    //         phase: phase_id,
                    //         step: item.id,
                    //         game: game_id,
                    //         name: item.name,
                    //         description: item.description,
                    //         video_url: "https://www.youtube.com/watch?v=4DDZBlRNdjk&t=58s",
                    //         enabled: true
                    //     }
                    // })
                    // console.log("steplistarry", stepListArray)
                    // await PhaseStep().insert(stepListArray);
                })
            // })
}

