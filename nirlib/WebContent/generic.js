var xhr
function createXHR() {
	 var xhr;
   try {
       xhr = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (e) {
       try {
           xhr = new ActiveXObject("Microsoft.XMLHTTP");
       } catch (E) {
           xhr = false;
       }
   }

   if (!xhr && typeof XMLHttpRequest != 'undefined') {
         xhr = new XMLHttpRequest();
   }
   return xhr;
}
function genericAsync(){
	document.getElementById('out').innerHTML = "";
	document.getElementById('loader').innerHTML = "<img src='/nirlib/loading.gif' id= 'loaderimage' >";
	xhr = createXHR();
	xhr.onreadystatechange = function(){//console.log("pos 1");
	if(xhr.readyState==4){
		
		if(xhr.status==200){
		
		     
			document.getElementById('loader').innerHTML ="";
			var xmlDoc = xhr.responseXML;
			xmlDoc.documentElement.normalize();
			var objects = xmlDoc.getElementsByTagName('object');
			var arr='';
			console.log(objects.length);
			//document.getElementById("db").innerHTML='<center><table id="tab" border="1" cellspacing="0" cellpadding="5" class="ftable"><tr><th>Object</th><th>Band</th><th>Type</th><th>External Links</th></tr>';
			for(var i=0; i< objects.length; i++){
			
				var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
				//console.log('ident ='+identifier);
				var obj_name = objects[i].getElementsByTagName("obj_name")[0].firstChild.nodeValue;
				var band = objects[i].getElementsByTagName("band")[0].firstChild.nodeValue;
				var type = objects[i].getElementsByTagName("type")[0].firstChild.nodeValue;
				var filename =objects[i].getElementsByTagName("filename")[0].firstChild.nodeValue;
				var name = band.toLowerCase()+"box";
				var slink = "http://simbad.u-strasbg.fr/simbad/sim-id?Ident="+obj_name+"&NbIdent=1&Radius=2&Radius.unit=arcmin&submit=submit+id";
				var nvolink = "http://heasarc.gsfc.nasa.gov/cgi-bin/vo/datascope/jds.pl?position="+obj_name+"&size=0.25";
				var vizlink ="http://vizier.hia.nrc.ca/viz-bin/VizieR?-source=&-out.add=_r&-out.add=_RAJ%2C_DEJ&-sort=_r&-to=&-out.max=20&-meta.ucd=2&-meta.foot=1&-c="+obj_name+"&-c.rs=10";
				var voplot = "http://voi.iucaa.ernet.in:9090/voplotapplet/invoke/run.jsp?parameters=/home/rkgv/nir_server_voplot/"+filename+"&isfromstellarlib=true";
				//document.getElementById("tab").innerHTML+='<tr><td><input type="checkbox" name="'+escape(name)+'"id="'+escape(identifier)+'" value ="'+escape(filename)+'"/>'+obj_name+'</td><td>'+escape(band)+'</td><td>'+escape(type)+'</td><td><a href="'+slink+'" target="_blank" title="query this object at Simbad"><img src ="/nirlib/simbad.png"></a>	<a href="'+nvolink+'" target="_blank" title="query this object at NVO"><img src="/nirlib/NVO.jpg"></a> <a href="'+vizlink+'" target="_blank" title="query this object at Vizier"><img src ="/nirlib/vizier.png"></a></td></tr>';
				arr+='<tr><td><input type="checkbox" name="'+escape(name)+'"id="'+escape(identifier)+'" value ="'+escape(filename)+'"/>'+obj_name+'</td><td>'+escape(band)+'</td><td>'+escape(type)+'</td><td><a href="'+slink+'" target="_blank" title="query this object at Simbad"><img src ="/nirlib/simbad.png"></a>	 <a href="'+nvolink+'" target="_blank" title="query this object at NVO"><img src="/nirlib/NVO.jpg"></a> <a href="'+vizlink+'" target="_blank" title="query this object at Vizier"><img src ="/nirlib/vizier.png"></a> <a href="'+voplot+'" target="_blank" title="Plot it in VOPlot">Plot spectrum in VOPlot</a></td></tr>';
			}
			//document.getElementById("db").innerHTML+='</table></center>';
			document.getElementById("db").innerHTML='<center><table id="tab" border="1" cellspacing="0" cellpadding="5" class="ftable"><tr><th>Object</th><th>Band</th><th>Type</th><th>External Links</th></tr>'+arr+'</table></center>';
			$('input[type=checkbox]').each(function () {

                var checkbox = $(this);
                //console.log(checkbox.attr('id'));
                // if the checkbox is already checked, colour its row
                CheckStatus(checkbox);

                //Every time a check-box status changes we 
                //want to re-evaluate the row colour
                checkbox.change(function () {
                	
                    CheckStatus(checkbox);
                });

            });

			
		}
		
	}

		
	}
	xhr.open("POST","/nirlib/genericServlet",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	 
	var data ="band=nofilter";
	xhr.send(data);
}
function responseHandler(){
	//console.log("pos 1");
	if(xhr.readyState==4){
		//console.log("pos 2");
		if(xhr.status==200){
			//console.log("pos 3");
			//setTimeout(function(){document.getElementById("out").innerHTML = "HelloWorld";},0);
			document.getElementById("out").innerHTML ="<center><table border='1' cellspacing='0' cellpadding='5'><tr><td>Object</td><td>Spectral Type</td><td>Band</td></tr>";
			document.getElementById("out").innerHTML +="</table></center>";
		}
		//console.log("pos 4");
	}
	
}
var xhrf;
function asyncFilter(str){
	xhrf = createXHR();
	document.getElementById('out').innerHTML = "";
	document.getElementById('loader').innerHTML = "<img src='/nirlib/loading.gif' id= 'loaderimage' >";
	var arr='';
	xhrf.onreadystatechange = function(){
	if(xhrf.readyState==4){
		
		if(xhrf.status==200){
			document.getElementById('loader').innerHTML="";
			//console.log("pos 1");
			
			var xmlDoc = xhrf.responseXML;
			xmlDoc.documentElement.normalize();
			var objects = xmlDoc.getElementsByTagName('object');
			//document.getElementById("db").innerHTML='<center><table id="tab" border="1" cellspacing="0" cellpadding="5" class="ftable"><tr><th>Object</th><th>Band</th><th>Type</th><th>External Links</th></tr>';
			for(var i=0; i< objects.length; i++){
				var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
				var obj_name = objects[i].getElementsByTagName("obj_name")[0].firstChild.nodeValue;
				var band = objects[i].getElementsByTagName("band")[0].firstChild.nodeValue;
				var type = objects[i].getElementsByTagName("type")[0].firstChild.nodeValue;
				var filename =objects[i].getElementsByTagName("filename")[0].firstChild.nodeValue;
				var name = band.toLowerCase()+"box";
				var slink = "http://simbad.u-strasbg.fr/simbad/sim-id?Ident="+obj_name+"&NbIdent=1&Radius=2&Radius.unit=arcmin&submit=submit+id";
				var nvolink = "http://heasarc.gsfc.nasa.gov/cgi-bin/vo/datascope/jds.pl?position="+obj_name+"&size=0.25";
				var vizlink ="http://vizier.hia.nrc.ca/viz-bin/VizieR?-source=&-out.add=_r&-out.add=_RAJ%2C_DEJ&-sort=_r&-to=&-out.max=20&-meta.ucd=2&-meta.foot=1&-c="+obj_name+"&-c.rs=10";
				var voplot = "http://voi.iucaa.ernet.in:9090/voplotapplet/invoke/run.jsp?parameters=/home/rkgv/nir_server_voplot/"+filename+"&isfromstellarlib=true";
				//document.getElementById("tab").innerHTML+='<tr><td><input type="checkbox" name="'+escape(name)+'"id="'+escape(identifier)+'" value ="'+escape(filename)+'"/>'+obj_name+'</td><td>'+escape(band)+'</td><td>'+escape(type)+'</td><td><a href="'+slink+'" target="_blank" title="query this object at simbad"><img src="/nirlib/simbad.png"></a>	<a href="'+nvolink+'" target="_blank" title="query this object at NVO"><img src="/nirlib/NVO.jpg"></a> <a href="'+vizlink+'" target="_blank" title="query this object at Vizier"><img src ="/nirlib/vizier.png"></a> <a href="'+voplot+'" target="_blank" title="Plot it in VOPlot">Plot spectrum in VOPlot</a></td></tr>';
				arr+='<tr><td><input type="checkbox" name="'+escape(name)+'"id="'+escape(identifier)+'" value ="'+escape(filename)+'"/>'+obj_name+'</td><td>'+escape(band)+'</td><td>'+escape(type)+'</td><td><a href="'+slink+'" target="_blank" title="query this object at Simbad"><img src ="/nirlib/simbad.png"></a>	 <a href="'+nvolink+'" target="_blank" title="query this object at NVO"><img src="/nirlib/NVO.jpg"></a> <a href="'+vizlink+'" target="_blank" title="query this object at Vizier"><img src ="/nirlib/vizier.png"></a> <a href="'+voplot+'" target="_blank" title="Plot it in VOPlot">Plot spectrum in VOPlot</a></td></tr>';
			}
			//document.getElementById("db").innerHTML+='</table></center>';
			document.getElementById("db").innerHTML='<center><table id="tab" border="1" cellspacing="0" cellpadding="5" class="ftable"><tr><th>Object</th><th>Band</th><th>Type</th><th>External Links</th></tr>'+arr+'</table></center>';
			$('input[type=checkbox]').each(function () {

                var checkbox = $(this);
               // console.log(checkbox.attr('id'));
                // if the checkbox is already checked, colour its row
                CheckStatus(checkbox);

                //Every time a check-box status changes we 
                //want to re-evaluate the row colour
                checkbox.change(function () {
                	
                    CheckStatus(checkbox);
                });

            });

		}
		
	}

		
	}
	xhrf.open("POST","/nirlib/genericServlet",true);
	xhrf.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var data ="band="+escape(str);
	xhrf.send(data);

}