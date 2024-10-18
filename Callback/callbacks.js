const btn = document.querySelector("#btnCallback");
const descriptionDiv = document.querySelector(".showDescription");
const callBackDescription = () => {
  setTimeout(() => {
    descriptionDiv.style.height = "400px";
    descriptionDiv.style.padding = "10px";
    descriptionDiv.innerHTML = `Callback executed after 5 seconds`;
    //connect to api using fetch and collect the recieving promise object and convert to json which is also a promise object
    const fetchedData = fetch("https://dummyjson.com/posts").then((response) =>
      response.json()
    );
    //resolve the promise object or catch error
    fetchedData.then((response) => {
      descriptionDiv.innerHTML = "";
      console.log(response);
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
    });
  }, 5000);
};

// when button clicked loop through the data fetched and create elements and display them
btn.addEventListener("click", callBackDescription);
