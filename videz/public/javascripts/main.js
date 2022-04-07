
fetch("http://localhost:3000/api/videos")
    .then((res) => res.json())
    .then((data) => {
        let trs = `<tr><th>Title</th><th>Genre</th><th>Description</th><th>Actions</th></tr>`;
        data.forEach(video => {
            trs += `<tr>
                    <td>${video.title}</td>
                    <td>${video.genre}</td>
                    <td>${video.description}</td>
                    <td><button id="${video._id}" class="delete">Delete</button></td>
                    </tr>`;
        });
        document.getElementById('videolist').innerHTML = trs;
    });

document.getElementById("add").onclick = function () {

    fetch("http://localhost:3000/api/videos", {
        method: 'POST',
        body: JSON.stringify({
            title: document.getElementById("title").value,
            genre: document.getElementById("genre").value,
            description: document.getElementById("description").value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
        .then((data) => console.log(data));
}

let vidList = document.getElementById("videolist");

vidList.addEventListener("click", function (e) {
    var id = e.target.id;
    fetch("http://localhost:3000/api/videos/" + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
        .then((data) => {
            e.target.parentNode.parentNode.remove();
        });
});
