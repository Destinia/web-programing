var http_post = function (where, text_to_send, callback) {
  console.log(where);
  if (typeof where !== 'string') throw TypeError();
  if (typeof text_to_send !== 'string') throw TypeError();
  if (typeof callback !== 'function') throw TypeError();
  // temp = JSON.parse('{"nickname":"","emoji":6,"message":""}');
  //console.log(temp["emoji"]);
  fetch(where, {method: 'POST', body: text_to_send})
    .then(function (response) {
      return response.text();
    })
    .then(function (server_response_text) {
      callback(server_response_text);
    })
    .catch(function (err) {
      callback(null, err);
    });
};



        
      var data_acc  = function(result){
        var data_arr = JSON.parse(result);
        console.log(result);
        var width=240,height=120;
        var s=d3.select('#acc');
        s.selectAll("path").remove();
        s.selectAll("g").remove();
        s.attr({

          'width':'300',
          'height':'180'
        }).style({
          'border':'1px dotted #aaa'
        });
        var scaleX=d3.scale.linear()
           .range([0,width])
           .domain([0,data_arr.length]);
        var scaleY=d3.scale.linear()
           .range([height,0])
           .domain([0.5,1.5]);
        var linex=d3.svg.line()
            .x(function(d){return scaleX(d.n);})  
            .y(function(d){return scaleY(Math.sqrt(d.x*d.x+d.y*d.y+d.z*d.z));});
        var axisX = d3.svg.axis()
           .scale(scaleX)
           .orient("bottom")
           .ticks(8);
        var axisY = d3.svg.axis()
           .scale(scaleY)
           .orient("left")
           .ticks(8);

        s.append('path')
         .attr({
         'd': linex(data_arr),
         'stroke': '#09c',
         'fill': 'none',
         'transform':'translate(35,20)'
         });

       s.append('g')
        .call(axisX)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(35,'+(height+20)+')' 
        });

       s.append('g')
        .call(axisY)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(35,20)'
        });
        console.log(s);
      }

      var data_cli  = function(result){
        var data_arr = JSON.parse(result);
        console.log(data_arr);
        var minH=100,maxH=0,minD=200,maxD=0;
        for(var i =0;i<data_arr.length;i++){
          if(data_arr[i].Humidity>maxH){
            maxH = data_arr[i].Humidity;
          }
          if(data_arr[i].Humidity<minH){
            minH = data_arr[i].Humidity;
          }
          if(data_arr[i].Degrees>maxD){
            maxD = data_arr[i].Degrees;
          }
          if(data_arr[i].Degrees<minD){
            minD = data_arr[i].Degrees;
          }
          //console.log(data_arr[i]);
        }
        var width=240,height=120;
        var s=d3.select('#hum');
        s.selectAll("path").remove();
        s.selectAll("g").remove();
        s.attr({

          'width':'380',
          'height':'180'
        }).style({
          'border':'1px dotted #aaa'
        });
        var scaleX=d3.scale.linear()
           .range([0,width])
           .domain([0,data_arr.length]);
        var scaleY=d3.scale.linear()
           .range([height,0])
           .domain([minH,maxH]);
        var linex=d3.svg.line()
            .x(function(d){return scaleX(d.n);})  
            .y(function(d){return scaleY(d.Humidity);});
        var axisX = d3.svg.axis()
           .scale(scaleX)
           .orient("bottom")
           .ticks(8);
        var axisY = d3.svg.axis()
           .scale(scaleY)
           .orient("left")
           .ticks(8)
           .tickFormat(function(d){return d+'%';});

        s.append('path')
         .attr({
         'd': linex(data_arr),
         'stroke': '#09c',
         'fill': 'none',
         'transform':'translate(80,20)'
         });

       s.append('g')
        .call(axisX)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(80,'+(height+20)+')' 
        });

       s.append('g')
        .call(axisY)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(80,20)'
        });

        //for temp
        var s2=d3.select('#tem');
        s2.selectAll("path").remove();
        s2.selectAll("g").remove();
        s2.attr({

          'width':'380',
          'height':'180'
        }).style({
          'border':'1px dotted #aaa'
        });
        var scaleX2=d3.scale.linear()
           .range([0,width])
           .domain([0,data_arr.length]);
        var scaleY2=d3.scale.linear()
           .range([height,0])
           .domain([minD,maxD]);
        var linex2=d3.svg.line()
            .x(function(d){return scaleX(d.n);})  
            .y(function(d){return scaleY(d.Degrees);});
        var axisX2 = d3.svg.axis()
           .scale(scaleX2)
           .orient("bottom")
           .ticks(8);
        var axisY2 = d3.svg.axis()
           .scale(scaleY2)
           .orient("left")
           .ticks(8)
           .tickFormat(function(d){return d+'°F';});

        s2.append('path')
         .attr({
         'd': linex(data_arr),
         'stroke': '#09c',
         'fill': 'none',
         'transform':'translate(80,20)'
         });

       s2.append('g')
        .call(axisX2)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(80,'+(height+20)+')' 
        });

       s2.append('g')
        .call(axisY2)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(80,20)'
        });
      }

      var data_rfid = function(result){
        var data_arr= JSON.parse(result);
        var id = document.getElementById('uid');
        console.log(data_arr[data_arr.length-1].UID);

        if(id)
          id.value = data_arr[data_arr.length-1].UID;
        else
          console.log('no content');
        console.log(id);
      }


      var refresh_acc_elm = document.getElementById('refresh_acc');
      if(refresh_acc_elm){
        http_post('/data_acc','',data_acc);
        refresh_acc_elm.addEventListener('click',function(){http_post('/data_acc','',data_acc);});
      }
      else{
        console.log('error');
      }

      var refresh_cli_elm = document.getElementById('refresh_cli');
      if(refresh_cli_elm){
        http_post('/data_cli','',data_cli);
        refresh_cli_elm.addEventListener('click',function(){http_post('/data_cli','',data_cli);});
        console.log('success');
      }
      else{
        console.log('error');
      }

      var refresh_rfid_elm = document.getElementById('refresh_rfid');
      if(refresh_rfid_elm){
        http_post('/data_rfid','',data_rfid);
        refresh_rfid_elm.addEventListener('click',function(){http_post('/data_rfid','',data_rfid);});
        console.log('success');
      }
      else{
        console.log('error');
      }

      /*var refresh_camera_elm = document.getElementById('refresh_pic');
      if(refresh_camera_elm){
        refresh_camera_elm.addEventListener('click',function(){
          var a = document.getElementById('photo');
          if(a){
            a.src = 'pictrue.jpg';
          }
          else
            console.log('pic error');
        });
      }
      else{
        console.log('but error');
      }*/
      //document.getElementById('refresh_acc').;
