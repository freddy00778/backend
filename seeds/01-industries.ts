import {DataProvider} from "../src/data";
import {Database} from "../src/config";

exports.seed = async function() {
  const provider = await DataProvider.create()
  const industries = () => provider.postgres.withSchema(Database.schema).table('Industry')
  const functions = () => provider.postgres.withSchema(Database.schema).table('Function')
    return industries().insert([
          { name: 'Hospitality'},
          { name: 'Human Resources'},
          { name: 'Insurance'},
          { name: 'Law'},
          { name: 'Manufacturing'},
          { name: 'Non-Profit'},
          { name: 'Pharmaceutical'},
          { name: 'Public Affairs'},
          { name: 'Real Estate'},
          { name: 'Recreation/Parks/Sports'},
          { name: 'Religion'},
          { name: 'Research'},
          { name: 'Retail/Merchandising'},
          { name: 'Sciences'},
          { name: 'Social/Human Services'},
          { name: 'Technology'},
          { name: 'Telecommunications'},
          { name: 'Transportation'},
          { name: 'Travel and Tourism'},
          { name: 'Union'},
        ]).then(()=>{
                  return functions().insert([
                      {name: "Accounting/Finance"},
                      {name: "Administrative/Clerical"},
                      {name: "Contract/Freelance"},
                      {name: "Consultant"},
                      {name: "Customer Service"},
                      {name: "Education"},
                      {name: "Engineering/Product Development"},
                      {name: "Executive"},
                      {name: "Facilities"},
                      {name: "Government Affairs"},
                      {name: "Human Resources"},
                      {name: "Information Technology"},
                      {name: "Legal"},
                      {name: "Management"},
                      {name: "Manufacturing"},
                      {name: "Marketing"},
                      {name: "Non Profit"},
                      {name: "Operations"},
                      {name: "Professional Services"}
                  ])
              })
};
