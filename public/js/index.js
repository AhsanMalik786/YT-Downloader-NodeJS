const navItem = document.querySelector('.navItem');
var quality = document.getElementById('quality');
var url = document.querySelector("#url");
const VidDetails = document.querySelector(".VidDetails");
const video_thumb = document.querySelector(".video-thumb");

function Loader() {
  var Loader = document.querySelector(".loader-P");
  Loader.classList.toggle("hide")
}

var isShow = false;
function show(e) {
  if (isShow) {
    isShow = false;
    navItem.style.left = "-50%";
  } else {
    isShow = true;
    navItem.style.left = "0%"
  }
}
function showDetails(img_src, text) {

  if (document.querySelector(".title")) {
    video_thumb.removeChild(document.querySelector(".title"))
  }
  if (document.querySelector(".thumb_img")) {
    video_thumb.removeChild(document.querySelector(".thumb_img"))
  }
  var image = document.createElement("img");
  var title = document.createElement("p");
  title.classList.add("title");
  image.classList.add("thumb_img")
  image.src = img_src;
  title.innerText = text;
  video_thumb.appendChild(image);
  video_thumb.appendChild(title);
}
function setUp(data) {
  Loader();
  showDetails(data.thumb[1].url, data.title);
  var arr = [];
  data.formats.forEach((e)=> {
    if ('audioBitrate' in e && 'qualityLabel' in e) {
      if (e.audioBitrate != null && e.qualityLabel != null) arr.push(e)
    }
  });
  var l = quality.options.length;
  for(var i=0;i<l;i++){
      quality.removeChild(quality.options['0']);
    }
  arr.forEach((e)=>{
    opt = document.createElement("option");
    opt.text = e.qualityLabel;
    opt.value = e.url;
    quality.appendChild(opt);
  })
  VidDetails.classList.remove("hide")
}
async function fetchData(url) {
  var res;
  var data;
  try {
    res = await fetch(url);
    data = await res.json();
    if(data.ok){
    setUp(data);
    }else{
      Loader()
      alert("Server Error !");
    }
  } catch (e) {
    console.log(e)
    Loader();
    alert("Client Error Ocured !");
  }
}

function main() {
  var resJson;
  if (url.value) {
    Loader();
    fetchData(`/down?url=${url.value}`);
  } else {
    alert("Please Enter URL !");
  }
}
function Download() {
  if(quality.value){
    window.location = quality.value;
  }
}
console.log(quality)
console.log(quality.options.length > 0)

// https://youtu.be/i88HKto_DZw
