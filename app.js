const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();
const events = [];

app.use(bodyParser.json());

app.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`MONGODB URL`).then(()=>{
    
    app.listen('3000',() => {
       console.log('Server running on port 3000'); 
    });
    
}).catch(err => {
    console.log("ERROR ",err);
});

