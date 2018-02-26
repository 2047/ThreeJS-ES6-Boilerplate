import * as THREE from 'three'
import Stats from 'stats.js'
import OrbitControls from 'orbit-controls-es6'

import Config from '../data/config'
import BlockManager from './blocks/block-manager'

export default class Main {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      // set background color from black to white
      alpha: true,
      antialias: true
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.style.margin = 0
    document.body.appendChild(this.renderer.domElement)

    this.camera.position.y = 10

    this.addLights()
    this.addHelpers()

    window.addEventListener('resize', () => {
      let width = window.innerWidth
      let height = window.innerHeight

      this.renderer.setSize(width, height)

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    })

    this.loadAll()

    this.addStats()
    this.setupControls()

    // let's render
    this.render()
  }

  loadAll() {
    // let stone = BlockManager.create('stone')
    // this.blocks = [stone]
    // this.scene.add(stone.mesh)

    this.blocks = []

    for (let i = 0; i < 0xf; ++i) {
      for (let j = 0; j < 0xf; ++j) {
        let dirt = BlockManager.create('stone')
        dirt.mesh.position.x = i
        dirt.mesh.position.z = j
        this.blocks.push(dirt)
        this.scene.add(dirt.mesh)
      }
    }
  }

  render() {
    if (Config.isDev) {
      this.stats.begin()
    }

    // this.blocks.forEach(block => block.update())
    // this.controls.update(this.clock.getDelta())
    this.renderer.render(this.scene, this.camera)

    if (Config.isDev) {
      this.stats.end()
    }

    requestAnimationFrame(this.render.bind(this))
  }

  addLights() {
    // let ambientLight = new THREE.AmbientLight(0x000000)
    // this.scene.add(ambientLight)
    //
    // let light = new THREE.PointLight(0xffffff, 1, 0)
    // light.position.set(0, 0, 100)
    // this.scene.add(light)

    // White directional light at full intensity shining from the top
    // and each end of xz, and half light from the bottom
    let topLight = new THREE.DirectionalLight(0xffffff, 1)
    this.scene.add(topLight)

    let xzLight = new THREE.DirectionalLight(0xffffff, 1)
    xzLight.position.set(1, 0, 1)
    this.scene.add(xzLight)

    let xzLight2 = new THREE.DirectionalLight(0xffffff, 1)
    xzLight2.position.set(-1, 0, -1)
    this.scene.add(xzLight2)

    let bottomLight = new THREE.DirectionalLight(0xffffff, 0.5)
    bottomLight.position.set(0, -1, 0)
    this.scene.add(bottomLight)
  }

  addHelpers() {
    if (Config.isDev) {
      let axesHelper = new THREE.AxesHelper(50)
      this.scene.add(axesHelper)

      // let cameraHelper = new THREE.CameraHelper(this.camera)
      // this.scene.add(cameraHelper)
    }
  }

  addStats() {
    if (Config.isDev) {
      this.stats = new Stats()
      this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.domElement)
    }
  }

  setupControls() {
    // this.controls = new FirstPersonControls(this.camera)
    // this.controls.lookSpeed = 0.1
    // this.controls.movementSpeed = 100
    //
    // this.clock = new THREE.Clock(true)

    // this.controls = new PointerLockControls(this.camera, this.scene, this.renderer.domElement)
    // this.controls.start()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.maxDistance = 1500
    this.controls.minDistance = 0
  }
}
