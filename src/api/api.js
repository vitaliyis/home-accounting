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

export const checkEmail = email => {
  return getUserByEmailApi(email)
    .then(user => {
      if (!user.length) {
        return ''
      } else {
        return 'Email уже занят!'
      }
      })
    .catch(err => console.log('Error in checkEmail: ', err))
}