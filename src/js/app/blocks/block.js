import { BoxGeometry, MeshLambertMaterial, Mesh, TextureLoader } from 'three'

export default class Block {

  constructor(){
    this.texture = null
    this.textureLoader = new TextureLoader()
  }

  init() {
    if (!this.texture) {
      throw new Error('no texture setup!')
    }

    this.geometry = new BoxGeometry(1, 1, 1)
    // this.material = new MeshBasicMaterial({ map: this.texture })
    this.material = new MeshLambertMaterial({ map: this.texture })
    this.mesh = new Mesh(this.geometry, this.material)
  }

  loadTexture(filename) {
    return this.textureLoader.load(`assets/textures/blocks/${ filename }.png`)
  }

  update(){
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.02
  }

}
