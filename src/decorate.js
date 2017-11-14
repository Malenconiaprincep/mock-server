/* eslint-disable no-param-reassign, jsx-a11y/href-no-hash */

function decorateArmour(target, key, descriptor) {
  const method = descriptor.value
  const moreDef = 100
  return Object.assign({}, descriptor, {
    value: (...args) => {
      const [def, atk, hp] = args
      return method.apply(target, [def + moreDef, atk, hp])
    },
  })
}

function decorateLight(target, key, descriptor) {
  const method = descriptor.value
  const moreAtk = 50
  return Object.assign({}, descriptor, {
    value: (...args) => {
      const [def, atk, hp] = args
      return method.apply(target, [def, atk + moreAtk, hp])
    },
  })
}

function addFly(canFly) {
  return target => {
    const extra = canFly ? ' (技能加成:飞行能力)' : ''
    const method = target.prototype.toString
    target.canFly = canFly
    target.prototype.toString = (...args) =>
      method.apply(target.prototype, args) + extra
    return target
  }
}

@addFly(true)
class Man {
  constructor(def = 2, atk = 3, hp = 3) {
    this.init(def, atk, hp)
  }

  @decorateArmour
  @decorateLight
  init(def, atk, hp) {
    this.def = def // 防御值
    this.atk = atk // 攻击力
    this.hp = hp // 血量
  }
  toString() {
    return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`
  }
}

const tony = new Man()
console.log(`当前状态 ===> ${tony}`)
// 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3
