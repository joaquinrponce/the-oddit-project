fetch('/api/posts', {method: 'POST', headers: {'Accept': 'application/json', 'Content-type': 'application/json'}, body: JSON.stringify({post: {title: 'test', user_id: 1, hall_id: 1, body:'I am tested'}})}).then(response => response.json()).then(response => console.log(response))
