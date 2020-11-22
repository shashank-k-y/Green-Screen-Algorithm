var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgimage");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("can");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgimage");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("can2");
  bgImage.drawTo(bgCanvas);
}

function createComposite() {
  // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() >  pixel.getRed() + pixel.getBlue()) {
      //pixel is green, use background
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      //pixel is not green, use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clearCanvas();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finalImage = createComposite();
  finalImage.drawTo(fgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
