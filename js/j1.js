document.getElementById('textElement').addEventListener('click', function() {
    var imageElement = document.getElementById('imageElement');
    if (imageElement.style.display === 'none') {
      imageElement.style.display = 'block'; // Show the image
    } else {
      imageElement.style.display = 'none'; // Hide the image
    }
  });
  