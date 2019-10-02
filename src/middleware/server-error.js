'use strcit';

module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(500);
  res.statusMessage = 'server error';
  //just make sure we are sending back json
  res.json({error: error});
};
