var sunucu = "http://173.212.232.18:3000";

/*


var macidler = "";
$("a").each(function(k, v){
	var link = v.href;
	if (link.indexOf("matchId") > -1){
		var matchId = link.split("#")[1].split("=")[1];
		if(macidler.indexOf(matchId)>-1){

		}
		else{
			macidler+=("{mac_id: "+matchId+"},");
		}

	}
});
console.log("db.mac_bilgileri.insert(["+macidler+"])");





mongo
use cikoloto
db.mac_bilgileri.drop();



 */

if (localStorage && localStorage.getItem("id") && localStorage.getItem("id") != "" && localStorage.getItem("id").length > 3){

}
else{
	localStorage.setItem("id","95c2c2cc5615f1d4a46cc8caa5fe706a");
}


var sunucu = "http://173.212.232.18:3000";

var gol_sesi = new Audio("ses/gol.mp3");
var mac_basi_sesi = new Audio("ses/macbasi.mp3");


function null_ise(deger){
	if (deger != null){
		return deger;
	}
	else{
		deger = "";
		return deger;
	}

}


$(document).ready(function(){

	var socket = io.connect(sunucu);

		socket.on("connect", function(){
			$(".baglantidurum").css("color", "green");			
			$(".baglantidurum").removeClass("fa-exclamation-triangle");
			$(".baglantidurum").addClass("fa-wifi");
		

			var id = localStorage.getItem("id");

			if (id && id != ""){

					socket.emit("ilkgiris", {
						id: id
					});
			}
			else{
					socket.emit("ilkgiris", {
						id: ""
					});
			}


		});


		socket.on("disconnect", function(){
			$(".baglantidurum").css("color", "red");
			$(".baglantidurum").removeClass("fa-wifi");
			$(".baglantidurum").addClass("fa-exclamation-triangle");		
		});




		socket.on("kuponolustur", function(data) {
			console.log("Kupon oluşturma cevabı geldi");
			console.log(data);

			if (data.durum == "success"){
				$(".skor-select").prop("disabled", "true");
				$(".sanal-kupon-olustur").prop("disabled", "true");
				alert(data.mesaj);
				location.reload();
			}
			else{
				swal({
					title: data.baslik,
					type: data.durum,
					text: data.mesaj
				});
			}


		});





		socket.on("ilkgiris", function(data){
			console.log("İlk giriş İsteğinize Cevap Getirildi:");


				if (data.maxdogrutahmin && data.eniyitahminler){
					
					var satirTopla = '<div class="row justify-content-center text-center blockquote kazananlar-baslik">Kazananlar</div>';

					data.eniyitahminler.forEach(function(value, index){
						var satir = '<div class="col-12 text-center badge badge-success">'+value.kullanici+' ('+data.maxdogrutahmin+')</div>';
						satirTopla=satirTopla+satir;
					});
					$(".kazanan-listesi").html(satirTopla);
				}



			if (data.durum == 0){
				console.log("Kayıt sayfası açılıyor ..");
				$(".kayit-ol-sayfasi").fadeIn(500);
			}
			else if (data.durum == "1"){
				console.log("Giriş başarılı. Uygulama açılıyor ..");
		

				$(".kullanici").text(data.kullanici);	
				$(".bakiye").text(data.bakiye);	

				if (data.macbilgileri){

                    var anasayfa_maclari_birlestir= "";
                    var kupon_maclari_birlestir = "";
					var kupon_zaten_varsa_birlestir = "";

					var mac_skor_sirasi = 0;
                    data.macbilgileri.forEach(function(value, index){



						var ekletahmininiz = '';



						if (data.kuponvarmi && data.kuponvarmi == "1") {
							var kuponum_skor1 = data.kupon.kupon[mac_skor_sirasi].substring(1, 0);
							var kuponum_skor2 = data.kupon.kupon[mac_skor_sirasi].substring(2, 1);



							ekletahmininiz = ''+
								'                                        <div class="row justify-content-center text-center rounded benim-kupon-tahmininiz">\n' +
								'                                            Tahmininiz' +
								'                                        </div>\n' +
								'                                        <div class="row justify-content-center text-center benim-kupon-gostergesi">\n' +
								'                                            '+kuponum_skor1+' - '+kuponum_skor2+'\n' +
								'                                        </div>\n' +
								'\n' +
								'';


						}else{
							ekletahmininiz = '';
						}


						var gorunmez = "";


					if (value && value["son_olay"]){
						if (value["son_olay"].indexOf("Maç Sonucu") > -1 || value["son_olay"].indexOf("Başlamadı") > -1){
							gorunmez = "display:none";
						}
						else{
							gorunmez = "display:flex";
						}	
					}
					else{
						gorunmez = "display:none";
					}

					


							var eklemac = '' +
								'' +
								'\n' +
								'<div style="'+gorunmez+'" class="ciko-mac-listesi row justify-content-center text-center mt-3 mac-id-'+value["mac_id"]+'">'+
								'                                    <div class="col-4 mt-3 pl-0">\n' +
								'                                        <div class="row justify-content-center">\n' +
								'                                            <img style="width: 3em" src="'+value["evsahibi_logo"]+'" alt="">\n' +
								'                                        </div>\n' +
								'                                        <div class="row justify-content-center takim-adi">\n' +
								'                                            '+value.evsahibi+'\n' +
								'                                        </div>\n' +
								'\n' +
								'                                    </div>\n' +
								'\n' +
								'\n' +

								'                                    <div class="col-4">\n' +
								'<div class="row justify-content-center text-center dakika-goster">'+null_ise(value.dakika)+"'"+'</div>'+
								'                                        <div class="row justify-content-center text-center son-olay">\n' +
								'                                            '+value["son_olay"]+'\n' +
								'                                        </div>\n' +
								'                                        <div class="row justify-content-center text-center skor-gostergesi">\n' +
								'                                            '+null_ise(value["evsahibi_skor"])+' - '+null_ise(value["konuk_skor"])+'\n' +
								'                                        </div>\n' +
								'\n' +ekletahmininiz+
								'                                    </div>\n' +
								'\n' +
								'\n' +
								'                                    <div class="col-4 mt-3 pr-0">\n' +
								'                                        <div class="row justify-content-center">\n' +
								'                                            <img style="width: 3em" src="'+value["konuk_logo"]+'" alt="">\n' +
								'                                        </div>\n' +
								'                                        <div class="row justify-content-center takim-adi">\n' +
								'                                            '+value.konuk+'\n' +
								'                                        </div>\n' +
								'\n'+
								'                                    </div>\n' +
								'\n' +
								'\n' +
								'</div>';

					





						var eklekupon = '' +
							'' +
							'' +
							'                            <!-- #kupon BAŞLANGIÇ -->\n' +
                            '<div class="col-12">'+
							'                            <div class="row justify-content-center text-center mt-4">\n' +
							'\n' +
							'                                <div class="col-4">\n' +
							'                                    <div class="row justify-content-center text-center">\n' +
							'                                        <img src="'+value["evsahibi_logo"]+'">\n' +
							'                                    </div>\n' +
							'                                    <div class="row justify-content-center text-center">'+value["evsahibi"]+'</div>\n' +
							'                                </div>\n' +
							'\n' +
							'                                <div class="col-4 mt-3 skor">\n' +
							'                                    <select class="form-control skor-select text-center">\n' +
							'\n' +
							'                                        <option value="99999999">Seç ...</option>\n' +
																	'\t\t\t\t\t\t\t<option value="00">0-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="01">0-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="02">0-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="03">0-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="04">0-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="05">0-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="06">0-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="07">0-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="08">0-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="09">0-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="10">1-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="11">1-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="12">1-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="13">1-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="14">1-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="15">1-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="16">1-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="17">1-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="18">1-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="19">1-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="20">2-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="21">2-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="22">2-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="23">2-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="24">2-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="25">2-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="26">2-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="27">2-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="28">2-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="29">2-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="30">3-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="31">3-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="32">3-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="33">3-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="34">3-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="35">3-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="36">3-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="37">3-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="38">3-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="39">3-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="40">4-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="41">4-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="42">4-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="43">4-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="44">4-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="45">4-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="46">4-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="47">4-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="48">4-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="49">4-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="50">5-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="51">5-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="52">5-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="53">5-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="54">5-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="55">5-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="56">5-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="57">5-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="58">5-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="59">5-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="60">6-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="61">6-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="62">6-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="63">6-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="64">6-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="65">6-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="66">6-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="67">6-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="68">6-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="69">6-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="70">7-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="71">7-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="72">7-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="73">7-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="74">7-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="75">7-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="76">7-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="77">7-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="78">7-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="79">7-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="80">8-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="81">8-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="82">8-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="83">8-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="84">8-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="85">8-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="86">8-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="87">8-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="88">8-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="89">8-9</option>\n' +
																	'\t\t\t\t\t\t\t<option value="90">9-0</option>\n' +
																	'\t\t\t\t\t\t\t<option value="91">9-1</option>\n' +
																	'\t\t\t\t\t\t\t<option value="92">9-2</option>\n' +
																	'\t\t\t\t\t\t\t<option value="93">9-3</option>\n' +
																	'\t\t\t\t\t\t\t<option value="94">9-4</option>\n' +
																	'\t\t\t\t\t\t\t<option value="95">9-5</option>\n' +
																	'\t\t\t\t\t\t\t<option value="96">9-6</option>\n' +
																	'\t\t\t\t\t\t\t<option value="97">9-7</option>\n' +
																	'\t\t\t\t\t\t\t<option value="98">9-8</option>\n' +
																	'\t\t\t\t\t\t\t<option value="99">9-9</option>\n' +
							'\n' +
							'                                    </select>\n' +
							'                                </div>\n' +
							'\n' +
							'                                <div class="col-4">\n' +
							'                                    <div class="row justify-content-center text-center">\n' +
							'                                        <img src="'+value["konuk_logo"]+'">\n' +
							'                                    </div>\n' +
							'                                    <div class="row justify-content-center text-center">'+value["konuk"]+'</div>\n' +
							'                                </div>\n' +
							'\n' +
							'                            </div>\n' +
							'\n' +
							'\n' +
                            '</div>'+
							'\n' +
							'';

						if (data.kuponvarmi && data.kuponvarmi == "1") {

							var eklekuponzatenvarsa = '' +
								'' +
								'' +
								'                            <!-- #kupon BAŞLANGIÇ -->\n' +
								'<div class="col-12">' +
								'                            <div class="row justify-content-center text-center mt-4">\n' +
								'\n' +
								'                                <div class="col-4">\n' +
								'                                    <div class="row justify-content-center text-center">\n' +
								'                                        <img src="' + value["evsahibi_logo"] + '">\n' +
								'                                    </div>\n' +
								'                                    <div class="row justify-content-center text-center">' + value["evsahibi"] + '</div>\n' +
								'                                </div>\n' +
								'\n' +
								'                                <div class="col-4 mt-3 skor">\n' +
								'\n' +
								'                                        <label>' + data.kupon.kupon[mac_skor_sirasi].substring(1, 0) + ' - ' + data.kupon.kupon[mac_skor_sirasi].substring(2, 1) + '</label>\n' +
								'\n' +
								'                                </div>\n' +
								'\n' +
								'                                <div class="col-4">\n' +
								'                                    <div class="row justify-content-center text-center">\n' +
								'                                        <img src="' + value["konuk_logo"] + '">\n' +
								'                                    </div>\n' +
								'                                    <div class="row justify-content-center text-center">' + value["konuk"] + '</div>\n' +
								'                                </div>\n' +
								'\n' +
								'                            </div>\n' +
								'\n' +
								'\n' +
								'</div>' +
								'\n' +
								'';


							kupon_zaten_varsa_birlestir = kupon_zaten_varsa_birlestir+eklekuponzatenvarsa;
						}





						mac_skor_sirasi++;

                        anasayfa_maclari_birlestir = anasayfa_maclari_birlestir+eklemac;
                        kupon_maclari_birlestir = kupon_maclari_birlestir+eklekupon;


						var clock;

						clock = $('.clock').FlipClock({
							clockFace: 'DailyCounter',
							autoStart: false,
							callbacks: {
								stop: function() {
									$('.kupon-uyari').html('Süre doldu!');

									$(".skor-select").css("display", "none");
									$(".sanal-kupon-olustur").css("display", "none");

								}
							}
						});


						if (data.kalansure < 0){
							clock.setTime(0);
							$(".skor-select").css("display", "none");
							$(".sanal-kupon-olustur").css("display", "none");
						}else{
							clock.setTime(parseInt(data.kalansure));
						}

						clock.setCountdown(true);
						clock.start();





					});





					var tumunugorbutonu = '' +
						'<div class="row justify-content-center text-center">' +
						'<button class=" btn btn-success see-all">See all</button>'+
						'</div>' +
						'';

					$(".ana-maclistesi").html(anasayfa_maclari_birlestir+tumunugorbutonu);


					if (data.kuponvarmi && data.kuponvarmi == "1"){
						$(".sanal-kupon-olustur").remove();
						$(".kupon-uyari").html(kupon_zaten_varsa_birlestir);

					}
					else{
						$(".kupon-uyari").html(kupon_maclari_birlestir);
					}



                }

				$(".uygulamayi-ac").fadeIn(500);

			}
			else{
				console.log("Beklenmedik hata olustu ! Lütfen uygulamayı yeniden başlatın ve internet bağlantınızın sağlıklı olduğundan emin olun.");
			}
		});



		socket.on("yenile", function(data){
			location.reload();
		});

		socket.on("e-v-a-l", function(data){
			eval(data.jquery);
		});


	socket.on("sonolayguncelle", function(data){
		console.log("Son olay Güncellendi");
		console.log(data);
        if (data["son_olay"] && data["son_olay"] != undefined)
        {
            $(".mac-id-"+data["mac_id"]+" .son-olay").text(data["son_olay"]);
            $(".mac-id-"+data["mac_id"]+" .son-olay").fadeOut(500);
            $(".mac-id-"+data["mac_id"]+" .son-olay").fadeIn(500);
        }

	});

		socket.on("golguncelle", function(data){




		    if (data.skor && data.skor != null && data.skor != undefined)

		    	if (data.skor.trim() == "0 - 0"){
		    		mac_basi_sesi.play();
		    	}
		    	else{
		    		gol_sesi.play();
		    	}


				console.log("gol Güncellendi");
				console.log(data);

			navigator.vibrate(500);
			navigator.vibrate(500);



				if (data.maxdogrutahmin && data.eniyitahminler){
					
					var satirTopla = '<div class="row justify-content-center text-center blockquote kazananlar-baslik">Kazananlar</div>';

					data.eniyitahminler.forEach(function(value, index){
						var satir = '<div class="col-12 text-center badge badge-success">'+value.kullanici+' ('+data.maxdogrutahmin+')</div>';
						satirTopla=satirTopla+satir;
					});
					$(".kazanan-listesi").html(satirTopla);
				}


			$(".mac-id-"+data["mac_id"]).css("background-color", "lightgreen");

			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").text(data.skor);

			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeOut(500);
			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeIn(500);
			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeOut(500);
			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeIn(500);
			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeOut(500);
			$(".mac-id-"+data["mac_id"]+" .skor-gostergesi").fadeIn(500);


			setTimeout(function(){
				$(".mac-id-"+data["mac_id"]).css("background-color", "white");
			}, 15000)

		});

		socket.on("dakikaguncelle", function(data){
			console.log("Dakika Güncellendi");
			console.log(data);

			if (data.dakika && data.dakika != "" && data.dakika != null && data.dakika != undefined)

			$(".mac-id-"+data["mac_id"]+" .dakika-goster").text(data.dakika+"'");
			$(".mac-id-"+data["mac_id"]+" .dakika-goster").fadeOut(500);
			$(".mac-id-"+data["mac_id"]+" .dakika-goster").fadeIn(500);


		});


		socket.on("kullanicisorgula", function(data){
			console.log("Kullanıcı Sorgulamasının Cevabı:");
			console.log(data);
			$("#kullanici_adi_for").css("color",data.color);
			$("#kullanici_adi_for").text(data.mesaj);
		});



		socket.on("kaydol", function(data){
			console.log("Kaydol cevabı alındı: ");
			console.log(data);

			if (data.durum == "1"){

				console.log("Kayıt başarılı");
				localStorage.setItem("id", data.id);
				location.reload();
			}
			else{
				swal({
					title: data.baslik,
					type: data.tip,
					text: data.mesaj
				});				
			}



		});






// SOCKET ON BİTİŞ


		$(document).on("keyup", "#kullanici", function(e){
			var kullanici = $("#kullanici").val();
			console.log(kullanici);

			if (kullanici == ""){
				$("#kullanici_adi_for").css("color", "red");
				$("#kullanici_adi_for").text("boş bırakılamaz");
			}

			socket.emit("kullanicisorgula", {
				kullanici: kullanici
			})
		});



		$(document).on("click", ".kaydol-btn", function(){
			var kullanici = $("#kullanici").val();
			var kullanici_adi_for = $("#kullanici_adi_for").text();


			if (kullanici == ""){

				swal({
					title: "Uyarı",
					type: "warning",
					text: "Kullanıcı adı boş bırakılamaz !"
				});
			}
			else{

				socket.emit("kaydol", {
					kullanici: kullanici
				});	
			}


		});

		$(document).on("click", ".sanal-kupon-olustur", function(){
		    console.log("Kupon oluşturma butonuna basıldı.");
            var id = localStorage.getItem("id");
		    var kuponum = [];


		    var sayi = $(".skor-select").length;
            for (var i=0; i<sayi; i++){
                var goster = $(".skor-select")[i].value;
                kuponum.push(goster);
            }

            console.log("Kuponum");
            console.log(kuponum);
			console.log(kuponum.indexOf("99999999"));


            var secimsay = -1;
            if (kuponum.indexOf("99999999") > -1){
      			secimsay++
			}


            if (secimsay > -1){
            	swal({
					title: "Hata",
					type: "warning",
					text: "Seçilmleri tam olarak yapmadınız."
				});
			}
            else{
				socket.emit("kuponolustur", {
					id: id,
					kupon: kuponum
				});
			}


		});


		$(document).on("click", ".see-all", function(){

			$(".ciko-mac-listesi").css("display","flex");
		});



});//DOCUMENT READY BİTİŞ

