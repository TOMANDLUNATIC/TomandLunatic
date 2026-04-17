// 🔥 Google Docs Auto Load
const docURL = "https://docs.google.com/document/d/e/2PACX-1vQMOLaQGjxZk1xenXXC3KQFAtckT-cfjNK4ka_Lv0ogyi1Lb5xmujzdQNC-DGyq8pPgshSX4NRTbXob/pub?embedded=true";

document.getElementById("rulesFrame").src = docURL;


// ✨ Smooth Fade Load Effect
const frame = document.getElementById("rulesFrame");

frame.src = "https://docs.google.com/document/d/e/2PACX-1vQMOLaQGjxZk1xenXXC3KQFAtckT-cfjNK4ka_Lv0ogyi1Lb5xmujzdQNC-DGyq8pPgshSX4NRTbXob/pub?embedded=true";

// smooth load
frame.onload = () => {
    frame.style.opacity = "1";
};