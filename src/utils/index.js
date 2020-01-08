import _ from 'lodash'
import moment from 'moment'
import { saveAs } from 'file-saver'

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function interArrayTree(array) {
  let _array = _.cloneDeep(array)
   const interFunction = (tree) => {
     _.forEach(tree, n => {
       if (n.child && n.child.length) {
         n.children = n.child
         interFunction(n.child)
       }
     })
   }
   interFunction(_array)
   return _array
}


export function getOrgan() {
  return JSON.parse(localStorage.getItem('organ'))
}

export function getDictById(id) {
  let dictionary = localStorage.getItem('dictionary')
  if (!dictionary) {
    return []
  }
  let parsedDic = JSON.parse(dictionary)
  let result = parsedDic[id]
  return result || []
}

export function generateDateAxis(config) {
  // 合并参数
  let p = Object.assign({
      // 类型
      type: '年',
      // 方向
      direction: 'prev',
      // 模板
      source: '',
      target: 'YYYYMMDD',
      // 开始
      start: moment(),
      // 时间轴长度，默认2个
      length: 2,
      // 处理时间轴单个时间的方法
      forEach: function (item, idx, axis) {
          return item;
      },
      // 停止添加时间轴元素的方法
      stop: function (item, idx, axis) {
          return false;
      },
      // 升序 ascend(asc) || 降序 descend(desc)
      sort: 'asc'
  }, config);

  // 时间类型映射表
  const DATE_TYPE_MAP = {
      'year|年': 'years',
      'month|月': 'months',
      'week|周|星期': 'weeks',
      'day|日|天': 'days',
  };
  // 类型
  let type = '', tstr, treg;

  // 根据参数type获取moment需要加减的单位(年|月|星期|日)
  for (tstr in DATE_TYPE_MAP) {
      treg = new RegExp(tstr);
      if (treg.test(p.type)) {
          type = DATE_TYPE_MAP[tstr];
          break;
      }
  }

  let direction = p.direction === 'prev' ? 'subtract' : 'add', // 减 || 加
      Sattern = p.source || p.target, // 源模板
      Tpattern = p.target, // 目标模板
      start = p.start, // 开始时间
      sort = p.sort === 'asc' ? 'unshift' : 'push', // 排序
      unit, // 时间轴单个元素
      idx = 0, // 时间轴下标
      newStart;

  // 循环获取单个时间，并通过forEach方法处理，然后放入result数组返回
  let axis = (function loop(l, r) {

      newStart = moment(start, Sattern)[direction](idx, type).format(Tpattern);

      // 处理生成的时间轴元素
      unit = p.forEach(newStart, idx, r);

      // 处理后的元素合法则放进结果数组
      r[sort](unit);

      if (r.length === l || p.stop(unit, idx, r)) {
          return r;
      }

      idx++;

      return loop(l, r);

  })(p.length, []);

  return axis;
}

export function download(files) {
  const downloadFile = (href) => {
    saveAs(href)
  }
  _.forEach(files, n => {
    downloadFile(n)
  })
}

/**
 * 根据字典的value查找对应的树结构
 */

export function findTreeLabel(dic, value, props)  {
  const DIC_SPLIT = '/'
  const valueKey = props.value;
  const labelKey = props.label;
  const childrenKey = props.children;
  function getPathByKey(value, key, arr, labelKey, childrenKey) {
    let tempPath = [];
    try {
        function getNodePath(node){
          // 这里可以自定义push的内容，而不是整个node,而且这里node也包含了children
          tempPath.push(node);
          //找到符合条件的节点，通过throw终止掉递归
          if (node[key] === value) {
            throw ("GOT IT!");
          }
          if (node[childrenKey] && node[childrenKey].length > 0) {
            for (var i = 0; i < node[childrenKey].length; i++) {
              getNodePath(node[childrenKey][i]);
            }

            //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
            tempPath.pop();
          }
          else {

            //找到叶子节点时，删除路径当中的该叶子节点
            tempPath.pop();
          }
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
      return tempPath;
    }
  }
  let result = getPathByKey(value, valueKey, dic, labelKey, childrenKey)
  if (!result) {
    return value
  } else {
    return result.map(n => n[labelKey]).join(DIC_SPLIT)
  }
}