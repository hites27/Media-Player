import shaka from "shaka-player";

const videoDiv = document.getElementById("videosDiv");

const manifestUri = [
  {
    name: "Star Trek",
    desc: "Star trek in spanish",
    img: "src/assets/Star.jpg",
    videoUrl:
      "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  },
  {
    name: "Big Buck",
    desc: "A documentary on Big buck",
    img: "src/assets/Big.png",
    videoUrl:
      "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8",
  },
  {
    name: "Angel One",
    desc: "Star trek demo version (Espanol)",
    img: "src/assets/Angle one.jpg",
    videoUrl:
      "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  },
];

const renderCards = (videoPara) => {
  const videoCard = `
    <div class="card" style="width: 100%; border-radius: 15px; padding: 10px">
      <img class="card-img-top" src="${videoPara?.img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${videoPara?.name}</h5>
          <p class="card-text">${videoPara?.desc}</p>
          <button onclick="startPlaying('${videoPara?.videoUrl}')" class="btn btn-primary">Play</button>
        </div>
    </div>
`;
  videoDiv.insertAdjacentHTML("afterbegin", videoCard);
};

manifestUri.forEach((ele) => {
  renderCards(ele);
});

async function startPlaying(url) {
  await initPlayer(url);
}

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    // initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error("Browser not supported!");
  }
}

async function initPlayer(videoUrl) {
  // Create a Player instance.
  const video = document.getElementById("video");
  const player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener("error", onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(videoUrl);
    // This runs if the asynchronous load is successful.
    console.log("The video has now been loaded!");
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error("Error code", error.code, "object", error);
}

document.addEventListener("DOMContentLoaded", initApp);
