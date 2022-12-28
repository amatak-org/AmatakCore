import sql from '.databse/db.js'

async function getUsersOver(age) {
  const users = await sql`
    select
      name,
      age
    from db
    where age > ${ age }
  `
  // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
  return users
}


async function insertUser({ name, age }) {
  const users = await sql`
    insert into users
      (name, age)
    values
      (${ name }, ${ age })
    returning name, age
  `
  // users = Result [{ name: "Murray", age: 68 }]
  return users
}