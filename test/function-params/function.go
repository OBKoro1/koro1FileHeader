// 具名函数
func Add(a, b int) int {
    return a+b
}

// 匿名函数
var Add = func(a, b int) int {
    return a+b
}

// 可变数量的参数
// more 对应 []int 切片类型
func Sum(a int, more ...int) int {
    for _, v := range more {
        a += v
    }
    return a
}

// map参数


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
func Print(a ...interface{}) {
    fmt.Println(a...)
}


func (s UpperString) String() string {
    return strings.ToUpper(string(s))
}

func (p *UpperWriter) Write(data []byte) (n int, err error) {
    return p.Writer.Write(bytes.ToUpper(data))
}


