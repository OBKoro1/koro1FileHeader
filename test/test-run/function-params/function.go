/**
 * @description: 222111
 * @param {*} a
 * @param {int} b
 * @return {*}
 */
func Add(a, b int) int {
    return a+b
}

// 匿名函数
/**
 * @description: 
 * @param {*} a
 * @param {int} b
 * @return {*}
 */
var Add = func(a, b int) int {
    return a+b
}

// 可变数量的参数
/**
 * @description: 
 * @param {int} a
 * @param {...int} more
 * @return {*}
 */
func Sum(a int, more ...int) int {
    for _, v := range more {
        a += v
    }
    return a
}

// map参数


/**
 * @description: 
 * @param {map[int]int} m
 * @param {int} key
 * @return {*}
 */
func Find(m map[int]int, key int) (value int, ok bool) {
    value, ok = m[key]
    return
}

/**
 * @description: 
 * @param {*File} f
 * @param {int64} offset
 * @param {[]byte} data
 * @return {*}
 */
func ReadFile(f *File, offset int64, data []byte) int {
    // ...
}


// 当可变参数是一个空接口类型时，调用者是否解包可变参数会导致不同的结果
/**
 * @description: 
 * @param {...interface{}} a
 * @return {*}
 */
func Print(a ...interface{}) {
    fmt.Println(a...)
}


/**
 * @description: 
 * @param {*}
 * @return {*}
 */
func (s UpperString) String() string {
    return strings.ToUpper(string(s))
}

/**
 * @description: 
 * @param {[]byte} data
 * @return {*}
 */
func (p *UpperWriter) Write(data []byte) (n int, err error) {
    return p.Writer.Write(bytes.ToUpper(data))
}


/**
 * @description: 
 * @param {*trace.Trace} tc
 * @param {int64} userID
 * @param {*} mobile
 * @param {string} mobileTyp
 * @return {*}
 */
func (u *Users) UpdateMobile(tc *trace.Trace, userID int64, mobile, mobileTyp string) error {
}
/**
 * @description: 
 * @param {*trace.Trace} tc
 * @param {int64} userID
 * @param {*} mobile
 * @param {string} mobileTyp
 * @return {*}
 */
func (u *Users) UpdateMobile(tc *trace.Trace, userID int64, mobile, mobileTyp string) (err error,ans type) {
}

// 正确函数注释开始
// @name:QueryUsersIDs
// @param  cond
// @param  ans
// @param  tc
// @return error
// 正确函数注释结束
// 此为函数签名
/**
 * @description: 
 * @param {map[string]interface{}} cond
 * @param {*[]int64} ans
 * @param {*trace.Trace} tc
 * @return {*}
 */
func QueryUsersIDs(cond map[string]interface{}, ans *[]int64, tc *trace.Trace) error {
}