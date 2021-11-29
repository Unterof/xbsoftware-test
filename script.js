const item = document.getElementById('item')
const placeholder = document.querySelector('.block')
const valueOfTop = document.getElementById('top')
const valueOfLeft = document.getElementById('left')
document.querySelector('form').addEventListener('change', changeHandle)

valueOfTop.value = '0'
valueOfLeft.value = '0'
let isDrag = false

const limits = {
    top: placeholder.getBoundingClientRect().top,
    right: placeholder.getBoundingClientRect().width + placeholder.getBoundingClientRect().left - item.getBoundingClientRect().width,
    bottom: placeholder.getBoundingClientRect().height + placeholder.getBoundingClientRect().top - item.getBoundingClientRect().height,
    left: placeholder.getBoundingClientRect().left

}



function changeHandle() {

    isDrag = true
    if (valueOfTop.value > limits.bottom) {
        valueOfTop.value = limits.bottom
    } else if (valueOfTop.value < limits.top) {
        valueOfTop.value = '0'
    } else if (valueOfLeft.value > limits.right) {
        valueOfLeft.value = limits.right
    } else if (valueOfLeft.value < limits.left) {
        valueOfLeft.value = '0'
    }
    item.style.top = valueOfTop.value + 'px'
    item.style.left = valueOfLeft.value + 'px'
}




item.onmousedown = function (event) {
    isDrag = true

    let shiftX = event.clientX - item.getBoundingClientRect().left
    let shiftY = event.clientY - item.getBoundingClientRect().top

    item.style.position = 'absolute'
    item.style.zIndex = 1000

    document.body.append(item)



    function relocate(newLocation) {
        item.style.left = newLocation.x + 'px'
        item.style.top = newLocation.y + 'px'


    }



    function onMouseMove(event) {
        let positionX = event.pageX - shiftX
        let positionY = event.pageY - shiftY
        valueOfTop.value = item.getBoundingClientRect().top
        valueOfLeft.value = item.getBoundingClientRect().left
        if (isDrag) {
            move(positionX, positionY)

        }

    }

    document.addEventListener('mousemove', onMouseMove)

    document.onmouseup = function () {
        isDrag = false
        item.onmouseup = null;
        document.removeEventListener('mousemove', onMouseMove);


    }

    function move(pageX, pageY) {

        let newLocation = {
            x: limits.top,
            y: limits.left
        }

        if (pageX > limits.right) {
            newLocation.x = limits.right
        } else
            if (pageX > limits.left) {
                newLocation.x = pageX
            }
        if (pageY > limits.bottom) {
            newLocation.y = limits.bottom
        }
        else
            if (pageY > limits.top) {
                newLocation.y = pageY
            }

        relocate(newLocation)

    }


}


item.ondragstart = function () {
    return false;
}












