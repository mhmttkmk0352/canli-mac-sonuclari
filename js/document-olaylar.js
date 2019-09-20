var oyunkurallari1 = "Toplam 3 adet maç bulunmaktadır. Öncelikle 3'te 3 yapana olmak kaydıyla eğer 3'te 3 yapan yoksa 3'te 2 yapana, o da yoksa 3'te 1 yapan kişiye kasadaki para verilir.";
var oyunkurallari1 = "Eğer ki birden fazla kazanan olursa kasadaki para bu kişiler arasında bölüştürülür.";
var oyunkurallari2 = 'Bir nevi bir futbol tahmin oyunu denilebilir. Fakat para yatırmıyorsunuz. Ve kaybedeceğiniz hiçbir şey yok.';
var oyunkurallari3  = 'Skor tahmini elbette zor. Ama biz size kuruş vermek istemiyoruz. Zor olmalı ama buna değmeli. İsminizi girin';






	$(document).on("click", "#kuponolustur", function(){

	var kupon = "";
	var boyut = $(".tahminler").length;

		for (var i=0; i<boyut; i++){

			var tahmindegerleri = $(".tahminler-"+i).val();

				kupon = kupon+tahmindegerleri+":";
			
		}
		if (kupon.indexOf("sec") > -1){
			swal({
				title: "Hata",
				type: "warning",
				text: "Seçilmemiş alanlar var. Lütfen kontrol edin !"
			});
		}
		else{
				swal({
					title: "Dikkat",
					type: "info",
					text: "Bu maçların skorunu doğru tahmin ederek kasadaki paraya sahip olabilirsiniz. Tamamen ücretsizdir.",
					showCancelButton : true,
					cancelButtonText: "Vazgeç",
					confirmButtonText : "Oluştur"
				}).then(function(result){
					if (result.value == 1){
						console.log(kupon);
						socket.emit("kupon", {
							_id: localStorage.getItem("_id"),
							kod: kupon
						});
						$("#isim").text(localStorage.getItem("isim"));
					}
				});
	
		}






	});

	$(document).on("click", "#kuponekraninigor", function(){
		// socket.emit("maclistesi",{
		// 	cihaz_id: localStorage.getItem("_id")
		// });


		//$(".kupon-olusturma-ekrani").hide();			
		$(".kupon-ekrani").hide();
		$("#kuponolustur").hide();		
	});

	$(document).on("click", "#anaekran", function(){
		$(".mac-listesi").html("");
		$("#kuponolustur").hide();
		//$(".kupon-olusturma-ekrani").hide();			
		$(".kupon-ekrani").show();
	
	});








