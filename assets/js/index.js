// const url = "http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login/all"
// const getData_var = document.querySelector('.getData')

// let output = ""


// const getData = (posts) => {
// 	posts.forEach(element => {
// 		console.log(element);
// 		output += "<label>${posts[element]}</label>"
// 	}); 
// 	getData_var.innerHTML = output
// }

// fetch(url)
// .then(res => res.json())
// // .then(data => console.log(data))
// .then(data => getData(data))
// // .then(json => {
// // 	json = JSON.parse(json);
// // 	json.forEach(user => {
// // 		console.log(user);
// // 	});
// // })


// const signInButton = document.getElementById('signin');

// signInButton.addEventListener('click', () => {
// 	// POST request using fetch()
// 	fetch("http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login/all", {
		
// 		// Adding method type
// 		method: "GET",
		
// 		// Adding body or contents to send
// 		// body: JSON.stringify({
// 		// 	userID: 1002,
// 		// 	email: document.getElementById("username").value,
// 		// 	password: document.getElementById("password").value
// 		// }),
		
// 		// Adding headers to the request
// 		headers: {
// 			"Content-type": "application/json; charset=UTF-8"
// 		}
// 	})
// 	// Converting to JSON
// 	.then(response => response.json())
	
// 	// Displaying results to console
// 	.then(json => console.log(json));
// });
