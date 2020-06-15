/* export default const authenticate = function (url, callback) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({auth: {name: 'Koko', password: 'test'}}),
    headers: {'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem("jwt", data.jwt);
    callback(data)
  })
  .catch(error => console.log('error', error));
}

fetch('/api/posts/feed', {
  method: 'GET',
  headers: {'Content-Type': 'application/json', 'Authorization': token}
})
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(error => console.log('error', error));

fetch('/api/user_token', {
  method: 'POST',
  body: JSON.stringify({auth: {name: 'Koko', password: 'test'}}),
  headers: {'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => {
  localStorage.setItem("jwt", data.jwt);
  console.log(data)
})
.catch(error => console.log('error', error));
} */
