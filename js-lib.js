/**
 @description 页面垂直平滑滚动到指定滚动高度
 @author zhangxinxu(.com)
*/
var scrollSmoothTo = function(position) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      return setTimeout(callback, 17)
    }
  }
  // 当前滚动高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 滚动step方法
  var step = function() {
    // 距离目标滚动距离
    var distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}

/**
 * @description REM自适应JS - 这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
 * @author zhangxinxu(.com)
 * @param {designWidth(设计稿的实际宽度值，需要根据实际设置), maxWidth(制作稿的最大宽度值，需要根据实际设置)}
 */
;(function(designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    tid

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    maxWidth = maxWidth || 540
    width > maxWidth && (width = maxWidth)
    var rem = (width * 100) / designWidth
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem()

  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid) //防止执行两次
      tid = setTimeout(refreshRem, 300)
    },
    false
  )

  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function(e) {
        doc.body.style.fontSize = '16px'
      },
      false
    )
  }
})(750, 750)

/**
@description 二维数组合并，可以是string，目前深度最多二维
@author choujiaojiao
@parmas {array - 目标数组}
*/
function mergeArray(array) {
  let prevAry = array[0]
  for (let i = 1; i < array.length; i++) {
    prevAry = mergeResArray(prevAry, array[i])
  }
  return prevAry

  function mergeResArray(prevAry, nextAry) {
    prevAry = Array.isArray(prevAry) ? prevAry : prevAry.split(' ')
    nextAry = Array.isArray(nextAry) ? nextAry : nextAry.split(' ')
    let resAry = []
    prevAry.forEach(prevItem => {
      nextAry.forEach(nextItem => {
        resAry.push(prevItem + nextItem)
      })
    })
    return resAry
  }
}

/**
@description 快速排序
@author ruanyifeng(http://www.ruanyifeng.com)
@parmas {ar - 目标数组}
*/
var quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

/**
@description 倒计时
@author choujiaojiao
@parmas {timestemp - 倒计时时间}
*/
function countDown(timestemp) {
  //获取时间差
  var timediff = Math.round(timestemp / 1000)
  //获取还剩多少天
  var day = parseInt(timediff / 3600 / 24)
  //获取还剩多少小时
  var hour = parseInt((timediff / 3600) % 24)
  //获取还剩多少分钟
  var minute = parseInt((timediff / 60) % 60)
  //获取还剩多少秒
  var second = timediff % 60
  //当前时间戳减去一秒钟
  timestemp = timestemp - 1000
  if (timestemp < 0) return
  setTimeout(function() {
    show(timestemp)
  }, 1000)
}

/**
@description 简易版深拷贝
@author yck 掘金小册
@parmas {obj - 拷贝目标}
*/
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }
  if (!isObject(obj)) {
    throw new Error('非对象')
  }
  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}

/**
@description 函数防抖
@author https://juejin.im/post/5c404329e51d4551e064a332
@parmas {fn - 执行函数}
@parmas {delay - 时间}
*/
function debounce(fn, delay) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
@description 函数节流
@author https://juejin.im/post/5c404329e51d4551e064a332
@parmas {fn - 执行函数}
@parmas {cycle - 节流时间}
*/
function throttle(fn, cycle) {
  let start = Date.now()
  let now
  let timer
  return function() {
    now = Date.now()
    clearTimeout(timer)
    if (now - start >= cycle) {
      fn.apply(this, arguments)
      start = now
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, cycle)
    }
  }
}

/*** 操作localstorage ***/
/**
 * Set storage
 *
 * @param name
 * @param content
 * @param maxAge
 */
export const setStore = (name, content, maxAge = null) => {
  if (!global.window || !name) {
    return
  }

  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }

  const storage = global.window.localStorage

  storage.setItem(name, content)
  if (maxAge && !isNaN(parseInt(maxAge))) {
    const timeout = parseInt(new Date().getTime() / 1000)
    storage.setItem(`${name}_expire`, timeout + maxAge)
  }
}

/**
 * Get storage
 *
 * @param name
 * @returns {*}
 */
export const getStore = name => {
  if (!global.window || !name) {
    return
  }

  const content = window.localStorage.getItem(name)
  const _expire = window.localStorage.getItem(`${name}_expire`)

  if (_expire) {
    const now = parseInt(new Date().getTime() / 1000)
    if (now > _expire) {
      return
    }
  }

  try {
    return JSON.parse(content)
  } catch (e) {
    return content
  }
}

/**
 * Clear storage
 *
 * @param name
 */
export const clearStore = name => {
  if (!global.window || !name) {
    return
  }

  window.localStorage.removeItem(name)
  window.localStorage.removeItem(`${name}_expire`)
}

/**
 * Clear all storage
 */
export const clearAll = () => {
  if (!global.window || !name) {
    return
  }

  window.localStorage.clear()
}

