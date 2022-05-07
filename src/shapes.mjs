export function shapeToString(shape) {
    let s = "";
    for (let row = 0; row < shape.height(); row++) {
      for (let col = 0; col < shape.getWidth(); col++) {
        s += shape.blockAt(row, col);
      }
      s += "\n";
    }
    return s;
  }