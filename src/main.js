import 'babel-polyfill'
import RoseImage from './RoseImage'
import {
    eventHandler
} from './util'

let yulei1 = document.getElementById('yulei')
let yulei2 = yulei1.nextElementSibling
let yulei3 = yulei2.nextElementSibling

let zaolei1 = document.getElementById('zaolei')
let zaolei2 = zaolei1.nextElementSibling

let shuizhi1 = document.getElementById('shuizhi')
let shuizhi2 = shuizhi1.nextElementSibling
let shuizhi3 = shuizhi2.nextElementSibling
let shuizhi4 = shuizhi3.nextElementSibling
let shuizhi5 = shuizhi4.nextElementSibling

let dixidongwu1 = document.getElementById('dixidongwu')
let dixidongwu2 = dixidongwu1.nextElementSibling
let dixidongwu3 = dixidongwu2.nextElementSibling

let shuiwen1 = document.getElementById('shuiwen')
let shuiwen2 = shuiwen1.nextElementSibling
let shuiwen3 = shuiwen2.nextElementSibling

let paramList = [
    yulei1, yulei2, yulei3,
    zaolei1, zaolei2,
    shuizhi1, shuizhi2, shuizhi3, shuizhi4, shuizhi5,
    dixidongwu1, dixidongwu2, dixidongwu3,
    shuiwen1, shuiwen2, shuiwen3
]

// paramList.forEach((item, index) => {
//     item.value = index + 1
// })

let myCanvas = document.getElementById('myCanvas')
let drawBtn = document.getElementById('drawBtn')
let resetBtn = document.getElementById('resetBtn')
let saveBtn = document.getElementById('saveBtn')
let myImage = new RoseImage(myCanvas, paramList)

eventHandler.addEvent(drawBtn, 'click', (e) => {
    e = eventHandler.getEvent(e)
    eventHandler.preventDefault(e)
    myImage.clear()
    myImage.start()
})
eventHandler.addEvent(resetBtn, 'click', (e) => {
    e = eventHandler.getEvent(e)
    eventHandler.preventDefault(e)
    myImage.clear()
})
eventHandler.addEvent(saveBtn, 'click', (e) => {
    e = eventHandler.getEvent(e)
    eventHandler.preventDefault(e)
    myImage.toImage()
})