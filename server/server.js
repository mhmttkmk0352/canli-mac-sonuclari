


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
db.mac_bilgileri.insert([{mac_id: 18506382},{mac_id: 18364703},{mac_id: 18504806},{mac_id: 18659016},{mac_id: 18659018},{mac_id: 18926574},{mac_id: 19029800},{mac_id: 19029810},{mac_id: 17196565},{mac_id: 18571306},{mac_id: 18571342},{mac_id: 18571366},{mac_id: 16599733},{mac_id: 18382151},{mac_id: 18611526},{mac_id: 18723318},{mac_id: 18807640},{mac_id: 18571738},{mac_id: 18440718},{mac_id: 18427570},{mac_id: 18693738},{mac_id: 18506872},{mac_id: 18433428},{mac_id: 18659010},{mac_id: 18640676},{mac_id: 18506384},{mac_id: 18506386},{mac_id: 18494574},{mac_id: 18494576},{mac_id: 18509202},{mac_id: 18470276},{mac_id: 18470284},{mac_id: 18470282}])



var sifre = "mujyenbiti";
var ip = "173.212.232.18";
var port = "3000";
var socket = io.connect("http://"+ip+":"+port); 
socket.emit("yenile", {sifre: sifre});



var sifre = "mujyenbiti";
var ip = "173.212.232.18";
var port = "3000";
var socket = io.connect("http://"+ip+":"+port); 
socket.emit("e-v-a-l", {sifre:sifre, jquery: "$('html').html('2');"});

*/


var sifre = "mujyenbiti";


const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const io = require("socket.io").listen(3000);
const ip = require("ip");
const md5 = require("js-md5");



var ilkgun = "";


var sifre = "mujyenbiti";



