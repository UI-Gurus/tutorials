/**
* @class
* @classdesc A base class for Polygons is defined
*/
class Polygon {
  /**
  * @constructs
  * @param {number} height - The height of the new polygon
  * @param {number} width - The width of the new polygon
  */
  constructor(height, width) {
    this.name = 'Polygon'
    this.height = height;
    this.width = width;
  }
}

/**
* @class
* @classdesc A square class inherited from Polygon class
* @extends Polygon
*/
class Square extends Polygon {

  /**
  * @constructs
  * @param {number} length - The side's lenght of the square
  */
  constructor(length) {
    super(length, length);
    this.name = 'Square';
  }

  /**
  * @function getArea
  * @returns {number}
  * @memberof Square
  */
  getArea() {
    return this.height * this.width;
  }

  /**
  * @function setArea
  * @param {number} value - The value of the square area
  * @memberof Square
  */
  setArea(value) {
    this.area = value;
  }
}

/** @constant square*/
const square = new Square(5);
