const faunadb = require("faunadb"),
  q = faunadb.query;

const handler = async (event, context, callback) => {
  const client = new faunadb.Client({
    secret: "fnAD67fl4RACBf-iZimAHLk8buqt-R_MFbqR2r8C"
  });
  const result = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("crud"))),
      q.Lambda((x) => q.Get(x))
    )
  ).then(data => data.data.map(d => {
      return {
        data: d.data,
        id: d.ref.id
      }
  }))
    .then((res) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    })
    .catch((err) => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(err),
      });
    });
};

module.exports = { handler };
