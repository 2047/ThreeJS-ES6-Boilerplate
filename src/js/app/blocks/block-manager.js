import Block from './block'

import Dirt from './dirt'
import Stone from './stone'

// Factory to manage all block types
const BlockManager = {

  registeredBlocks: new Map(),

  register(blockName, blockType) {
    if (!BlockManager.registeredBlocks.has(blockName)
        && blockType.prototype instanceof Block) {
      BlockManager.registeredBlocks.set(blockName, blockType)
    }
  },

  create(blockName, ...options) {
    if (!BlockManager.registeredBlocks.has(blockName)) {
      throw new Error(`Not able to create block: ${ blockName }`)
    }

    let blockType = BlockManager.registeredBlocks.get(blockName)
    let block = new blockType(...options)
    block.init()

    return block
  }
}

BlockManager.register('dirt', Dirt)
BlockManager.register('stone', Stone)

export default BlockManager
