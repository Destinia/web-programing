


//add new todo to list

//get the DOM
var todolist = document.getElementsByClassName('todo-list')[0];
var input = document.getElementsByClassName('new-todo')[0];
var todoleft = document.getElementsByClassName('todo-count')[0];
var clear = document.getElementsByClassName('clear-completed')[0];
var toggle_all = document.getElementsByClassName('toggle-all')[0];
var todo_count = 0;
var dragSrcEl = null;
//add event listener
input.addEventListener('keydown',function(event){
	if(event.keyCode == 13 && input.value.length){
		add2list(input.value);
		input.value = '';
	}
});

toggle_all.addEventListener('click',function(event){
	var toggles = document.querySelectorAll(".toggle");
	if(this.checked){
		[].forEach.call(toggles,function(t){
			t.checked = true;
			t.parentNode.parentNode.className = 'complete';
			todo_count--;
		});
	}
	else{
		[].forEach.call(toggles,function(t){
		t.checked = false;
		t.parentNode.parentNode.className = '';
		todo_count++;
		});
	}
	refresh_todo();
});
todolist.addEventListener('click',function(event){
	var target = event.target;
	var li = target.parentNode.parentNode;
	//check item
	if(target.nodeName=="INPUT"&&target.className=="toggle"&&target.type=="checkbox"){
		
		if(target.checked){
			li.className = 'complete';
			todo_count--;
			refresh_todo();
		}
		else{
			li.className = '';
			todo_count++;
			refresh_todo();
		}
	}
	//delete item
	else if(target.nodeName=="BUTTON"&&target.className=="destroy"){
		if(li.className != 'complete'){
			todo_count--;
			refresh_todo();
		}
		if(li.parentNode){
			li.parentNode.removeChild(li);
		}
	}
	else if(target.nodeName=="BUTTON"&&target.className=="moveup"){

		if(li.previousSibling != null){
			li.parentNode.insertBefore(li, li.previousSibling);
		}
	}
	else if(target.nodeName=="BUTTON"&&target.className=="movedown"){

		if(li.nextSibling != null){
			li.parentNode.insertBefore(li.nextSibling, li);
		}
	}
});

todolist.addEventListener('dblclick',function(event){
	console.log(event);
	var target = event.target
	if(target.nodeName == "LABEL"){

		var editinput = document.createElement('input');
		editinput.setAttribute('class','edit');
		target.parentNode.parentNode.classList.add('editing');
		target.parentNode.parentNode.appendChild(editinput);
	}
});

clear.addEventListener('click',function(event){
	var node = todolist.firstChild;
	while(node!=null){
		if(node.className == "complete"){
			var temp = node;
			node = node.nextSibling;
			todolist.removeChild(temp);
		}
		else
			node = node.nextSibling;
	}
});

function add2list(text){
	var newlist = document.createElement('li');

	newlist.setAttribute("draggable","true");

	newlist.innerHTML = addnewHTMLList(text);

	handleDrag(newlist);

	todolist.appendChild(newlist);

	todo_count++;

	refresh_todo();

}

function addnewHTMLList(text){
	return  '<div class = "view">' +
			'<input class = "toggle" type = "checkbox"></input>' + 
			'<label>' + text + '</label>' +
			'<button class = "moveup"></button>'  +
			'<button class = "movedown"></button>' +
			'<button class = "destroy"></button>' + 
			'</div>'
}
function refresh_todo(){
	todoleft.textContent = todo_count + "items left" ;
}

function handleDrag(item){


	function handleDragStart(event) {
	  	//this.style.opacity = '0.4';  // this / e.target is the source node.
	  	dragSrcEl = this;
	  	event.dataTransfer.effectAllowed = 'move';
  	  	event.dataTransfer.setData('text/html', this.innerHTML);
	}
	
	function handleDragOver(event) {
		if (event.preventDefault) {
		  event.preventDefault(); // Necessary. Allows us to drop.
		}

		event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		return false;
	}
	
	function handleDragEnter(event) {
	 	 // this / e.target is the current hover target.
	  	this.classList.add('over');
	}
	
	function handleDragLeave(event) {
	  	this.classList.remove('over');  // this / e.target is previous target element.
	}

	function handleDrop(event) {
		// e.target is current target element.
	
	 	if (event.stopPropagation) {
	 	  event.stopPropagation(); // stops the browser from redirecting.
	 	}
	 	// Don't do anything if dropping the same column we're dragging.
    	if (dragSrcEl != this) {
    	  // Set the source column's HTML to the HTML of the column we dropped on.
    	  dragSrcEl.innerHTML = this.innerHTML;
    	  this.innerHTML = event.dataTransfer.getData('text/html');
    	}
	  	// See the section on the DataTransfer object.
	
	  	return false;
	}
	
	function handleDragEnd(event) {
	  // this/e.target is the source node.
	
	  [].forEach.call(this.parentNode.childNodes, function (li) {
	    li.classList.remove('over');
	  });
	}
	

	item.addEventListener('dragstart', handleDragStart);
	item.addEventListener('dragenter', handleDragEnter);
	item.addEventListener('dragover', handleDragOver);
	item.addEventListener('dragleave', handleDragLeave);
	item.addEventListener('drop', handleDrop);
  	item.addEventListener('dragend', handleDragEnd);

}