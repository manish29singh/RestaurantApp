var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
//var hbsHelpers = require('handlebars-helpers');

var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var deals = require('./routes/deals');
var restaurants = require('./routes/restaurants');
var comments = require('./routes/comment');

//api
var apiRouter = require('./routes/api');
var apiWithoutToken = require('./routes/apiWithoutToken');

//init app
var app = express();

//swagger setup
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



//handlebars helpers
var hbs = exphbs.create({
  extname: ".handlebars",
  layoutsDir: path.join(__dirname, "views/layouts/"),
 // partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'layout.handlebars',
  helpers: {
      select: require('./helpers/select'),
      serial: function(i){
      return ++i;
    }
  }
});


//view engine
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  // Connect Flash
  app.use(flash());
  
  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
  
  
  
  app.use('/', index);
  app.use('/deals', deals);
  app.use('/users', users);
  app.use('/restaurants', restaurants);
  app.use('/comments', comments);
  app.use('/api', apiWithoutToken);
  
  // Set Port
  app.set('port', (process.env.PORT || 3000));
  
  app.listen(app.get('port'), function(){
      console.log('Server started on port '+app.get('port'));
  });
