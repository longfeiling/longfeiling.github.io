<div class="parent">
	<div class="child">水平垂直居中demo</div>
</div>

## flex布局
```
.parent{
	display: flex;
	justify-content: center;
	align-item: center;
}
```
缺点：有兼容性问题

## table-cell
```
.parent{
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
.child { display: inline-block;}
```

## absolute + tranform
```
.parent{position: relative}
.children{
	position: absolute;
	left: 50%;
	top: 50%；
	transfrom: translate(-50%, -50%);
}
```

## absolute + margin
```
.parent{position: relative;}
.child{
	position: absolute;
	width: 100px;
	height: 100px;
	top: 50%;
	left: 50%;
	margin-left: -50px;
	margin-top: -50px;
}
```
缺点： 要设置子容器的宽高

## absolute + margin:auto 上下左右都为0
```
.parent{positon: relative}
.child {
	margin: auto;
	position: absolute;
	widht: 100px;
	height: 100px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
```