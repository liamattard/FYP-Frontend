const params = new URLSearchParams(window.location.search);
var id = params.get("id");

if (id == null) {
  window.location.href = "https://www.touristplanner.xyz";
} else {
  fetch("https://liamattard.xyz:8888/classifyPhotos?id=" + id, {
    method: "POST",
  })
    .then((response) => {
      if (response.status == 200) {
        return response.text();
      } else {
        window.location.replace("https://www.touristplanner.xyz");
      }
    })
    .then((data) => {
      let loadingText = document.getElementById("loadingText");
      loadingText.innerHTML = " (2/2) Please wait...'";
      console.log("INSTAGRAM DATA");
      console.log(data);

      fetch("https://liamattard.xyz:8888/getUserLikes?id=" + id, {
        method: "POST",
      })
        .then((response) => {
          if (response.status == 200) {
            return response.text();
          } else {
            window.location.replace("https://www.touristplanner.xyz");
          }
        })
        .then((data) => {
          window.location.replace(
            "https://www.touristplanner.xyz/screens/chooser.html?id=" + id
          );
        });
    });
}
