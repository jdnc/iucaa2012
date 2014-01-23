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
				document.getElementById('loader').innerHTML = "";
				document.getElementById("out").innerHTML="<a href='nir_out.tgz'>Click to Download</a>";
			}
		}
	};
	xmlRequest.open("POST","/nirlib/queryServlet",true);
	xmlRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var jlength=0;
	var klength=0;
	var hlength=0;
	if(document.uform.jbox)
		var jlength = document.uform.jbox.length;
	else jlength=0;
	if(document.uform.kbox)
		var klength = document.uform.kbox.length;
	else klength=0
	if(document.uform.hbox)
		var hlength = document.uform.hbox.length;
	else hlength=0;
	var numChecked = 0;
	for(var i=0; i<jlength;i++){
		if(document.uform.jbox[i].checked)
			numChecked++;
	}
	for(var i=0; i<klength;i++){
		if(document.uform.kbox[i].checked)
			numChecked++;
	}
	for(var i=0; i<hlength;i++){
		if(document.uform.hbox[i].checked)
			numChecked++;
	}
	console.log("numChecked="+numChecked);
	if(numChecked == 0){
		alert("Select atleast one file for download");
		return false;
	}
	document.getElementById("out").innerHTML="";
	document.getElementById('loader').innerHTML = "<img src='/nirlib/loading.gif' id= 'loaderimage' >";
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
	var vot = "n";
	if (document.getElementById("vot").checked)
		vot="y";
	var data = "jstart="+escape(jstart)+"&jend="+escape(jend)+"&kstart="+escape(kstart)+"&kend="+escape(kend)+"&hstart="+escape(hstart)+"&hend="+escape(hend)+"&vot="+escape(vot);
	var count = 0;
	for(i=0;i<jlength;i++){
		if(document.uform.jbox){
			if(document.uform.jbox[i].checked){
				count++;
				var tmpname = "param"+count;
				data += "&"+escape(tmpname)+"="+escape(document.uform.jbox[i].value);
			}
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
			document.getElementById("out").innerHTML="<a href='nir_out.tgz'>Click to download</a>";
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
	 if(!document.uform.jbox && !document.uform.kbox && !document.uform.hbox){
		 alert('Click View all or J-Band/K-Band/H-Band');
		 return false;
	 }
	 document.getElementById('loader').innerHTML = "<img src='/nirlib/loading.gif' id= 'loaderimage' >";
	 raDec = createXHR();
	 document.getElementById("out").innerHTML="";
	 $('input[type=checkbox]').each(function () {
		 var checkbox = $(this);
		 if(checkbox.attr('id')!='vot' && checkbox.attr('id')!='ascii'){
			 checkbox.attr('checked',false);
		 }
		 
	 });
	 raDec.onreadystatechange = function(){
		 if (raDec.readyState==4){
			 if (raDec.status==200){
				 var searchCount=0;
				 document.getElementById('loader').innerHTML = "";
				 //raDec.responseXML.documentElement.normalize();
				 var objects = raDec.responseXML.getElementsByTagName('object');
				 for(var i =0 ; i < objects.length; i++){
					 var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
					 if(document.getElementById(identifier)){
						 document.getElementById(identifier).checked = true;
						 searchCount++;
					 }
					 //console.log(identifier);
					 $('input[type=checkbox]').each(function () {

			                var checkbox = $(this);
			                console.log(checkbox.attr('value'));
			                // if the checkbox is already checked, colour its row
			                CheckStatus(checkbox);

			                //Every time a check-box status changes we 
			                //want to re-evaluate the row colour
			                checkbox.change(function () {
			                	
			                    CheckStatus(checkbox);
			                });

			            });
					
				 }
				 console.log(objects.length);
		         if(searchCount > 0)  
		        	 document.getElementById("out").innerHTML='Scroll down to see search results. '+searchCount+' result(s) returned.';
		         else
		        	 document.getElementById("out").innerHTML='0 results found';
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
 //Method which checks if the check-box is checked. If it's checked
 //the row is given the 'redBackground' class, otherwise it is taken away
 function CheckStatus(checkbox) {
     if (checkbox.attr('checked') == 'checked' && checkbox.attr('id') != 'vot' && checkbox.attr('id') != 'ascii') {
         checkbox.parent().parent().addClass('redBackground');
     }
     else {
         checkbox.parent().parent().removeClass('redBackground');
     }
 }
 
 function asyncRaDec(){
	 if (raDec.readyState==4){
		 if (raDec.status==200){
			 //raDec.responseXML.documentElement.normalize();
			 var objects = raDec.responseXML.getElementsByTagName('object');
			 for(var i =0 ; i < objects.length; i++){
				 var identifier = objects[i].getElementsByTagName("ident")[0].firstChild.nodeValue;
				 var toCheck = document.getElementById(identifier);
				 if(toCheck!=null)
					 document.getElementById(identifier).checked = true;
				 
				 
			 }
			    
			 	//document.getElementById("h3165").checked=true;
			 	//$('input[name=jbox]').attr('checked',true);
			 	//document.write(document.getElementById("h3165").value)
		 }
	 }
 }