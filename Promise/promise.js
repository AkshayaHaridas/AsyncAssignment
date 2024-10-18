const descriptionDiv = document.querySelector(".showDescription");
const btn = document.querySelector("#btnPromise");

// when button clicked loop through the data fetched and create elements and display them
btn.addEventListener("click", () => {
  const promise = new Promise((resolve, reject) => {
    descriptionDiv.innerHTML = "Loading...";
    descriptionDiv.style.height = "400px";
    descriptionDiv.style.padding = "10px";
    //to reject with error message if resolve didnt occur within 5s
    const timout = setTimeout(() => {
      reject("Operation timed out");
    }, 5000);
    fetch("https://dummyjson.com/posts")
      .then((response) => {
        //check if the status is ok or not and throw error(HTTP response errors (e.g., status codes like 404 or 500). To handle these, you need to manually throw an error inside the then() and message from the response).Then this error will go to catch block
        if (!response.ok) {
          console.log(response.status);
          throw new Error(`${response.status}, ${response.statusText}`);
        }
        clearTimeout(timout);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timout);
        reject(error);
      });
  });

  //resolving the promise and using the fetched data to display them in new elements created
  promise
    .then((response) => response.json())
    .then((response) => {
      descriptionDiv.innerHTML = "";
      response.posts.forEach((x) => {
        const title = document.createElement("h2");
        title.style.color = "#147ccc";
        title.innerHTML = `${x.title}`;
        const id = document.createElement("h3");
        id.innerHTML = `Id:${x.id}`;
        const body = document.createElement("p");
        body.innerHTML = x.body;
        body.style.fontFamily = "sans-serif";
        descriptionDiv.appendChild(title);
        descriptionDiv.appendChild(id);
        descriptionDiv.appendChild(body);
      });
    })
    .catch((error) => {
      descriptionDiv.innerHTML = error;
    });
});
