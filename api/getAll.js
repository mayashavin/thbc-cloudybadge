require('dotenv').config();
const { q, client } = require('./setup');

module.exports = async (req, res) => {
  try {
    const queryResponse = await client.query(
      q.Paginate(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_ALL)
        )
      )
    );
    const data = queryResponse.data;
    const allBadgesQuery = data.map(ref => q.Get(ref));

    const response = await client.query(allBadgesQuery)
    const users = response.map(entry => entry.data);

    return res.json({
      users
    });
  } catch(error) {
    return res.json({
      error: error.message
    })
  }
  
};