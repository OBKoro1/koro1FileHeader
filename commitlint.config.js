module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'scope-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 增加新功能
        'fix', // 修复bug
        'build', // 构造工具的或者外部依赖的改动，例如webpack，npm
        'chore', // 不修改src或者test的其余修改，例如构建过程或辅助工具的变动
        'ci', // 与CI（持续集成服务）有关的改动
        'docs', // 只改动了文档相关的内容
        'style', // 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
        'perf', // 提高性能的改动
        'refactor', // 代码重构时使用
        'revert', // 执行git revert打印的message
        'test' // 添加测试或者修改现有测试
      ]
    ]
  }
}
