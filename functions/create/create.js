const faunadb = require('faunadb'),
q = faunadb.query;

const handler = async (event,context,callback) => {

    const client = new faunadb.Client({
      secret: "fnAD67fl4RACBf-iZimAHLk8buqt-R_MFbqR2r8C"
    })
    const subject = JSON.parse(event.body);
    const result = await client.query( q.Create(
      q.Collection("crud"),
      {
        data: {
          name: subject
        }
      }
    )).then(res => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    }).catch(err => {
      return callback(null, {
        statusCode: 400,
      body: JSON.stringify(error)
      })
    })
}

module.exports = { handler }