/**
@description js操作技巧
@author https://juejin.im/post/5cc7afdde51d456e671c7e48
*/

/*String Skill*/

//时间对比：时间个位数形式需补0

const time1 = '2019-03-31 21:00:00'
const time2 = '2019-05-01 09:00:00'
const overtime = time1 > time2
// overtime => false

//格式化金钱：带小数无效

const thousand = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const money = thousand(19941112)
// money => "19,941,112"

//生成随机ID

const randomId = len =>
  Math.random()
    .toString(36)
    .substr(3, len)
const id = randomId(10)
// id => "jg7zpgiqva"

//生成随机HEX色值

const randomColor = () =>
  '#' +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')
const color = randomColor()
// color => "#f03665"

//生成星级评分

const startScore = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
const start = startScore(3)
// start => "★★★"

//操作URL查询参数

const params = new URLSearchParams(location.search) // location.search = "?name=yajun&sex=female"
params.has('yajun') // true
params.get('sex') // "female"

/*Number Skill*/

//取整：代替正数的Math.floor()，代替负数的Math.ceil()

const num1 = ~~1.69
const num2 = 1.69 | 0
const num3 = 1.69 >> 0
// num1 num2 num3 => 1 1 1

//补零

const fillZero = (num, len) => num.toString().padStart(len, '0')
const num = fillZero(169, 5)
// num => "00169"

//转数值：只对null、""、false、数值字符串有效

const num1 = +null
const num2 = +''
const num3 = +false
const num4 = +'169'
// num1 num2 num3 num4 => 0 0 0 169

//精确小数

const round = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
const num = round(1.69, 1)
// num => 1.7

//判断奇偶

const num = 0
const odd = !!(num & 1)
// odd => false

//取最小最大值

const arr = [0, 1, 2]
const min = Math.min(...arr)
const max = Math.max(...arr)
// min max => 0 2

/*Boolean Skill*/

//短路运算符

const a = d && 1 // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1 // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d // 取假赋值：单个表达式转换为true则返回false，否则返回true

//是否为空数组

const arr = []
const flag = Array.isArray(arr) && !arr.length
// flag => true

//是否为空对象

const obj = {}
const flag =
  !Array.isArray(obj) &&
  Object.prototype.toString.call(obj) &&
  !Object.keys(obj).length
// flag => true

//满足条件时执行

const flagA = true // 条件A
const flagB = false // 条件B
;(flagA || flagB) && Func() // 满足A或B时执行
;(flagA || !flagB) && Func() // 满足A或不满足B时执行
flagA && flagB && Func() // 同时满足A和B时执行
flagA && !flagB && Func() // 满足A且不满足B时执行

//为非假值时执行

const flag = false // undefined、null、""、0、false、NaN
!flag && Func()

//数组不为空时执行

const arr = [0, 1, 2]
arr.length && Func()

//对象不为空时执行

const obj = { a: 0, b: 1, c: 2 }
Object.keys(obj).length && Func()

//函数退出代替条件分支退出

if (flag) {
  Func()
  return false
}
// 换成
if (flag) {
  return Func()
}
/*Array Skill*/

//克隆数组

const _arr = [0, 1, 2]
const arr = [..._arr]
// arr => [0, 1, 2]

//合并数组

const arr1 = [0, 1, 2]
const arr2 = [3, 4, 5]
const arr = [...arr1, ...arr2]
// arr => [0, 1, 2, 3, 4, 5];

//去重数组

const arr = [...new Set([0, 1, 1, null, null])]
// arr => [0, 1, null]

//混淆数组

const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - 0.5)
// arr => [3, 4, 0, 5, 1, 2]

//交换赋值

let a = 0
let b = 1
;[a, b] = [b, a]
// a b => 1 0

//过滤空值：undefined、null、""、0、false、NaN

const arr = [undefined, null, '', 0, false, NaN, 1, 2].filter(Boolean)
// arr => [1, 2]

//异步累计

async function Func(deps) {
  return deps.reduce(async (t, v) => {
    const dep = await t
    const version = await Todo(v)
    dep[v] = version
    return dep
  }, Promise.resolve({}))
}
const result = await Func() // 需在async包围下使用

//首部插入元素

let arr = [1, 2] // 以下方法任选一种
arr.unshift(0)
arr = [0].concat(arr)
arr = [0, ...arr]
// arr => [0, 1, 2]

//尾部插入元素

let arr = [0, 1] // 以下方法任选一种
arr.push(2)
arr.concat(2)
arr[arr.length] = 2
arr = [...arr, 2]
// arr => [0, 1, 2]

//统计元素个数

const arr = [0, 1, 1, 2, 2, 2]
const count = arr.reduce((t, c) => {
  t[c] = t[c] ? ++t[c] : 1
  return t
}, {})
// count => { 0: 1, 1: 2, 2: 3 }