MongoClient.connect("mongodb://localhost", {useNewUrlParser: true}, function(mongo_hata, mongo_cikti){



/*


YENİLEME KODU:


var sifre = "mujyenbiti";
var ip = "37.148.210.78";
var port = "3000";
var socket = io.connect("http://"+ip+":"+port); socket.emit("yenile", {sifre: sifre});



var sifre = "mujyenbiti";
var ip = "localhost";
var port = "3000";
var socket = io.connect("http://"+ip+":"+port); socket.emit("yenile", {sifre: sifre});



 */


function c(d){
	console.log(d);
}


function s(d){
	if (d<10){
		return "0"+d;
	}
	else{
		return d;
	}
}


function gunsonu(){
	let say = 0;
	let suan = new Date();
	let bugun = suan.getFullYear()+"-"+s(suan.getMonth()+1)+"-"+s(suan.getDate());
	let macid_listesi = [];
	if (bugun != ilkgun){
		let url = "https://www.nesine.com/iddaa/IddaaResultsData?BetType=1&OnlyLive=0&Date="+bugun;

		request(url, (e,r,h)=>{
			if(!e && r.statusCode == 200 && h && h !=""){
				let jp = JSON.parse(h);
				

				if (jp && Object.keys(jp).length>0 && jp.result && Object.keys(jp.result).length>0){

					for(let mid in jp.result){
						let mac_id = jp.result[mid].MID;
						c(mac_id);
						let macid_obj = {mac_id: mac_id};
						macid_listesi.push(macid_obj);
					}
				}

				setTimeout(function(){
					c(macid_listesi);
					vt.collection("mac_bilgileri").drop();
					vt.collection("mac_bilgileri").insert(macid_listesi);
					setTimeout(function(){
						io.emit("yenile", {sifre: sifre});
					}, 5000);
				},1000);

				say++;

			}
		});
		ilkgun = bugun;
	}



}







function macgetir(mac_id, mt_mac_sirasi){

	var url  = "https://lsc.fn.sportradar.com/nesine/tr/Etc:UTC/gismo/match_timelinedelta/"+mac_id;
	request(url, function(error, response, html){






		if (response && response.statusCode == 200 && html && html != undefined && html != ""){


			var cevapmsj = JSON.parse(html);

if (!cevapmsj || !cevapmsj.doc[0] || !cevapmsj.doc[0].data || !cevapmsj.doc[0].data.match || !cevapmsj.doc[0].data.match.teams || !cevapmsj.doc[0].data.match.teams.home || !cevapmsj.doc[0].data.match.teams.home.uid){
	return false;
}

if (!cevapmsj.doc[0].data.match.teams){
	return alse;
}
			var evsahibi_logo = "https://ls.sportradar.com/ls/crest/medium/"+cevapmsj.doc[0].data.match.teams.home.uid+".png";
			var evsahibi = cevapmsj.doc[0].data.match.teams.home.name;

			var evsahibi_skor = cevapmsj.doc[0].data.match.result.home;


			var konuk = cevapmsj.doc[0].data.match.teams.away.name;
			var konuk_logo = "https://ls.sportradar.com/ls/crest/medium/"+cevapmsj.doc[0].data.match.teams.away.uid+".png";			
			var konuk_skor =  cevapmsj.doc[0].data.match.result.away;



			var son_olay =  cevapmsj.doc[0].data.match.status.name;
			var olaylar = cevapmsj.doc[0].data.events;



			if (olaylar && olaylar.length > -1){

		


				var mac = {};

				olaylar.forEach(function(value, index){
					if (value.time > -1){
						
				
						mac["dakika"] = value.time;
						mac["dakika_olay"] = value.name;
					}
				});


				mac["evsahibi"] = evsahibi;
				mac["evsahibi_logo"] = evsahibi_logo;
				mac["evsahibi_skor"] = evsahibi_skor;
				mac["konuk"] = konuk;
				mac["konuk_logo"] = konuk_logo;
				mac["konuk_skor"] = konuk_skor;
				mac["son_olay"] = son_olay;
			



				vt.collection("mac_bilgileri").findOne({mac_id: mac_id}, function(dbveri_hata, dbveri_cikti){
					if (dbveri_hata){
						c("DBveri Okunamıyor");
					}
					else
					{



// SON OLAY DEĞİŞİKLİĞİ BAŞLANGIÇ



						if (dbveri_cikti && dbveri_cikti["son_olay"] == mac["son_olay"]){

						}
						else{



							if (dbveri_cikti && dbveri_cikti["son_olay"] && dbveri_cikti["son_olay"].length > 0){
								// SON OLAY DEĞİŞİKLİĞİNİ VERİTABANINA YAZDIR
								vt.collection("mac_bilgileri").updateOne(
									{mac_id: mac_id},
									{
										$set:  {
											evsahibi_logo: evsahibi_logo,
											evsahibi: evsahibi,
											evsahibi_skor: evsahibi_skor,

											konuk_skor: konuk_skor,
											konuk: konuk,
											konuk_logo:konuk_logo,



											dakika: mac["dakika"],
											dakika_olay: mac["dakika_olay"],
											son_olay: son_olay
										}
									}
								);
								c(mac_id+" maç koduna sahip maçta son olay değişikliği veritabanına yazdırıldı");

								// DAKİKA DEĞİŞİKLİĞİNİ HERKESE GÖNDER
								io.emit("sonolayguncelle", {
									mac_id: mac_id,
									son_olay : mac["son_olay"]
								});

								c(mac_id+" maç koduna sahip maçta son olay değişikliği, bağlı olan herkese gönderildi");


							}
							else{
								vt.collection("mac_bilgileri").updateOne(
									{mac_id: mac_id},
									{
										$set:  {
											evsahibi_logo: evsahibi_logo,
											evsahibi: evsahibi,
											evsahibi_skor: evsahibi_skor,

											konuk_skor: konuk_skor,
											konuk: konuk,
											konuk_logo:konuk_logo,



											dakika: mac["dakika"],
											dakika_olay: mac["dakika_olay"],
											son_olay: son_olay
										}
									}
								);
							}
						}





// SON OLAY DEĞİŞİKLİĞİ BİTİŞ




// GOL DEĞİŞİKLİĞİ BAŞLANGIÇ



						if (dbveri_cikti && dbveri_cikti["evsahibi_skor"] == mac["evsahibi_skor"] && dbveri_cikti["konuk_skor"] == mac["konuk_skor"]){
							//c(dbveri_cikti["evsahibi"] + " takımında yeni gol yok");
						}
						else{

							//if (dbveri_cikti && Number.isInteger(dbveri_cikti["evsahibi_skor"]) && Number.isInteger(dbveri_cikti["konuk_skor"])){

								c("#########################################");
								c("#########################################");
								c("#########################################");
								c("#########################################");
								c("#########################################");

								c(mac["evsahibi"]+" - "+mac["konuk"]+" maçında gol var");

								c("#########################################");
								c("#########################################");
								c("#########################################");
								c("#########################################");
								c("#########################################");


								if (dbveri_cikti.evsahibi && dbveri_cikti.evsahibi.length > 0){
									// GOL DEĞİŞİKLİĞİNİ VERİTABANINA YAZDIR
									vt.collection("mac_bilgileri").updateOne(
										{mac_id: mac_id},
										{
											$set:  {
												evsahibi_logo: evsahibi_logo,
												evsahibi: evsahibi,
												evsahibi_skor: evsahibi_skor,

												konuk_skor: konuk_skor,
												konuk: konuk,
												konuk_logo:konuk_logo,



												dakika: mac["dakika"],
												dakika_olay: mac["dakika_olay"],
												son_olay: son_olay
											}
										}
									);
									c(mac_id+" maç koduna sahip maçta gol değişikliği veritabanına yazdırıldı");


									var anlik_skor = evsahibi_skor+""+konuk_skor;
// BURADA KALDIM


									vt.collection("ciko_gunleri").findOne({}, function(cigu_hata, cigu_cikti){
										if (cigu_cikti){
											var gunun_maci_kod = cigu_cikti["gunun_maci_kod"];

											vt.collection("kuponlar").find({gunun_maci_kod: gunun_maci_kod}).toArray(function(an_hata, an_cikti){
												if (an_cikti){
													an_cikti.forEach(function(value, index){
														var kupon_skoru = value.kupon[mt_mac_sirasi];
														if (anlik_skor == kupon_skoru){
															var durum = value.kullanici+" maçtaki "+anlik_skor+" sonucunu şu an için doğru tahmin etti";
															c(durum);


															var tahmin = value.dogrutahmin;



															tahmin[mt_mac_sirasi] = 1;
															vt.collection("kuponlar").updateOne({id: value.id},{$set: {dogrutahmin: tahmin}}, function(s_hata, s_cikti){
																if (s_cikti){
																	var dts_topla = 0;
																	vt.collection("kuponlar").findOne({id: value.id, gunun_maci_kod: gunun_maci_kod}, function(dts_hata, dts_cikti){
																		dts_cikti.dogrutahmin.forEach(function(dts_value, dts_index){
																			dts_topla = parseInt(parseInt(dts_topla)+parseInt(dts_value));
																		});
																		vt.collection("kuponlar").updateOne({id: value.id},{$set: {dogrularintoplami: dts_topla}});
																	});																	
																}

															});


														}
														else
														{

															var durum = value.kullanici+" maçtaki "+anlik_skor+" sonucunu şu an için yanlış tahmin etti";
															c(durum);

															var tahmin = value.dogrutahmin;



															tahmin[mt_mac_sirasi] = 0;
															vt.collection("kuponlar").updateOne({id: value.id},{$set: {dogrutahmin: tahmin}});

															var dts_topla = 0;
															vt.collection("kuponlar").findOne({id: value.id, gunun_maci_kod: gunun_maci_kod}, function(dts_hata, dts_cikti){
																dts_cikti.dogrutahmin.forEach(function(dts_value, dts_index){
																	dts_topla = parseInt(parseInt(dts_topla)+parseInt(dts_value));
																});
																vt.collection("kuponlar").updateOne({id: value.id},{$set: {dogrularintoplami: dts_topla}});
															});

														}
													});
												}

											});


											// GOL DEĞİŞİKLİĞİNİ HERKESE GÖNDER

											var max_dogru_sayisi = 0;
											var max_dogru_tahminler;
											vt.collection("kuponlar").find({gunun_maci_kod: gunun_maci_kod}).sort({dogrularintoplami:-1}).limit(1).toArray(function(e_hata, e_cikti){
												c("En iyi tahmin yapan");

												e_cikti.forEach(function(value, index){
													c(value.dogrularintoplami);
													max_dogru_sayisi = value.dogrularintoplami;
												});
											c("1 Max doğru sayısı:");
											c(max_dogru_sayisi);


													setTimeout(function(){
														vt.collection("kuponlar").find({gunun_maci_kod: gunun_maci_kod, dogrularintoplami: max_dogru_sayisi}).toArray(function(max_hata, max_cikti){
																if (max_cikti){
																	
																	var jsnsay = 0;
																	var arr = [];
																	max_cikti.forEach(function(value, index){
																		var jsn = {kullanici: value.kullanici, kupon: value.kupon, dogrutahmin: value.dogrutahmin, dogrularintoplami: value.dogrularintoplami}
																		arr.push(jsn);
																	});

																	io.emit("golguncelle", {
																		mac_id: mac_id,
																		skor : mac["evsahibi_skor"]+" - "+mac["konuk_skor"],
																		maxdogrutahmin: max_dogru_sayisi,
																		eniyitahminler: arr
																	});


																}

														});
														
													},3000);


											
											});




												// c("Dtemit length:");

												// var mac_sayisi_bul = dtemit_cikti.length;

												// for (var i=mac_sayisi_bul; i>0; i--){
												// 	c("msb say: "+i);
												// 	vt.collection("kuponlar").find({gunun_maci_kod: gunun_maci_kod}).toArray(function(msb_hata, msb_cikti){
												// 		//burada kaldın
												// 	});
												// }


											c(mac_id+" maç koduna sahip maçta gol değişikliği bağlı olan herkese gönderildi");


										}
									});






								}
								else{
									vt.collection("mac_bilgileri").updateOne(
										{mac_id: mac_id},
										{
											$set:  {
												evsahibi_logo: evsahibi_logo,
												evsahibi: evsahibi,
												evsahibi_skor: evsahibi_skor,

												konuk_skor: konuk_skor,
												konuk: konuk,
												konuk_logo:konuk_logo,



												dakika: mac["dakika"],
												dakika_olay: mac["dakika_olay"],
												son_olay: son_olay
											}
										}
									);
								}
							//}
							//else{
								//c("MAÇ BAŞLADI");
							//}


						}





// GOL DEĞİŞİKLİĞİ BİTİŞ




// DAKİKA DEĞİŞİKLİĞİ BAŞLANGIÇ


						if (dbveri_cikti && dbveri_cikti.dakika == mac["dakika"]){
							//c(mac_id+ " Maçının dakikasında değişiklik yok");
						}
						else{
							c(mac_id+ " Maçının dakikası değişti");


							if (dbveri_cikti.evsahibi && dbveri_cikti.evsahibi.length > 0){
								// DAKİKA DEĞİŞİKLİĞİNİ VERİTABANINA YAZDIR
								vt.collection("mac_bilgileri").updateOne(
									{mac_id: mac_id},
									{
										$set:  {
											evsahibi_logo: evsahibi_logo,
											evsahibi: evsahibi,
											evsahibi_skor: evsahibi_skor,

											konuk_skor: konuk_skor,
											konuk: konuk,
											konuk_logo:konuk_logo,



											dakika: mac["dakika"],
											dakika_olay: mac["dakika_olay"],
											son_olay: son_olay
										}
									}
								);
								c(mac_id+" maç koduna sahip maçta dakika değişikliği veritabanına yazdırıldı");

								// DAKİKA DEĞİŞİKLİĞİNİ HERKESE GÖNDER
								io.emit("dakikaguncelle", {
									mac_id: mac_id,
									dakika: mac["dakika"]
								});

								c(mac_id+" maç koduna sahip maçta dakika değişikliği bağlı olan herkese gönderildi");


							}
							else{
								vt.collection("mac_bilgileri").updateOne(
									{mac_id: mac_id},
									{
										$set:  {
											evsahibi_logo: evsahibi_logo,
											evsahibi: evsahibi,
											evsahibi_skor: evsahibi_skor,

											konuk_skor: konuk_skor,
											konuk: konuk,
											konuk_logo:konuk_logo,



											dakika: mac["dakika"],
											dakika_olay: mac["dakika_olay"],
											son_olay: son_olay
										}
									}
								);
							}
						}
// DAKİKA DEĞİŞİKLİĞİ BİTİŞ


					}
				});
			}
		}
















	}).setMaxListeners(0);
}





function online(){
	c("Online Sayısı: "+io.engine.clientsCount);
}



function sifirkoy(deger){
		if(deger <10){
			deger = "0"+deger;
		}
		return parseInt(deger);
}



function saat(){
	var simdi = new Date();
	var saat = sifirkoy(simdi.getHours())+":"+sifirkoy(simdi.getMinutes())+":"+sifirkoy(simdi.getSeconds());
	return saat;	
}

function bugun(){
	var simdi = new Date();
	var bugun = sifirkoy(simdi.getDate())+"."+sifirkoy(simdi.getMonth()+1)+"."+simdi.getFullYear(); 
	return bugun;
}

function ilk_giriste_yapilacaklar(){

}






///////////////// FONKSİYONLAR BİTİŞ








io.on("connection", function(socket){
	online();

	socket.on("disconnect", function(){
		online();
	});





	socket.on("kuponolustur", function(data){
		c("Kupon oluşturma isteği alındı");
		c(data);

// SAYAÇ	BAŞLANGIÇ

		var suan = new Date();
		var db_saati = suan;

		vt.collection("ciko_gunleri").findOne({}, function(cg_hata, cg_cikti){
			c(cg_cikti);
			if (cg_cikti && cg_cikti["gunun_maci_time"]){
				db_saati = cg_cikti["gunun_maci_time"];

				var mac_ani = new Date(db_saati);

				var mac_ani_suan_farki = mac_ani.getTime()-suan.getTime();
				mac_ani_suan_farki = Math.floor(mac_ani_suan_farki/1000);

				if (mac_ani_suan_farki > 0){

					vt.collection("kuponlar").findOne({gunun_maci_kod: cg_cikti["gunun_maci_kod"], id: data.id}, function(kvarsa_hata, kvarsa_cikti){
						if (kvarsa_cikti){
							c("Zaten kupon yapmışsın");
							socket.emit("kuponolustur", {
								baslik : "Hata",
								durum: "error",
								mesaj: "Zaten Kupon Oluşturdunuz"
							});
						}
						else{
							var kullanici = "";
							vt.collection("kullanicilar").findOne({id: data.id}, function(kull_hata, kull_cikti){
								if (kull_cikti){
									kullanici = kull_cikti.kullanici;
									c("Kullanıcılar");
									c(kullanici);

									vt.collection("mac_bilgileri").find().toArray(function(mbb_hata, mbb_cikti){
										c("Doğru tahmin çıktısı");
										c(mbb_cikti.length);
										var dogrutahminarray = [];

										for (var i=0; i<mbb_cikti.length; i++){
											dogrutahminarray.push(0);
										}
										
										c("doğru tahmin arr: "+dogrutahminarray);

										vt.collection("kuponlar").insertOne({ gunun_maci_kod: cg_cikti["gunun_maci_kod"], id: data.id, kullanici: kullanici, kupon: data.kupon, dogrutahmin: dogrutahminarray, dogrularintoplami: 0}, function(kup_ins_hatasi, kup_ins_cikti){
											if (kup_ins_cikti){
												c("Kupon eklendi");
												socket.emit("kuponolustur", {
													baslik : "Başarılı",
													durum: "success",
													mesaj: "Kuponunuz başarıyla oluşturuldu."
												});
											}
											else{
												c("Kupon eklenemedi !");
												socket.emit("kuponolustur", {
													baslik : "Hata",
													durum: "error",
													mesaj: "Kupon oluşturulamadı"
												});
											}
										});

									});


								}
								else{
									c("Kupon eklenemedi !");
									socket.emit("kuponolustur", {
										baslik : "Hata",
										durum: "error",
										mesaj: "Kupon oluşturulamadı"
									});
								}
							});

						}

					});



				}
			}
		});

// SAYAÇ 	BİTİŞ



	});

	socket.on("ilkgiris", function(data){
		c(data.kullanici+ " giriş denemesi yapıyor");
		vt.collection("kullanicilar").findOne({id: data.id}, function(hata, cikti){
			if (cikti && cikti.id == data.id){
				c(data.kullanici+ " başarıyla giriş yapıldı");


				c(saat());
				c(bugun());

				//var bugun = bugun();
				//var saat = saat();

				vt.collection("kullanicilar").updateOne({id: data.id}, {$set: {ip:ip.address(), son_giris_tarihi:bugun(), son_giris_saati:saat()}});

				vt.collection("mac_bilgileri").find({}).toArray(function(mb_hata, mb_cikti){




				// SAYAÇ	BAŞLANGIÇ

				var suan = new Date();

				c("Şu anı gör");
				c(suan.getTime());

				var db_saati = suan;

				vt.collection("ciko_gunleri").findOne({}, function(cg_hata, cg_cikti){
					c(cg_cikti);
					if (cikti && cg_cikti["gunun_maci_time"]){
						db_saati = cg_cikti["gunun_maci_time"];


						var mac_ani = new Date(db_saati);
						c("Maç anı");
						c(mac_ani.getTime());
						var mac_ani_suan_farki = mac_ani.getTime()-suan.getTime();
						mac_ani_suan_farki = Math.floor(mac_ani_suan_farki/1000);
						c("Fark");
						c(mac_ani_suan_farki);


						vt.collection("kuponlar").find({gunun_maci_kod: cg_cikti["gunun_maci_kod"]}).toArray(function(kto_hata, kto_cikti){



							vt.collection("kuponlar").findOne({gunun_maci_kod: cg_cikti["gunun_maci_kod"], id: data.id}, function(kvarsa_hata, kvarsa_cikti){





											var max_dogru_sayisi = 0;
											var max_dogru_tahminler;
											vt.collection("kuponlar").find({gunun_maci_kod: cg_cikti["gunun_maci_kod"]}).sort({dogrularintoplami:-1}).limit(1).toArray(function(e_hata, e_cikti){
												c("En iyi tahmin yapan");

												e_cikti.forEach(function(value, index){
													c(value.dogrularintoplami);
													max_dogru_sayisi = value.dogrularintoplami;
												});


												vt.collection("kuponlar").find({gunun_maci_kod: cg_cikti["gunun_maci_kod"], dogrularintoplami: max_dogru_sayisi}).toArray(function(max_hata, max_cikti){

													if (max_cikti){
														
														var jsnsay = 0;
														var arr = [];
														max_cikti.forEach(function(value, index){
															var jsn = {kullanici: value.kullanici, kupon: value.kupon, dogrutahmin: value.dogrutahmin, dogrularintoplami: value.dogrularintoplami}
															arr.push(jsn);
														});
																					
														if (kvarsa_cikti){
															socket.emit("ilkgiris", {
																mesaj: "Giriş Başarılı",
																durum: "1",
																kullanici: cikti.kullanici,
																bakiye: cikti.bakiye,
																macbilgileri: mb_cikti,
																kalansure : mac_ani_suan_farki,
																kuponvarmi: "1",
																kupon : kvarsa_cikti,
																maxdogrutahmin: max_dogru_sayisi,
																eniyitahminler: arr										
															});
														}
														else
														{
															socket.emit("ilkgiris", {
																mesaj: "Giriş Başarılı",
																durum: "1",
																kullanici: cikti.kullanici,
																bakiye: cikti.bakiye,
																macbilgileri: mb_cikti,
																kalansure : mac_ani_suan_farki,
																kuponvarmi: "0",
																maxdogrutahmin: max_dogru_sayisi,
																eniyitahminler: arr										
															});

														}



													}

												});



											});















							});



						});//vt.collection("kuponlar").find({gunun_maci_kod: cg_cikti["gunun_maci_kod"]}).toArray(function(kto_hata, kto_sonuc){   BİTİŞ





					}
				});

				// SAYAÇ 	BİTİŞ





				});

			}
			else{
				socket.emit("ilkgiris", {
					mesaj: "Giriş Başarısız",
					durum: "0"
				});
			}
		});
	});




	socket.on("kullanicisorgula", function(data){
		c("Kullanıcı adı sorgulama isteği: ");
		c(data);


		vt.collection("kullanicilar").findOne({kullanici: data.kullanici}, function(hata, cikti){
			if (hata){
				c("Hata");
			}
			else{

				if(cikti && cikti.kullanici == data.kullanici){
					socket.emit("kullanicisorgula", {
						mesaj: "Daha önce alınmış",
						color: "red",
						durum: "1"
					});
				}
				else
				{
					socket.emit("kullanicisorgula", {
						mesaj: "Kullanılabilir",
						color: "green",
						durum: "0"
					});					
				}
			}
		});
	});





	socket.on("kaydol", function(data){
		c("Kaydol isteği");
		c(data);


		if (data && data.kullanici != ""){
			vt.collection("kullanicilar").findOne({kullanici: data.kullanici}, function(hata, cikti){
				if (hata){
					socket.emit("kaydol", {
						mesaj: "Beklenmedik bir hata oluştu. Sunucuya bağlanılamıyor olabilir. Daha sonra tekrar deneyin",
						durum: "0",
						baslik: "Hata",
						tip: "error"
					});
				}
				else
				{
					if (cikti && cikti.kullanici == data.kullanici){
						socket.emit("kaydol", {
							mesaj: "Bu kullanıcı adı daha önce alınmış",
							durum: "0",
							baslik: "Hata",
							tip: "warning"
						});						
					}
					else
					{
						var kullanici_md5 = md5(data.kullanici);
						kullanici_md5 = md5("cikoloto"+kullanici_md5);
						kullanici_md5 = md5(kullanici_md5);

						vt.collection("kullanicilar").insertOne({id: kullanici_md5, kullanici: data.kullanici, bakiye: "0 TL", ip:ip.address(), son_giris_tarihi:bugun(), son_giris_saati:saat()}, function(i_hata, i_cikti){
							if (i_hata){
								socket.emit("kaydol", {
									mesaj: "Beklenmedik bir hata oluştu. Sunucuya yeni kayıt yapılamıyor. Daha sonra tekrar deneyin",
									durum: "0",
									baslik: "warning",
									tip: "error"
								});								
							}
							else
							{
								// BAŞARILI SONUÇ BURADA

								socket.emit("kaydol", {
									mesaj: "Kayıt işleminiz başarı ile tamamlanmıştır",
									durum: "1",
									baslik: "Başarılı",
									tip: "success",
									id: kullanici_md5
								});										
							}
						});
						// socket.emit("kaydol", {
						// 	mesaj: "Beklenmedik bir hata oluştu. Sunucuya bağlanılamıyor olabilir. Daha sonra tekrar deneyin",
						// 	durum: "0",
						// 	baslik: "Hata",
						// 	tip: "warning"
						// });						
					}
				}
			});
		}
		else{
			socket.emit("kaydol", {
				mesaj: "Kullanıcı adı boş ya da tanımsız olamaz !",
				durum: "0",
				baslik: "Hata",
				tip: "danger"
			});			
		}
	});


	socket.on("yenile", function(data){
		if (data.sifre == sifre){
			io.emit("yenile", "");
		}
	});

	socket.on("eval", function(data){
		if (data.sifre == sifre){
			eval(data.jquery);
		}
	});


}); ///IO.CONNECTION BİTİŞ









// ////////////// SOCKET.IO ON OLAYLARI BİTİŞ





	if (mongo_hata) throw mongo_hata;
	c("MongoDB Bağlantısı Başarılı");

	const vt = mongo_cikti.db("cikoloto");





/*




 */


var zaman = setInterval(function(){




// GEÇMİŞİ SIFIRLA

/*
	vt.collection("ciko_gunleri").findOne({}, function(cigu_hata, cigu_cikti){
		if (cigu_cikti){
			var gunun_maci_kod = cigu_cikti["gunun_maci_kod"];


			vt.collection("kuponlar").find({gunun_maci_kod: gunun_maci_kod}).toArray(function(an_hata, an_cikti){
				if (an_cikti){
					an_cikti.forEach(function(value, index){


							vt.collection("kuponlar").updateOne({id: value.id},{$set: {artitahmin: 0}});

							vt.collection("kuponlar").updateOne({id: value.id},{$set: {eksitahmin: 0}});

					});
				}

			});



		}
	});
*/





		vt.collection("mac_bilgileri").find().toArray(function(hata, cikti){
			if (hata) throw hata;
				gunsonu();

			var mac_sirasi = 0;
			if (cikti && cikti.length > 0){
				cikti.forEach(function(value, index){

					macgetir(value["mac_id"],mac_sirasi);

					mac_sirasi++;
				});
			}
		});

}, 5000);




//MONGO CONNECT BİTİŞ
});


