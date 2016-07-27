var len = 0;

function Codifica(r,c){ return ((r+c)*(r+c+1))/2+r; }

function Decodifica(str){
	var s = Math.floor((Math.sqrt (1 + 8 * str) - 1) / 2);
	this.par = str - s * (s + 1) / 2;
	this.cod = s - this.par;
}

function Pos(j,a){ for(var i=0;i<len;i++) if(j == a[i]) return i; return -1; }

$(document).ready(function(){
	
	$("#bcod").click(function(){
		
		len = $("#alph").val().length;
		if(len > 0){
			
			var string = $("#codifica").val();
			if(string.length > 0){
				
				$("#error").hide();
				var alph = new Array();
				for(var i=0;i<len;i++) alph[i] = $("#alph").val()[i];
				$("#cod").text(""+string+" = ");
				var temp = Pos(string[0],alph);
				var i = 0;
				if(string.length > 1){

					if(Pos(string[0],alph) > -1 && Pos(string[1],alph) > -1){

						$("#cod").append("("+Pos(string[0],alph)+","+Pos(string[1],alph)+")");
						for(i=1;i<string.length-1;i++){

							if(Codifica(temp,Pos(string[i],alph)) == -1 || Pos(string[i+1],alph) == -1){
								$("#cod").text("");
								$("#error").text("Errore durante la fase di codifica.").fadeOut(500).fadeIn(800).show();
								return;
							}

							$("#cod").append(" -> ("+Codifica(temp,Pos(string[i],alph))+","+Pos(string[i+1],alph)+")");
							temp = Codifica(temp,Pos(string[i],alph));
						}
						$("#cod").append(" -> ");
						$("#cod").append("("+ Codifica(temp,Pos(string[i],alph))+","+string.length+") -> "+Codifica(Codifica(temp,Pos(string[i],alph)),string.length));
					
					}else{
						$("#cod").text("");
						$("#error").text("Errore durante la fase di codifica.").fadeOut(500).fadeIn(800).show();
					}
				
				}else $("#cod").append("("+ Pos(string[i],alph)+","+string.length+") -> "+Codifica(Pos(string[i],alph),string.length));
				
			}else $("#error").text("Inserire la stringa da codificare.").fadeOut(500).fadeIn(800).show();
			
		}else $("#error").text("Inserire l'alfabeto.").fadeOut(500).fadeIn(800).show();
	});
	
	$("#bdec").click(function(){
		
		len = $("#alph").val().length;
		if(len > 0){
			
			var string = $("#decodifica").val();
			if(string.length > 0){
			if(!isNaN(string) && string > 0){
				var alph = new Array();
				for(var i=0;i<len;i++) alph[i] = $("#alph").val()[i];	
				$("#error").hide();
				var obj = new Decodifica(string);				
				var txt = new Array();
				var length = obj.cod;
				txt[length-1] = obj.par;
				$("#dec").text(""+string+" = ("+txt[obj.cod-1] +","+length+")");
				var temp = txt[length-1];
				
				for(var i=0;i<length-1;i++){
				    obj = new Decodifica(temp);
				    txt[length-i-1] = obj.cod;
				    temp = obj.par;
				    $("#dec").append(" -> ("+temp+"," +txt[length-i-1]+") ");
				}
				
				txt[0] = temp;
				$("#dec").append(" = ");
				for(var i=0;i<length;i++){
					if(alph[txt[i]] != undefined)
						$("#dec").append(""+alph[txt[i]]);
					else{
						$("#dec").text("");
						$("#error").text("Errore durante la fase di decodifica.").fadeOut(500).fadeIn(800).show();
					}
				}
					

			}else{
				$("#dec").text("");
				$("#error").text("Inserire una key valida.").fadeOut(500).fadeIn(800).show();
			}
			}else $("#error").text("Inserire la stringa da decodificare.").fadeOut(500).fadeIn(800).show();
		}else $("#error").text("Inserire l'alfabeto.").fadeOut(500).fadeIn(800).show();
	});
	
});


