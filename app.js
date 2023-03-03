const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { postDeleteProduct } = require('./controllers/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{       // this middleware is responsibile for incoming request incoming request 
  User.findByPk(1).then(user =>{    // is funelled through only middlewares 
    req.user = user  
    next()                    // here we store the user in incoming request and user is a sequelize object
  }).catch((err)=>{
    console.log(err);
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product)

sequelize
//.sync({force: true})
.sync()                           // this sync code uptil return user is used only for sequilize purpose 
    .then(result =>{
   return User.findByPk(1)
    //console.log(result);
    // app.listen(3000);
}).then(user =>{       // at this then we get retireved user from db
 if(!user){
   return User.create({name:'max' , email: 'txt@gmail.com'})
 }
 return user // its resolving the promise here return Promise.resolve(user)
})
.then(user =>{
  // console.log(user);
   app.listen(3000);
})
.catch( err => {
    console.log(err)     
})
 // npm starts the sequilize part but its not doing anything for incoming request for that middleware app.use(user) thing
 // is responsible

