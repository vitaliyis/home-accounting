export const getUserByEmailApi = email => {
  return fetch(`http://localhost:3001/users?email=${email}`)
    .then(response => response.json())
    .catch(err => console.log('getUserByEmailApi: ', err))
}

export const createNewUserApi = user => {
  return fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
}