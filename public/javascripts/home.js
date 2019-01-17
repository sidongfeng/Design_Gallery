function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function GoSearch() {
	var color = _findColor();
	var widget = _findWidget();
	var category = _findCategory();
	//console.log(color);
	//console.log(widget);
	//console.log(category);
	location.href = "search?btnType="+"Spinner"+"&color="+"Blue"+"&category="+category+"&sortType=appDownloads&width=0%3B800&height=0%3B1280&page=1"; 
}

/*
function compareStr(str1,str2){
    if(str1.toLowerCase() == str2.toLowerCase()){
        return true;
    }else{
        return false;
    }
}
function combine(set1,set2){
	result = []
	if (set1.size==0){
		for (let a of Array.from(set2).reverse()) result.push(a);
		return result
	}else if (set2.size==0){
		for (let a of Array.from(set1).reverse()) result.push(a);
		return result
	}else{
		for (let a of Array.from(set1).reverse()){
			for (let b of Array.from(set2).reverse()){
				result.push(a+" "+b);
			}
		}
		return result
	}
}
*/
/*
//将字符串转换成二进制形式，中间用空格隔开
function strToBinary(str){
    var result = [];
    var list = str.split("");
    for(var i=0;i<list.length;i++){
        var item = list[i];
        var binaryStr = item.charCodeAt().toString(2);
        result.push(binaryStr);
    }   
    return result.join("");
}
function simHash(x,y){
	var xbinaryStr = [];
	var ybinaryStr = [];
	
	for (var i=0;i<(x.length)/2;i++){
		if ((i+1)*2>x.length){
			xbinaryStr.push(strToBinary(x.substr(2*i,1)));
		}else{
			xbinaryStr.push(strToBinary(x.substr(2*i,2)));
		}
	}
	for (var i=0;i<(y.length)/2;i++){
		if ((i+1)*2>y.length){
			ybinaryStr.push(strToBinary(y.substr(2*i,1)));
		}else{
			ybinaryStr.push(strToBinary(y.substr(2*i,2)));
		}
	}

	xbinaryStr[0] = xbinaryStr[0]*4;
	if (xbinaryStr.length>3){
		xbinaryStr[1] = xbinaryStr[1]*2;
	}	
	ybinaryStr[0] = ybinaryStr[0]*4;
	ybinaryStr[1] = ybinaryStr[1]*2;
	
	var xhash = [0,0,0,0,0,0,0];
	for (var i=0;i<xbinaryStr.length;i++){
		for (var j=0;j<xbinaryStr[i].length;j++){
			xhash[j] += xbinaryStr[i][j];
		}
	}

	return xbinaryStr
}
*/

/*

//两个字符串的相似程度，并返回相差字符个数
function strSimilarity2Number(s, t){
	var n = s.length, m = t.length, d=[];
	var i, j, s_i, t_j, cost;
	if (n == 0) return m;
	if (m == 0) return n;
	for (i = 0; i <= n; i++) {
		d[i]=[];
		d[i][0] = i;
	}
	for(j = 0; j <= m; j++) {
		d[0][j] = j;
	}
	for (i = 1; i <= n; i++) {
		s_i = s.charAt (i - 1);
		for (j = 1; j <= m; j++) {
			t_j = t.charAt (j - 1);
			if (s_i == t_j) {
				cost = 0;
			}else{
				cost = 1;
			}
		d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
		}
	}
	return d[n][m];
}
//两个字符串的相似程度，并返回相似度百分比
function strSimilarity2Percent(s, t){
	var l = s.length > t.length ? s.length : t.length;
	var d = strSimilarity2Number(s, t);
	return (1-d/l).toFixed(4);
}
function Minimum(a,b,c){
	return a<b?(a<c?a:c):(b<c?b:c);
}
*/