// 吸墙计算
const stickWall = (element) =>{
  // body宽度
  let bodyWidth =  window.innerWidth
  // body高度
  let bodyHeight =  window.innerHeight
  // 拖动元素宽度
  let elWidth = element.clientWidth
  // 拖动元素高度
  let elHeight = element.clientHeight
  // 拖动元素距离左边距离
  let elLeft = parseInt(element.style.left)
  // 拖动元素距离上边距离
  let elTop = parseInt(element.style.top)
  // 距屏幕边的距离，上右下左
  let distance = [
    {
      name:'top',
      value: elTop
    },
    {
      name: 'right',
      value: bodyWidth-elWidth-elLeft
    },
    {
      name: 'bottom',
      value: bodyHeight-elTop-elHeight
    },
    {
      name: 'left',
      value: elLeft
    }
  ]
  // 求出最小值
  let minNumber = Math.min.apply(null,distance.map(item=> item.value))
  // 根据最小值找到对应方向
  let minDirection = distance.find(item => item.value === minNumber).name
  // 各个方向赋值字典
  let directionMap = {
    top: 0,
    right: bodyWidth - elWidth,
    bottom: bodyHeight - elHeight,
    left: 0
  }
  // bottom与right转为top与left
  let transferDirection = {
    top: 'top',
    right: 'left',
    bottom: 'top',
    left: 'left'
  }
  // 元素最终赋值
  element.style[transferDirection[minDirection]] = directionMap[minDirection] + 'px'

}
// 安全获取对象属性
const securityObject = (obj,attr)=>{
  let array = attr.split('.')
  let value = obj
  array.forEach((item)=>{
    if(value){
      value = value[item]
    } else {
      value = undefined
    }
  })
  return value
}

export {stickWall,securityObject}
