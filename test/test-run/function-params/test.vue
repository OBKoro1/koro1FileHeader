<template>
  <div class="error_page"
       v-if="showError">
    <img src="@/assets/error.png"
         class="tip_img" />
    <div class="title">已停止访问该页面</div>
    <p class="tip">根据晓黑板安全中心检测，该网页包含不安全<br />或与学习无关内容，已停止访问。</p>

  </div>
  <form v-else
        ref="myForm"
        :action="url"
        style="display: none;"
        method="get"
        target="_self">
    <input type="text"
           style="display:none"
           name="token"
           :value="$route.query.token">
    <input type="text"
           style="display:none"
           name="orginUrl"
           :value="jump">
  </form>
</template>

<script>
import a from './function.jsx'
export default {
  name: 'errorPage',
  data () {
    return {
      showError: false,
      url: `${process.env.VUE_APP_BASE_URL}/api/urlappraisal`,
      jump: ''
    }
  },
  mounted () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // 移动端操作
      console.log('移动端')
      this.mobileHandle()
    } else {
      // PC端操作
      console.log('PC端')
      this.webHadle()
    }
  },
  methods: {
    webHadle() {
      document.title = '跳转'
      const query = this.$route.query
      this.jump = query.jump
      const orginUrl = encodeURIComponent(query.orginUrl) // 转码原链接防止参数丢失
      const url = `${this.url}?orginUrl=${orginUrl}&token=${query.token}`
      console.log('url', this.url, url, this.query)
      if (query.check === 'need') {
        location.href = url
      } else {
        document.title = '提示'
        this.showError = true // 后端跳转回来 显示错误页面
      }
    },
    mobileHandle(a, b, c) {
      document.title = '跳转'
      const query = this.$route.query
      this.jump = query.jump

      if (query.check === 'need') {
        if (query.jump.match(/^flutter:(\/|\\)(\/|\\)/)) { query.jump = `https://xp.xiaoheiban.cn?${query.jump}` }
        if (!query.jump.match(/^http(s)?:(\\|\/)(\\|\/)/)) { this.jump = `https://${query.jump}` }
        this.$nextTick(() => {
          console.log(1)
          this.$mount()
          this.$refs.myForm.submit()
        })
      // location.href = url
      } else {
        document.title = '提示'
        this.showError = true // 后端跳转回来 显示错误页面
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .error_page {
    color: #333333;
    text-align: center;
    .tip_img {
      height: 64px;
      margin-top: 64px;
      display: inline-block;
    }
    .title {
      margin: 32px 0 12px;
      font-size: 18px;
      font-weight: 500;
      color: #333333;
    }
    .tip {
      font-size: 14px;
      color: #868b91;
      line-height: 22px;
    }
  }
}

@media (max-width: 2000px) {
  .error_page {
    color: #333333;
    text-align: center;
    .tip_img {
      height: 64px;
      margin-top: 200px;
      display: inline-block;
    }
    .title {
      margin: 0 0 16px 0;
      font-size: 24px;
      font-weight: 500;
      line-height: 24px;
      color: #1d2126;
    }
    .tip {
      font-size: 14px;
      color: #81858c;
      line-height: 22px;
    }
  }
}
</style>