//创建指定长度数组

const arr = [...new Array(3).keys()]
// arr => [0, 1, 2]

//创建指定长度且值相等的数组

const arr = [...new Array(3).keys()].fill(0)
// arr => [0, 0, 0]

//reduce代替map和filter

const _arr = [0, 1, 2]

// map
const arr = _arr.map(v => v * 2)
const arr = _arr.reduce((t, c) => {
  t.push(c * 2)
  return t
}, [])
// arr => [0, 2, 4]

// filter
const arr = _arr.filter(v => v > 0)
const arr = _arr.reduce((t, c) => {
  c > 0 && t.push(c)
  return t
}, [])
// arr => [1, 2]

// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2)
const arr = _arr.reduce((t, c) => {
  c = c * 2
  c > 2 && t.push(c)
  return t
}, [])
// arr => [4]
/*Object Skill*/

//克隆对象

const _obj = { a: 0, b: 1, c: 2 } // 以下方法任选一种
const obj = { ..._obj }
const obj = JSON.parse(JSON.stringify(_obj))
// obj => { a: 0, b: 1, c: 2 }

//合并对象

const obj1 = { a: 0, b: 1, c: 2 }
const obj2 = { c: 3, d: 4, e: 5 }
const obj = { ...obj1, ...obj2 }
// obj => { a: 0, b: 1, c: 3, d: 4, e: 5 }

//对象字面量：获取环境变量时必用此方法，用它一直爽，一直用它一直爽

const env = 'prod'
const link = {
  dev: 'Development Address',
  test: 'Testing Address',
  prod: 'Production Address'
}[env]
// env => "Production Address"

//创建纯空对象

const obj = Object.create(null)
Object.prototype.a = 0
// obj => {}

//解构嵌套属性

const obj = { a: 0, b: 1, c: { d: 2, e: 3 } }
const {
  c: { d, e }
} = obj
// d e => 2 3

//解构对象别名

const obj = { a: 0, b: 1, c: 2 }
const { a, b: d, c: e } = obj
// a d e => 0 1 2

//删除无用属性

const obj = { a: 0, b: 1, c: 2 } // 只想拿b和c
const { a, ...rest } = obj
// rest => { b: 1, c: 2 }

/*Function Skill*/

//函数自执行

const Func = (function() {})() // 常用

;(function() {})() // 常用
;(function() {})() // 常用
;[(function() {})()]
;+(function() {})()
;-(function() {})()
~(function() {})()
!(function() {})()

new (function() {})()
new (function() {})()
void (function() {})()
typeof (function() {})()
delete (function() {})()

1, (function() {})()
1 ^ (function() {})()
1 > (function() {})()

//隐式返回值：只能用于单语句返回值箭头函数，如果返回值是对象必须使用()包住

const Func = function(name) {
  return 'I Love ' + name
}
// 换成
const Func = name => 'I Love ' + name

//一次性函数：适用于运行一些只需执行一次的初始化代码

function Func() {
  console.log('x')
  Func = function() {
    console.log('y')
  }
}

//惰性载入函数：函数内判断分支较多较复杂时可大大节约资源开销

function Func() {
  if (a === b) {
    console.log('x')
  } else {
    console.log('y')
  }
}
// 换成
function Func() {
  if (a === b) {
    Func = function() {
      console.log('x')
    }
  } else {
    Func = function() {
      console.log('y')
    }
  }
  return Func()
}

//检测非空参数

function IsRequired() {
  throw new Error('param is required')
}
function Func(name = IsRequired()) {
  console.log('I Love ' + name)
}
Func() // "param is required"
Func('雅君妹纸') // "I Love 雅君妹纸"

//字符串创建函数

const Func = new Function('name', 'console.log("I Love " + name)')

//优雅处理错误信息

try {
  Func()
} catch (e) {
  location.href = 'https://stackoverflow.com/search?q=[js]+' + e.message
}

//优雅处理Async/Await参数

function AsyncTo(promise) {
  return promise.then(data => [null, data]).catch(err => [err])
}
const [err, res] = await AsyncTo(Func())

//优雅处理多个函数返回值

function Func() {
  return Promise.all([fetch('/user'), fetch('/comment')])
}
const [user, comment] = await Func() // 需在async包围下使用
/*DOM Skill*/

//显示全部DOM边框：调试页面元素边界时使用

;[].forEach.call($$('*'), dom => {
  dom.style.outline =
    '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
})

//自适应页面：页面基于一张设计图但需做多款机型自适应，元素尺寸使用rem进行设置

function AutoResponse(width = 750) {
  const target = document.documentElement
  target.clientWidth >= 600
    ? (target.style.fontSize = '80px')
    : (target.style.fontSize = (target.clientWidth / width) * 100 + 'px')
}
