//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://client:client1@ds011745.mlab.com:11745/tutor_matching_service', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};
