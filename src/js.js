	function openSpoiler(id){
		var a = document.getElementById(id).style;
		a.display = a.display=='block'?'none':'block'}
	function openSpoiler(id){
		var a = document.getElementById(id).style;
		a.display = a.display=='block'?'none':'block'}
	function info(){
		loadFileJSON_resp('myJson', \"/rtstatus.json\");
	};
	var enter=0;
	var sum_json=[];
	var val_json_body;var val_json_hdr;
	var id_json_hdr;
	var id_json_body;
	function loadFileJSON_resp( toLocalStorage, fromUrl){
		var k=0;
		var sum_json_req=[];
		var a=0;
		var val_json_body;var val_json_hdr;
		var id_json_hdr;
		var id_json_body;
		var c=2;
		var sum_json_pipe=[];
		var val_json_body_pipe;var val_json_hdr_pipe;
		var id_json_hdr_pipe;
		var id_json_body_pipe;
		var diff_beresp=[];
		var diff_bereq=[];
		var diff_interval_resp=[];
		var diff_interval_req=[];
		if (localStorage[toLocalStorage]){
			printFileJson(toLocalStorage);
		$.getJSON(   \"/rtstatus.json\"   , function(data) {
				var flag=0;
				$.each( data, function(chiave, valore){
					if(chiave.match(\"beresp_hdrbytes\")){
						val_json_hdr = valore.value;
						id_json_hdr=valore.ident;
					}
					if(chiave.match(\"beresp_bodybytes\")){
						val_json_body = valore.value;
						id_json_body=valore.ident;
						if( id_json_hdr===id_json_body){
							k++;
							sum_json[k]=val_json_hdr+  val_json_body   ;
							if(typeof sum_json[k]===\"undefined\" || typeof tmp_resp[k]===\"undefined\" ||(sum_json[k]-tmp_resp[k])<0 ){
								diff_beresp[k]=0;
							}else{   
								diff_beresp[k]= (sum_json[k]-tmp_resp[k]);
								diff_interval_resp[k]=data.uptime_sec-interval_resp[k];
							}
					}}
					if(chiave.match(\"bereq_hdrbytes\")){
						val_json_hdr = valore.value;
						id_json_hdr=valore.ident;
					}
					if(chiave.match(\"bereq_bodybytes\")){
					val_json_body = valore.value;
						id_json_body=valore.ident;
						if( id_json_hdr===id_json_body){
							a++;
							sum_json_req[a]=val_json_hdr+  val_json_body;
							if(typeof sum_json_req[a]===\"undefined\" || typeof tmp_req[a]===\"undefined\" ||(sum_json_req[a]-tmp_req[a])<0 ){
								diff_bereq[a]=0;
							}else{
								diff_bereq[a]=   (sum_json_req[a]-tmp_req[a]);
								diff_interval_req[a]=data.uptime_sec-interval_req[a];
							}
					}}
			});
	$('table#info TBODY').html(\"\");
	$('table#info TBODY').append('<tr><td>'+\"<b>Varnish version: </b> \"+'</td><td>'+data.varnish_version +'</td><td></tr>');
	$('table#info TBODY').append('<tr><td>'+\"<b>Varnish uptime: </b> \"+'</td><td>'+data.uptime +'</td><td></tr>');
	$('table#info TBODY').append('<tr><td>'+\"<b>Hitrate: </b> \"+'</td><td>'+data.hitrate + ' %'+'</td><td></tr>');
	$('table#info TBODY').append('<tr><td>'+\"<b>Load: </b> \"+'</td><td>'+data.load +' req/s'+'</td><td></tr>');
	var tmp=[];
	var cont =0;
	$('table#beover TBODY').html(\"\");
	$.each( data, function( key, val ){
		if(val.type === \"MAIN\" && key.match(\"backend\")){
			tmp.push( \"<p>\" +  val.value + \"</p>\" );
	}});
	$('table#beover TBODY').append('<tr><td>'+\"      \"+'</td><td>'+tmp[8]+'</td><td>'+tmp[9]+'</td><td>'+tmp[0]+'</td><td>'+tmp[1]+'</td><td>'+tmp[2]+'</td><td>'+tmp[3]+'</td><td>'+tmp[4]+'</td><td>'+tmp[5]+'</td><td>'+tmp[6]+'</td><td>'+tmp[7]+'</td><td></tr>');
	var cont = 0;
	var flag = 0;
	var items=[];
	var ix=1;
	$('table#tblbe TBODY').html(\"\");
	$.each(data, function(key, val){
		if(key.match(\"VBE\")){
			cont++;
		switch(cont){
		case 1: var tmp1 = val.value;
				items.push(tmp1);
			break;
		case 2: var tmp2 = val.value;
				items.push(tmp2);
				break;
		case 3: var tmp3 = val.value;
				items.push(tmp3);
				break;
		case 4: var tmp4 = val.value;
				items.push(tmp4);
				break;
		case 5: var tmp5 = val.value;
				items.push(tmp5);
				break;
		case 6: var tmp6 = val.value;
				items.push(tmp6);
				break;
		case 7: var tmp7 = val.value;
				items.push(tmp7);
				break;
		case 8: var tmp8 = val.value;
				items.push(tmp8);
				break;
		case 9: var tmp9 = val.value;
				items.push(tmp9);
				break;
		};
	if(cont === 9){
	if(diff_interval_req[ix]===0)
	 	var difference1= 0;
	else
		difference1= Math.round((diff_bereq[(ix)]/(diff_interval_req[ix])));
	if(diff_interval_resp[ix]===0)
	 	var difference2= 0;
	else
		difference2= Math.round((diff_beresp[(ix)]/(diff_interval_resp[ix])));
		$('table#tblbe TBODY').append('<tr><td>'+val.ident+'</td><td>'+data.backend[(ix-1)].value+'</td><td>'+Math.round(difference1/1000)+'</td><td>'+Math.round(((items[2]+items[3])/1000))+'</td><td>'+Math.round((difference2/1000))+'</td><td>'+Math.round(((items[4]+items[5])/1000))+'</td><td>'+Math.round((items[6]/1000)) +'</td><td>'+Math.round((items[7]/1000))+'</td><td>'+Math.round((items[8]/1000))+'</td></tr>');
		items=[];
		cont = 0;
		ix++;
	}
	};
	});
	var cont = 0;
	$('table#tbl TBODY').html(\"\");
	$.each(data, function(key, val){
		if(cont > 7){
			$('table#tbl TBODY').append('<tr><td>'+key+'</td><td>'+val.descr+'</td><td>'+val.value+'</td><td></tr>');
	}
	cont++;
	);
	localStorage[toLocalStorage] = JSON.stringify(data);
	});
	}
	else {
		$.getJSON(   \"/rtstatus.json\"   , function(data) { 
			localStorage[toLocalStorage] = JSON.stringify(data);
		});
		}
	}
	var tmp_resp=[];
	var resp_h_val=0;
	var resp_b_val=0;
	var id_hdr_resp,id_body_resp;
	var cont_resp =0;
	var tmp_req=[];
	var req_h_val=0;
	var req_b_val=0;
	var id_hdr_req,id_body_req;
	var cont_req =0;
	var m=0;
	var i=0;
	var interval_req=[];
	var interval_resp=[];
	function printFileJson(toLocalStorage){
	var myJSON = JSON.parse(localStorage.myJson);
		$.each( myJSON, function(key, val){
			if(key.match(\"beresp_hdrbytes\")){
				resp_h_val = val.value;
				id_hdr_resp = val.ident;
				cont_resp++;
			}
			if(key.match(\"beresp_bodybytes\")){
				resp_b_val = val.value;
				id_body_resp = val.ident;
				cont_resp++;
			}
			if(key.match(\"bereq_hdrbytes\")){
				req_h_val = val.value;
				id_hdr_req = val.ident;
				cont_req++;
			}
		if(key.match(\"bereq_bodybytes\")){
				req_b_val = val.value;
				id_body_req = val.ident;
				cont_req++;
			}
			if(id_hdr_resp===id_body_resp && cont_resp===2){
				i++;
				tmp_resp[i]= resp_h_val+resp_b_val;
				cont_resp=0;
				interval_resp[i]=(myJSON.uptime_sec-1);
			}
			if(id_hdr_req===id_body_req && cont_req===2){
				m++;
				tmp_req[m]= req_h_val+req_b_val;
				cont_req=0;
				interval_req[m]=(myJSON.uptime_sec-1);
			}
		});
	i=0;
	m=0;
	};
	var myVar = setInterval(function(){info();}, 1000);
