const epxress = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const userRoute = require('./routes/userRoute');
const app = epxress();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',app.use(epxress.static('client/login_view')));
app.use('/user',userRoute);
app.listen(config.port,'localhost',()=>{
  console.log(`Now listening on port ${config.port}`);
});