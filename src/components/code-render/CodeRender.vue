<template>
  <canvas ref="codeRender" :width="width" :height="height" @click="draw" style="cursor: pointer;"></canvas>
</template>

<script>
  function ranbNum(min,max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
  }

  function ranbColor(min,max) {
    let r = Math.floor(Math.random() * (max - min + 1) + min); //170+[0,80)
    let g = Math.floor(Math.random() * (max - min + 1) + min); //170+[0,80)
    let b = Math.floor(Math.random() * (max - min + 1) + min); //170+[0,80)
    return 'rgb('+ r +','+ g +','+ b +')';
  }

  export default {
    props: {
      value: {
        type: String
      },
      width: {
        type: Number,
        default: 120
      },
      height: {
        type: Number,
        default: 30
      }
    },
    mounted() {
      this.ctx = this.$refs.codeRender.getContext('2d');
      this.draw();
    },
    methods: {
      draw() {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);   //清空之前的矩形,释放空间
        ctx.fillStyle = ranbColor(170, 250);   //这里背景色的取值范围为[170,250],颜色比较适中
        ctx.fillRect(0,0,this.width,this.height);    //绘制矩形
        // 随机4位数
        const data = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
        let code = '';
        for (var i = 0; i < this.width ; i += this.height){
            let c = data[ranbNum(0, data.length - 1)]; // index为随机数,[0,data.length-1]  取字
            let fontSize = ranbNum(16, 40);
            code += c;
            ctx.fillStyle = ranbColor(60, 160);    //字体颜色
            ctx.font = fontSize + 'px SimHei';  //字体大小,字体
            ctx.fillText(c, i + ranbNum(5, 10), ranbNum(17, this.height));   //字体填充(字内容,x轴,y轴)
        }
        this.$emit('input', code)
        //绘制干扰线
        for (var i = 0;i < 10; i++) {
            ctx.beginPath(); //路径开始,子路经的集合
            ctx.moveTo(ranbNum(0,this.width),ranbNum(0,this.width));//起始点(x,y),都随机
            ctx.lineTo(ranbNum(0,this.width),ranbNum(0,this.width));//终止点(x,y)
            ctx.strokeStyle=ranbColor(60,160);//路径的颜色
            ctx.stroke();  //将上面的两个点连接起来
        }
        
        
        //绘制干扰点
        for (var i=0;i<10;i++) {
            ctx.beginPath(); //路径开始
            ctx.arc(ranbNum(0,this.width),ranbNum(0,this.height),ranbNum(1,5),0,2*Math.PI);//画圆(x,y,z,0,2*Math.PI) x坐标,y坐标,半径,完整圆
            ctx.strokeStyle=ranbColor(60,160);
            ctx.stroke();
        }
      },
    }
  }
</script>