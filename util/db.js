const { Pool } = require("pg")

const pool = new Pool ({
  host: 'localhost',
  user: 'muhammadbobur',
  password: '1111',
  database: 'ordersapp',
  port: 5432
})


const rows = async (SQL, ...params) => {

  const connect = await pool.connect()

  try {
    const { rows } = await connect.query(SQL, params)
    return rows
  }
  catch(e) {
    throw e
  }
  finally{
    connect.release()
  }
}

module.exports.rows = rows
