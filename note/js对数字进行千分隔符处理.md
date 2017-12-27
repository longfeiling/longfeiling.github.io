```
// 千分隔符转化
function comdify(val) {
  let exp = /\d{1,3}(?=(/d{3}+$)/g;
  let n1 = val.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
    return s1.replace(re, "$&,") + s2;
  });
  return n1;
}

// function delcomdify(num) {
  num = num.toString();
  num = num.replace(/,/gi, '');
  return num;
}

function addCommas(val) { while (/(\d+)(\d{3})/.test(val.toString())) { val = val.toFixed(2).toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); } return val; }
```