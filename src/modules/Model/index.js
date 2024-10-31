class Model {
  static _width = 200;
  static _height = 40;
  static _enabled = false;

  constructor(config) {
    this.width = config?.width ?? Model._width;
    this.height = config?.height ?? Model._height;
    this.enabled = config?.enabled ?? Model._enabled;
  }
}

export class ImageModel extends Model {
  static _height = 200;

  constructor(src, config) {
    super(config);

    this.src = src ?? null;
    this.height = config?.height ?? ImageModel._height;
  }
}

export class TextModel extends Model {
  constructor(text, config) {
    super(config);

    this.src = text ?? "";
  }
}

export class Card {
  constructor(props) {
    this.text = props?.text ?? new TextModel();
    this.image = props?.image ?? new ImageModel();
  }
}
