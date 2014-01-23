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
function voplot(id){
	//document.getElementById('loader').innerHTML = "<img src='/nirlib/loading.gif' id= 'loaderimage' >";
	xhr = createXHR();
	xhr.onreadystatechange = function(){//console.log("pos 1");
	if(xhr.readyState==4){
		
		if(xhr.status==200){
		
		     
			//document.getElementById('loader').innerHTML ="";
			
		}
	}
	}
	xhr.open("POST","http://voi.iucaa.ernet.in:9090/voplotapplet/invoke/run.jsp",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//var id = document.getElementById(id).value
	var url ='/home/rkgv/nir_server_voplot/1948j.dat';
	var isfrom ='Yes';
	var data = "parameters="+escape(url)+"&isfromstellarlib="+escape(isfrom);
	
	
	xhr.send(data);

}