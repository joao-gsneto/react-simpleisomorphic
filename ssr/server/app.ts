import express    from 'express';
import * as path  from "path";
import routes from './routes/routes';

const app = express();

app.set("port", 3000);
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);


app.use( routes );

app.get("*", ( req, res ) => res.send( `teste 5` ) );

export default app;