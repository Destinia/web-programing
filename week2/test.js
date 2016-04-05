function typeof(input){
	if(input ===NaN)return "Nan";
	else if([].isArray(input))return "Array";
	else if(input===null)return "null";
	else return typeof(input);
}

function counter(){
	var count = 0;
	return{
		getcount:function(){
			return count;
		},
		increase:function(){
			count++;
		},
		decrease:function(){
			count--;
		}
	}
}

function curryingSum(a){
	return function(b){
		return function(c){
			return a+b+c;
		};
	};
}