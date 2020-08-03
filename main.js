let div = document.createElement("div");
let button = document.createElement("button");

const hideMyHangoutVideo = "hide my hangout video";
button.textContent = hideMyHangoutVideo;

let isSelecting = false;

const finishSelect = () => {
  button.textContent = hideMyHangoutVideo;
  isSelecting = false;
};

button.addEventListener("click", () => {
  isSelecting = !isSelecting;

  if (isSelecting) {
    button.textContent = "select video frame...";
  } else {
    finishSelect();
  }
});

div.style = `z-index: 9999; position: fixed; top: 0; left: 0;`;
div.appendChild(button);

document.body.appendChild(div);

document.addEventListener("click", (e) => {
  if (!isSelecting) return;

  const video = e.target.querySelector("[data-ssrc] > video");
  // console.log(video);
  const ssrcElm = video.parentNode;
  console.log(ssrcElm);

  video.style = "display: none;";

  const ssrc = ssrcElm.dataset.ssrc;

  if (ssrc) {
    const others = document.querySelectorAll("[data-ssrc]");
    others.forEach((e) => {
      console.log(e);
      // remove same uid video (mini size frame...)
      if (e.dataset.ssrc == ssrc) {
        e.style = "display: none;";
      }
    });
  }

  finishSelect();
});
