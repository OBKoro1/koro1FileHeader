执行commit hooks --- koroFileHeader
init
cmd git diff --cached
res diff --git a/src/main.js b/src/main.js
index 9b1a480..4fc9551 100644
--- a/src/main.js
+++ b/src/main.js
@@ -3,8 +3,9 @@
  * @Github: https://github.com/OBKoro1
  * @Date: 2019-01-23 19:50:26
  * @LastEditors: OBKoro1
- * @LastEditTime: 2019-02-18 18:50:04
+ * @LastEditTime: 2019-08-31 20:51:20
  * @Description: html5 notification(桌面通知)
+ * test 哈哈哈
  */
 
 import util from './util.js';
diff --git a/src/util.js b/src/util.js
index 03c5540..f3bce52 100644
--- a/src/util.js
+++ b/src/util.js
@@ -1,3 +1,12 @@
+/*
+ * @Github: https://github.com/OBKoro1
+ * @Author: OBKoro1
+ * @Created_time: 2019-08-31 18:14:40
+ * @LastEditors: OBKoro1
+ * @LastEditTime: 2019-08-31 20:52:29
+ * @Description: 通用工具
+ */
+
 // 检查数据格式
 const checkData = (type, data) => {
   if (!type || !data) return false;

cmd git diff --staged
res diff --git a/src/main.js b/src/main.js
index 9b1a480..4fc9551 100644
--- a/src/main.js
+++ b/src/main.js
@@ -3,8 +3,9 @@
  * @Github: https://github.com/OBKoro1
  * @Date: 2019-01-23 19:50:26
  * @LastEditors: OBKoro1
- * @LastEditTime: 2019-02-18 18:50:04
+ * @LastEditTime: 2019-08-31 20:51:20
  * @Description: html5 notification(桌面通知)
+ * test 哈哈哈
  */
 
 import util from './util.js';
diff --git a/src/util.js b/src/util.js
index 03c5540..f3bce52 100644
--- a/src/util.js
+++ b/src/util.js
@@ -1,3 +1,12 @@
+/*
+ * @Github: https://github.com/OBKoro1
+ * @Author: OBKoro1
+ * @Created_time: 2019-08-31 18:14:40
+ * @LastEditors: OBKoro1
+ * @LastEditTime: 2019-08-31 20:52:29
+ * @Description: 通用工具
+ */
+
 // 检查数据格式
 const checkData = (type, data) => {
   if (!type || !data) return false;

cmd git diff --cached --name-status HEAD
res M   src/main.js
M       src/util.js

[koro_branch debfe49] 111
 2 files changed, 11 insertions(+), 1 deletion(-)