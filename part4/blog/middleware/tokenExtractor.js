// Get Token From
module.exports = (request, response, next) => {

  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  request.token = token
  console.log(request.token)
  next()
}