import Block from './block'

export default class Stone extends Block {
  constructor() {
    super()

    this.texture = this.loadTexture('stone')
  }
}
