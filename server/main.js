import express from 'express';

import schema from './schema';
import {
  graphql
} from 'graphql';
import bodyParser from 'body-parser';

let PORT = process.env.PORT || 3000;
let app = express();

// parse POST body as text
app.use(bodyParser.text({
  type: 'application/graphql'
}));

app.post('/graphql', (req, res) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    });
});

let server = app.listen(PORT, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`GraphQL listening at http://${host}:${port}`);
})
