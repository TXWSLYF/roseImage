let defaultColorList = [
    '#d9d9d9',
    '#006400',
    '#FF8C00',
    '#ffff00',
    '#ff0000',
]

let selectColor = (num) => {
    if (num <= 3) {
        return defaultColorList[0]
    } else if (num <= 7) {
        return defaultColorList[1]
    } else if (num <= 11) {
        return defaultColorList[2]
    } else if (num <= 15) {
        return defaultColorList[3]
    } else {
        return defaultColorList[4]
    }
}

let drawCircle = (config) => {
    let {
        ctx,
        r,
        midPoint,
        colorList,
        lineWidth,
        lineColor,
        fontSize,
        textList
    } = config
    lineWidth = lineWidth || 2
    lineColor = lineColor || '#434343'
    fontSize = fontSize || 16
    textList = textList || []
    let temp1 = 0
    let midX = midPoint.x
    let midY = midPoint.y
    let point1 = {
        x: midX,
        y: midY - r
    }
    let point2 = {
        x: midX,
        y: midY + r
    }

    //绘制并填充两个半圆
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    ctx.beginPath()
    ctx.arc(midX, midY, r, 90 * Math.PI / 180, 270 * Math.PI / 180)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
    ctx.fillStyle = colorList[0]
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(midX, midY, r, 90 * Math.PI / 180, -90 * Math.PI / 180, true)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
    ctx.fillStyle = colorList[1]
    ctx.fill()
    ctx.stroke()

    //绘制文字
    ctx.beginPath()
    let distance = r + 3
    ctx.fillStyle = 'white'
    ctx.font = `${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.translate(midX, midY)
    ctx.textBaseline = 'bottom'
    ctx.rotate(-90 * Math.PI / 180)
    ctx.fillText(textList[0], 0, -distance)
    ctx.rotate(90 * Math.PI / 180)
    ctx.translate(-midX, -midY)
}


let drawTriangle = (config) => {
    let {
        ctx,
        length,
        midPoint,
        colorList,
        lineWidth,
        lineColor,
        fontSize,
        textList
    } = config
    lineWidth = lineWidth || 2
    lineColor = lineColor || '#434343'
    fontSize = fontSize || 16
    textList = textList || []
    let temp1 = 0
    let midX = midPoint.x
    let midY = midPoint.y
    let innerLength = Math.sqrt(3) * length / 3
    let point1 = {
        x: midX,
        y: midY - innerLength
    }
    temp1 = innerLength / 2
    let point2 = {
        x: midX - length / 2,
        y: midY + temp1,
    }
    let point3 = {
        x: midX + length / 2,
        y: midY + temp1,
    }

    let pointList = [point1, point2, point3]

    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.lineTo(point3.x, point3.y)
    ctx.lineTo(point1.x, point1.y)
    ctx.stroke()

    for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(midX, midY)
        ctx.lineTo(pointList[i].x, pointList[i].y)
        ctx.moveTo(midX, midY)
        if (i === 2) {
            ctx.lineTo(pointList[0].x, pointList[0].y)
        } else {
            ctx.lineTo(pointList[i + 1].x, pointList[i + 1].y)
        }
        ctx.lineTo(pointList[i].x, pointList[i].y)
        ctx.stroke()
        ctx.fillStyle = colorList[i]
        ctx.fill()
        ctx.stroke()
    }

    if (textList.length > 0) {
        let distance = temp1 + 3
        ctx.fillStyle = 'white'
        ctx.font = `${fontSize}px Arial`
        ctx.textAlign = 'center'
        ctx.beginPath()
        ctx.translate(midX, midY)
        ctx.textBaseline = 'bottom'
        ctx.rotate(-60 * Math.PI / 180)
        ctx.fillText(textList[0], 0, -distance)
        ctx.textBaseline = 'top'
        ctx.rotate(60 * Math.PI / 180)
        ctx.fillText(textList[1], 0, distance)
        ctx.textBaseline = 'bottom'
        ctx.rotate(60 * Math.PI / 180)
        ctx.fillText(textList[2], 0, -distance)
        ctx.rotate(-60 * Math.PI / 180)
        ctx.translate(-midX, -midY)
    }
}

let drawPentagon = (config) => {
    let {
        ctx,
        length,
        midPoint,
        colorList,
        lineWidth,
        lineColor,
        fontSize,
        textList
    } = config
    lineWidth = lineWidth || 2
    lineColor = lineColor || '#434343'
    fontSize = fontSize || 16
    textList = textList || []
    let temp1 = 0
    let temp2 = 0
    let midX = midPoint.x
    let midY = midPoint.y
    let innerLength = Math.sqrt((length * length / (2 - 2 * Math.cos((72 / 360) * 2 * Math.PI))))
    let point1 = {
        x: midX,
        y: midY - innerLength
    }
    temp1 = innerLength * Math.sin((72 / 360) * 2 * Math.PI)
    temp2 = innerLength * Math.cos((72 / 360) * 2 * Math.PI)
    let point2 = {
        x: midX - temp1,
        y: midY - temp2
    }
    let point5 = {
        x: midX + temp1,
        y: midY - temp2
    }
    temp1 = innerLength * Math.cos((36 / 360) * 2 * Math.PI)
    let point3 = {
        x: midX - length / 2,
        y: midY + temp1
    }
    let point4 = {
        x: midX + length / 2,
        y: midY + temp1
    }

    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.textAlign = 'center'


    let pointList = [point1, point2, point3, point4, point5]

    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.lineTo(point3.x, point3.y)
    ctx.lineTo(point4.x, point4.y)
    ctx.lineTo(point5.x, point5.y)
    ctx.lineTo(point1.x, point1.y)
    ctx.stroke()

    for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.fillStyle = colorList[i]
        ctx.moveTo(midX, midY)
        ctx.lineTo(pointList[i].x, pointList[i].y)
        ctx.moveTo(midX, midY)
        if (i === 4) {
            ctx.lineTo(pointList[0].x, pointList[0].y)
        } else {
            ctx.lineTo(pointList[i + 1].x, pointList[i + 1].y)
        }
        ctx.lineTo(pointList[i].x, pointList[i].y)
        ctx.stroke()
        ctx.fill()
        ctx.stroke()
    }

    if (textList.length > 0) {
        let distance = temp1 + 3
        ctx.fillStyle = 'white'
        ctx.font = `${fontSize}px Arial`
        ctx.beginPath()
        ctx.translate(midX, midY)
        ctx.textBaseline = 'bottom'
        ctx.rotate(-36 * Math.PI / 180)
        ctx.fillText(textList[0], 0, -distance)
        ctx.textBaseline = 'top'
        ctx.rotate(108 * Math.PI / 180)
        ctx.fillText(textList[1], 0, distance)
        ctx.rotate(-72 * Math.PI / 180)
        ctx.fillText(textList[2], 0, distance)
        ctx.rotate(-72 * Math.PI / 180)
        ctx.fillText(textList[3], 0, distance)
        ctx.rotate(108 * Math.PI / 180)
        ctx.textBaseline = 'bottom'
        ctx.fillText(textList[4], 0, -distance)
        ctx.rotate(-36 * Math.PI / 180)
        ctx.translate(-midX, -midY)
    }
}



function myBrowser() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
    } //判断是否Edge浏览器
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

//IE浏览器图片保存本地
function SaveAs5(imgURL) {
    var blob = dataURLtoBlob(imgURL);
    //支持IE11  
    window.navigator.msSaveBlob(blob, '下载.png');
}

//支持谷歌浏览器
function download(src) {
    let a = document.createElement('a');
    a.setAttribute("href", src);
    a.setAttribute("download", "");
    a.click()
};

function oDownLoad(url) {
    let myBrowserType = myBrowser()
    if (myBrowserType === "IE" || myBrowserType === 'Edge') {
        SaveAs5(url);
    } else {
        download(url);
    }
}

let eventHandler = {
    addEvent: (element, type, handler) => {
        if (element.addEventListener) {
            element.addEventListener(type, handler)
        } else if (element.attachEvent) {
            element.attachEvent(`on${type}`, handler)
        } else {
            element[`on${type}`] = handler
        }
    },
    getEvent: (event) => {
        return event || window.event;
    },
    preventDefault: (event) => {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}

export {
    drawCircle,
    drawTriangle,
    drawPentagon,
    oDownLoad,
    defaultColorList,
    selectColor,
    eventHandler,
}