<!--
 * Author       : OBKoro1
 * Date         : 2019-09-24 20:25:33
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-25 17:07:35
 * FilePath     : test.vue
 * description  : 
 * koroFileheader VSCode插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved. 
-->
<template>
  <div class="StudentList1">
  </div>
</template>

<script>
export default {
  name: 'StudentList22',
  props: {
    studentList: {
      type: Array,
      require: true
    }
  },
  methods: {
    clickItem (item, index) {
      this.$emit('clickItem', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.StudentList {
  background: #fff;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
  padding-top: 15px;
  .student_class {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    padding-bottom: 15px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 8px;
    }
    span {
      text-align: center;
      width: 70px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(33, 33, 33, 1);
      line-height: 20px;
    }
  }
  .no_margin {
    margin-right: 0;
  }
}
</style>
