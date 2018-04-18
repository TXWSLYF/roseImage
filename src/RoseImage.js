import {
    drawCircle,
    drawTriangle,
    drawPentagon,
    oDownLoad,
    defaultColorList,
    selectColor,
} from './util'

import zaoLeiImageSrc from '../imgs/zaoLei.jpg'
import diXiDongWuImageSrc from '../imgs/diXiDongWu.jpg'
import yuLeiImageSrc from '../imgs/yuLei.jpg'
import shuiWenImageSrc from '../imgs/shuiWen.jpg'
import shuiZhiImageSrc from '../imgs/shuiZhi.jpg'


const OUTLENGTH = 330
const LINECOLOR = '#434343'

export default class RoseImage {
    constructor(myCanvas, paramList) {
        this.myCanvas = myCanvas
        this.ctx = myCanvas.getContext('2d')
        this.width = myCanvas.width
        this.height = myCanvas.height
        this.paramList = paramList
    }

    start() {
        let imageLoadPromiseList = [zaoLeiImageSrc, diXiDongWuImageSrc, yuLeiImageSrc, shuiWenImageSrc, shuiZhiImageSrc].map(src => {
            return new Promise((resolve, reject) => {
                let image = new Image()
                image.src = src
                image.onload = () => {
                    resolve(image)
                }
            })
        })
        Promise.all(imageLoadPromiseList).then(imageList => {
            let ctx = this.ctx
            let width = this.width
            let height = this.height
            let paramList = this.paramList
            paramList = paramList.map(item => {
                return item.value
            })
            let pass = true
            for (let i = 0; i < paramList.length; i++) {
                if (paramList[i].trim() === '') {
                    pass = false
                    alert('参数不能为空！')
                    break
                }
            }
            if (pass) {
                ctx.translate(width / 2, height / 2)
                //第一步绘制主背景
                let innerLength = Math.sqrt((OUTLENGTH * OUTLENGTH / (2 - 2 * Math.cos((72 / 360) * 2 * Math.PI))))
                let temp1 = innerLength * Math.sin((72 / 360) * 2 * Math.PI)
                let temp2 = innerLength * Math.cos((72 / 360) * 2 * Math.PI)
                let point1 = {
                    x: 0,
                    y: -innerLength
                }
                let point2 = {
                    x: -temp1,
                    y: -temp2
                }
                let point5 = {
                    x: temp1,
                    y: -temp2
                }
                temp1 = innerLength * Math.cos((36 / 360) * 2 * Math.PI)
                let point3 = {
                    x: -OUTLENGTH / 2,
                    y: temp1
                }
                let point4 = {
                    x: OUTLENGTH / 2,
                    y: temp1
                }
                let pointList = [point1, point2, point3, point4, point5]

                //绘制主体五边形
                drawPentagon({
                    ctx,
                    length: OUTLENGTH,
                    midPoint: {
                        x: 0,
                        y: 0,
                    },
                    colorList: ['#6d6c6c', '#6d6c6c', '#6d6c6c', '#6d6c6c', '#6d6c6c'],
                    lineWidth: 3,
                    lineColor: 'white',
                    fontSize: 30
                })

                //绘制五个背景图
                for (let i = 0; i < 5; i++) {
                    ctx.save()
                    ctx.beginPath()
                    ctx.moveTo(0, 0)
                    ctx.lineTo(pointList[i].x, pointList[i].y)
                    if (i === 4) {
                        ctx.lineTo(pointList[0].x, pointList[0].y)
                    } else {
                        ctx.lineTo(pointList[i + 1].x, pointList[i + 1].y)
                    }
                    ctx.lineTo(0, 0)
                    ctx.closePath()
                    ctx.clip()
                    ctx.drawImage(imageList[i], 0, 0, width, height, -width / 2, -height / 2, width, height)
                    ctx.restore()
                }

                //第二步，绘制中间的五边形
                drawPentagon({
                    ctx,
                    length: 70,
                    midPoint: {
                        x: 0,
                        y: 0,
                    },
                    colorList: [defaultColorList[2], defaultColorList[2], defaultColorList[2], defaultColorList[1], defaultColorList[1]],
                    lineWidth: 3,
                })

                //第三步，绘制一级文字
                ctx.fillStyle = 'white'
                ctx.font = `20px Arial`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'bottom'
                ctx.fillText('藻类', -75, -175)
                ctx.fillText('底栖动物', -150, -10)
                ctx.fillText('鱼类', 0, 80)
                ctx.fillText('水文', 150, -10)
                ctx.fillText('水质', 75, -175)

                //第四步，根据输入参数绘制5个部分的比例图
                //4.1绘制藻类圆形
                let zaoLeiColorList = paramList.slice(3, 5)
                // console.log(`zaoLeiColorList${zaoLeiColorList}`)
                zaoLeiColorList = zaoLeiColorList.map(item => {
                    return selectColor(item)
                })
                drawCircle({
                    ctx,
                    r: 45,
                    midPoint: {
                        x: -80,
                        y: -110,
                    },
                    colorList: zaoLeiColorList,
                    textList: ['shannon指数'],
                })

                //4.2绘制底栖动物三角形
                let diXiDongWuColorList = paramList.slice(10, 13)
                // console.log(`diXiColorList${diXiDongWuColorList}`)
                diXiDongWuColorList = diXiDongWuColorList.map(item => {
                    return selectColor(item)
                })
                drawTriangle({
                    ctx,
                    length: 115,
                    midPoint: {
                        x: -140,
                        y: 65
                    },
                    colorList: diXiDongWuColorList,
                    textList: ['EPT百分比', '丰富度', 'BI指数']
                })

                //4.3绘制鱼类三角形
                let yuLeiColorList = paramList.slice(0, 3)
                // console.log(`yulei${yuLeiColorList}`)
                yuLeiColorList = yuLeiColorList.map(item => {
                    return selectColor(item)
                })
                drawTriangle({
                    ctx,
                    length: 115,
                    midPoint: {
                        x: 0,
                        y: 160
                    },
                    colorList: yuLeiColorList,
                    textList: ['肉食性鱼类%', '物种数', '土著鱼类密度']
                })


                //4.4绘制水文三角形
                let shuiWenColorList = paramList.slice(13)
                // console.log(`shuiwen${shuiWenColorList}`)
                shuiWenColorList = shuiWenColorList.map(item => {
                    return selectColor(item)
                })
                drawTriangle({
                    ctx,
                    length: 115,
                    midPoint: {
                        x: 140,
                        y: 65,
                    },
                    colorList: shuiWenColorList,
                })

                //4.5绘制水质五边形
                let shuiZhiColorList = paramList.slice(5, 10)
                shuiZhiColorList = shuiZhiColorList.map(item => {
                    return selectColor(item)
                })
                drawPentagon({
                    ctx,
                    length: 70,
                    midPoint: {
                        x: 80,
                        y: -110
                    },
                    colorList: shuiZhiColorList,
                    textList: ['COD', 'BOD', '电导率', 'TP', 'TN']
                })

                ctx.translate(-width / 2, -height / 2)
            }

        })
    }





    clear() {
        let ctx = this.ctx
        let width = this.width
        let height = this.height
        ctx.clearRect(0, 0, width, height)
    }

    toImage() {
        let myCanvas = this.myCanvas
        let src = myCanvas.toDataURL("image/png")
        oDownLoad(src)
    }
}