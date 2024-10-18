const descriptionDiv = document.querySelector(".showDescription");

const btn = document.querySelector("#btnCallback");
btn.addEventListener("click", async () => {
  try {
    descriptionDiv.style.height = "400px";
    descriptionDiv.style.padding = "10px";
    descriptionDiv.innerHTML = "loading...";
    //check if time of fetchng data from api exceeds 5s
    const timeOut = setTimeout(() => {
      throw new Error("Operation timed out...");
    }, 5000);

    const data = await fetch("https://dummyjson.com/posts");
    console.log(data);
    if (!data.ok) {
      clearTimeout(timeOut);
      //check if the status is ok or not and throw error(HTTP response errors (e.g., status codes like 404 or 500). To handle these, you need to manually throw an error inside the then() and message from the response).Then this error will go to catch block
      throw new Error(`${data.status} ${data.statusText}`);
    }
    const dataInJson = await data.json();
    const posts = dataInJson.posts;
    if (posts) {
      clearTimeout(timeOut);
      descriptionDiv.innerHTML = "";
      posts.forEach((x) => {
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
    }
  } catch (error) {
    descriptionDiv.innerHTML = error;
  }
});
