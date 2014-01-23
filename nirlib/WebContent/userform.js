var xmlRequest;
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

function requestHandler(){
	
	xmlRequest = createXHR();
	xmlRequest.onreadystatechange = function(){
		if (xmlRequest.readyState==4)
		{
			if(xmlRequest.status==200)
			{
				document.getElementById("out").innerHTML="<a href='nir_out.tgz'>Click to Download</a>";
			}
		}
		
	};
	xmlRequest.open("POST","/nirlib/queryServlet",true);
	xmlRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var jlength = document.uform.jbox.length;
	var klength = document.uform.kbox.length;
	var hlength = document.uform.hbox.length;
	var jstart = document.getElementById('jstart').value;
		if(parseInt(jstart)%5 != 0) jstart = parseInt(jstart) -parseInt(jstart)%5;
	var jend = document.getElementById('jend').value;
		if(parseInt(jend)%5 != 0) jend = parseInt(jend)+5 -parseInt(jend)%5;
	var kstart = document.getElementById('kstart').value;
		if(parseInt(kstart)%5 != 0) kstart = parseInt(kstart) -parseInt(kstart)%5;
	var kend = document.getElementById('kend').value;
		if(parseInt(kend)%5 != 0) kend = parseInt(kend)+5 -parseInt(kend)%5;
	var hstart = document.getElementById('hstart').value;
		if(parseInt(hstart)%5 != 0) hstart = parseInt(hstart) -parseInt(hstart)%5;
	var hend = document.getElementById('hend').value
		if(parseInt(hend)%5 != 0) hend = parseInt(hend)+5 -parseInt(hend)%5;
	var data = "jstart="+escape(jstart)+"&jend="+escape(jend)+"&kstart="+escape(kstart)+"&kend="+escape(kend)+"&hstart="+escape(hstart)+"&hend="+escape(hend);
	var count = 0;
	for(i=0;i<jlength;i++){
		if(document.uform.jbox[i].checked){
			count++;
			var tmpname = "param"+count;
			data += "&"+escape(tmpname)+"="+escape(document.uform.jbox[i].value);
		}
		
	}
	for(i=0;i<klength;i++){
		if(document.uform.kbox[i].checked){
			count++;
			var tmpname = "param"+count;
			data += "&"+escape(tmpname)+"="+escape(document.uform.kbox[i].value);
		}
		
	}
	for(i=0;i<hlength;i++){
		if(document.uform.hbox[i].checked){
			count++;
			var tmpname = "param"+count;
			data += "&"+escape(tmpname)+"="+escape(document.uform.hbox[i].value);
		}
		
	}
	xmlRequest.send(data);
}

function asyncHandler(){
	if (xmlRequest.readyState=4)
	{
		if(xmlRequest.status=200)
		{
			document.getElementById("out").innerHTML="<a href='nir_out.tgz'>Click to Download</a>";
		}
	}
}
function validateForm(){
	var jstart = document.getElementById('jstart').value;
	var jstart = document.getElementById('jstart').value;
	var kstart = document.getElementById('kstart').value;
	var kend = document.getElementById('kend').value;
	var hstart = document.getElementById('hstart').value;
	var hend = document.getElementById('hend').value;
	if(parseInt(jstart)<11300 || parseInt(jend) > 13100 || parseInt(jstart)>13100 || parseInt(jend) < 11300){
		alert('enter J-Band wavelengths between 11300 and 13100');
		return false;
	}
    if(parseInt(kstart)<20800 || parseInt(kstart) > 22400 ||  parseInt(kend) > 22400 || parseInt(kend) < 20800){
		alert('enter K-Band wavelengths between 20800 and 22400');
		return false;
	}
    if(parseInt(hstart)<15550 || paresInt(hstart) > 17300 || parseInt(hend) > 17300 || parseInt(hend) < 15550){
		alert('enter H-Band wavelengths between 15550 and 17300');
		return false;
	}
	if(isNaN(jstart)|| isNaN(jend) || isNaN(kstart) || isNaN(kend) || isNaN(hstart) || isNaN(hend)){
		alert('Enter only numeric values for wavelength');
		return false;
	}
	return true
		
}
 function validate(id1, min, max){ 
	     value = document.getElementById(id1).value;
	 	 if(isNaN(value)){
	 	 alert('Enter only numeric values');
	 	 document.getElementById(id1).focus();
         return false;
	 }
	 if(parseInt(value)>max || parseInt(value)< min){
		 alert('Enter values lying in range');
		 document.getElementById(id1).focus();
		 return false
	 }
	 return true;
 } 		
 var raDec;
 function raDecHandler(){
	 raDec = createXHR();
	 raDec.onreadystatechange = function(){
		 if (raDec.readyState==4){
			 if (raDec.status==200){
				 //raDec.responseXML.documentElement.normalize();
				 var objects = raDec.responseXML.getElementsByTagName('object');
				 for(var i =0 ; i < objects.length; i++){
					 var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
					 document.getElementById(identifier).checked = true;
					 console.log(identifier);
					 
				 }
				    
				 	//document.getElementById("h3165").checked=true;
				 	//$('input[name=jbox]').attr('checked',true);
				 	//document.write(document.getElementById("h3165").value)
			 }
		 }
		 
	 }
	 raDec.open("POST","/nirlib/raDecServlet",true);
	 raDec.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	 var ra1 = document.getElementById("ra").value;
	 var dec1 = document.getElementById("dec").value;
	 var data = "raVal="+escape(ra1)+"&decVal="+escape(dec1);
	 if (raDec.overrideMimeType)   raDec.overrideMimeType('text/xml');
	 raDec.send(data);
 }

 function asyncRaDec(){
	 if (raDec.readyState==4){
		 if (raDec.status==200){
			 //raDec.responseXML.documentElement.normalize();
			 var objects = raDec.responseXML.getElementsByTagName('object');
			 for(var i =0 ; i < objects.length; i++){
				 var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
				 document.getElementById(identifier).checked = true;
				 
				 
			 }
			    
			 	//document.getElementById("h3165").checked=true;
			 	//$('input[name=jbox]').attr('checked',true);
			 	document.write(document.getElementById("h3165").value)
		 }
	 }
 }