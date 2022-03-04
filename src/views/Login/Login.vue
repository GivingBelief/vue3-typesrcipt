<template>
  <div class="m-login">
    <a-row>
      <a-col
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 16, offset: 4 }"
        :lg="{ span: 14, offset: 5 }"
        :xl="{ span: 12, offset: 6 }"
        :xxl="{ span: 10, offset: 7 }"
      >
        <div class="m-title">WYY测试</div>
        <a-form
          name="custom-validation"
          ref="formRef"
          :model="formState"
          :rules="rules"
          v-bind="layout"
        >
          <a-form-item has-feedback label="账号(admin)" name="user">
            <a-input v-model:value="formState.user" autocomplete="off" />
          </a-form-item>
          <a-form-item has-feedback label="密码(123456)" name="pass">
            <a-input
              v-model:value="formState.pass"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item has-feedback label="确认密码(123456)" name="checkPass">
            <a-input
              v-model:value="formState.checkPass"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item has-feedback label="验证码" class="m-code" name="code">
            <a-row :gutter="10">
              <a-col>
                <a-input
                  class="m-code-input"
                  v-model:value="formState.code"
                  autocomplete="off"
                />
              </a-col>
              <a-col :span="8">
                <canvas
                  @click="refresh"
                  :width="width"
                  :height="height"
                  ref="verifyCanvas"
                  :style="{
                    cursor: 'pointer',
                    zIndex: 9999,
                    position: 'relative',
                  }"
                ></canvas>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit" @click="determine"
              >确定</a-button
            >
            <a-button style="margin-left: 10px" @click="resetForm"
              >重置</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { RuleObject } from "ant-design-vue/es/form/interface";
import { reactive, ref, UnwrapRef, onMounted } from "vue";
import { useRouter } from "vue-router";
interface FormState {
  user: string;
  pass: string;
  checkPass: string;
  code: string;
}
export default {
  name: "Login",
  props: {
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 32,
    },
    type: {
      type: String,
      default: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    },
  },
  setup(props: any, { expose }: any) {
    const router = useRouter();
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      user: "admin",
      pass: "123456",
      checkPass: "123456",
      code: "",
    });
    let validateUser = async (rule: RuleObject, value: string) => {
      if (value === "") {
        return Promise.reject("请输入账号");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass = async (rule: RuleObject, value: string) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (rule: RuleObject, value: string) => {
      if (value === "") {
        return Promise.reject("请重新输入密码");
      } else if (value !== formState.pass) {
        return Promise.reject("两个输入不匹配!");
      } else {
        return Promise.resolve();
      }
    };
    let validateCode = async (rule: RuleObject, value: string) => {
      if (value === "") {
        return Promise.reject("请输入正确的验证码");
      }
    };

    const rules = {
      user: [{ required: true, validator: validateUser, trigger: "change" }],
      code: [{ required: true, validator: validateCode, trigger: "change" }],
      pass: [{ required: true, validator: validatePass, trigger: "change" }],
      checkPass: [
        { required: true, validator: validatePass2, trigger: "change" },
      ],
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    // ++++++++++++++++++ 二维码
    let numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
    let letterArr =
      "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(
        ","
      );
    const code = ref("");
    const CharacterVerification = ref<HTMLDivElement | null>(null);
    const verifyCanvas = ref<HTMLCanvasElement | null>(null);
    let ctx;
    let txtArr;
    let txt;
    onMounted(() => {
      refresh();
    });
    const refresh = () => {
      code.value = "";
      if (verifyCanvas.value?.getContext) {
        ctx = verifyCanvas.value.getContext("2d") as CanvasRenderingContext2D;
      } else {
        return;
      }

      ctx.textBaseline = "middle";

      ctx.fillStyle = randomColor(180, 240);
      ctx.fillRect(0, 0, props.width, props.height);

      if (props.type == "blend") {
        //判断验证码类型
        txtArr = numArr.concat(letterArr);
      } else if (props.type == "number") {
        txtArr = numArr;
      } else {
        txtArr = letterArr;
      }

      for (var i = 1; i <= 4; i++) {
        txt = txtArr[randomNum(0, txtArr.length)];
        code.value += txt;
        ctx.font = "35px SimHei"; //随机生成字体大小
        ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
        ctx.shadowOffsetX = randomNum(-3, 3);
        ctx.shadowOffsetY = randomNum(-3, 3);
        ctx.shadowBlur = randomNum(-3, 3);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        var x = (props.width / 5) * i;
        var y = props.height / 2;
        var deg = randomNum(-30, 30);
        /**设置旋转角度和坐标原点**/
        ctx.translate(x, y);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(txt, 0, 0);
        /**恢复旋转角度和坐标原点**/
        ctx.rotate((-deg * Math.PI) / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height));
        ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height));
        ctx.stroke();
      }
      /**绘制干扰点**/
      for (let i = 0; i < props.width / 4; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          randomNum(0, props.width),
          randomNum(0, props.height),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    };
    /**生成一个随机色**/
    const randomColor = (min: number, max: number) => {
      var r = randomNum(min, max);
      var g = randomNum(min, max);
      var b = randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
    /**生成一个随机数**/
    const randomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    /**验证验证码**/
    const validate = (iptCode: string) => {
      var newIptCode = iptCode.toLowerCase();
      var v_code = code.value.toLowerCase();
      if (newIptCode == v_code) {
        return true;
      } else {
        refresh();
        return false;
      }
    };
    // ++++++++++++++++++ 二维码
    // 重置
    const resetForm = () => {
      formRef.value.resetFields();
    };
    //确定
    const determine = () => {
      if (code.value.toLowerCase() === formState.code.toLowerCase()) {
        // 登录成功手动存token
        var token = numArr.concat(letterArr);
        var res = "";
        for (var i = 0; i < token.length; i++) {
          var id = Math.ceil(Math.random() * 35);
          res += token[id];
        }
        localStorage.setItem("token", res);
        // 登录成功手动存token
        localStorage.setItem("userInformation", JSON.stringify(formState));
        router.push("/home");
      } else {
        formState.code = "";
      }
    };
    // 暴露方法
    expose({ validate });
    return {
      formState,
      formRef,
      rules,
      layout,
      resetForm,
      determine,
      CharacterVerification,
      verifyCanvas,
      refresh,
    };
  },
};
</script>
<style scoped>
.m-login {
  height: 500px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.m-code .ant-form-item-control-input {
  display: flex;
}
.m-code .m-code-input {
  width: 150px;
}
.m-title {
  font-size: 20px;
  margin-bottom: 10px;
}
:global(.ant-form-item-explain-error) {
  text-align: left;
}
</style>
