import Block from './block'

export default class Dirt extends Block {
  constructor() {
    super()

    this.texture = this.loadTexture('dirt')
  }
}
