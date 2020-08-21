import {stickWall,securityObject} from "./methods"
const VDrag = {}
VDrag.install = function (Vue) {
  Vue.directive('drag', function (el,binding,vnode){
    let element = el
    element.setAttribute('draggable',false)
    element.style.userDrag = 'none'
    // 正则筛出原本带有的样式，以便之后拼接
    let oldStyle = element.style.cssText.replace(/^(position|left|top):\w+;&/g,'')
    let newStyle
    const onmousemove=(e)=>{
      newStyle = oldStyle + `position:absolute;left:${e.x - element.clientWidth/2 + 'px'};top:${e.y - element.clientHeight/2 + 'px'}`
      element.style.cssText = newStyle
    }
    element.onmousedown=()=>{
      element.addEventListener('mousemove', onmousemove)
    }
    element.onmouseup=(()=>{
      element.removeEventListener('mousemove',onmousemove)
      if(securityObject(vnode.data,'attrs.stick-wall')){
        stickWall(element)
      }
      if(securityObject(vnode.data,'on.dragChange')){
        // vnode.data.on.change(newStyle.match(/(?<=left:).*?(?=;)/g))
        vnode.data.on.dragChange({
          x: element.style.left,
          y: element.style.top
        })
      }

    })
  })

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VDrag)
}
export default VDrag
