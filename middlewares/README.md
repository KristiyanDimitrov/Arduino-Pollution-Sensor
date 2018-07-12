# Middlewares

In this folder, you will store all your Express middlewares. The purpose of a middleware is to extract a common controller code, which should be executed on multiple requests and usually modifies the request and/or the response objects.

Just like a controller, a middleware should never directly access the database. Instead it should use your models for such tasks.

Next, the authorization middleware, which is used when you want to prevent unauthorized access on some routes.

```javascript
module.exports = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).end()
  }
}