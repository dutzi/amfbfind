/*jshint multistr:true*/
'use strict';

angular.module('amfbfindApp').controller('MainCtrl', function (
	$scope, 
	$http,
	$q
) {
	var lastIndexChecked, numChecking;
	const STATE_IS_WAITING = 'is-waiting';
	const STATE_IS_CHECKING = 'is-checking';
	const STATE_IS_ONLIST = 'is-onlist';
	const STATE_IS_OFFLIST = 'is-offlist';

	$scope.startChecking = function () {

		var contacts = $scope.contactsString.split('\n');

		$scope.contacts = [];

		for (var i = 0; i < contacts.length; i++) {
			var contact = contacts[i].split(',');
			if (contact.length === 2) {
				$scope.contacts[i] = {
					name: contact[0].trim(),
					email: contact[1].trim()
				};
			} else {
				$scope.contacts[i] = {
					email: contact[0].trim()
				};
			}
			$scope.contacts[i].state = STATE_IS_WAITING;
		}

		startQueue();
	};

	$scope.contactsString = '\'Nati Hanoh\', talush21@hotmail.com\nAdam Sanderson, casooto@gmail.com\nAdam Vinokoor, a.vinokoor@gmail.com\nAdi Du, adidili1@gmail.com\nAdi Klag, adiklag@gmail.com\nAdir Duchan, adirduchan1@walla.com\nAdi Shwartzman, adi_sw@windowslive.com\nAdi Unger, unger.adi@gmail.com\nAdi Yaniv, adidasy2000@yahoo.com\nAlma Elliott Hofmann, alma.elliott.hofmann@gmail.com\nAlon Ben-yair, alonbenyair@gmail.com\nAlon Shavit, shavit.alon@gmail.com\nAlon Strutsovsky, kashiwagis5@gmail.com\nAmichai David, tsvaot@yahoo.com\nAmihay Gonen, gonen21@gmail.com\nAmir Barkai, b-amico@hotmail.com\nAmir Shalem, amenly@gmail.com\nAmir Taichman, taichman@gmail.com\nAmit Boyarski, deadpool1000@yahoo.com\nAmit Sarid, saridamit@gmail.com\nAnat Kutner, anatkutner@hotmail.com\nAnat Ronen, anatr86@hotmail.com\nAnat Rotem, rotem.anat@gmail.com\nAndrea Saporito, andreasaporito@hotmail.com\nArad Akikous, arad.aki@gmail.com\nArava Itelson, arava@studioarava.com\nArina Koren, arinabk@gmail.com\nAronovici Harry, harry.aronovici@alice.it\nAsaf Harel, asaflavirl@gmail.com\nAsaf Nadir, asafnadir@hotmail.com\nAsafsky Levi, asafcha@about.me\nAssaf Appelboim, appelboy@walla.com\nAssaf Ben-Yossef, assafby@gmail.com\nAssaf Oppenheimer, asi@oppenheimer.co.il\nAviad Tobaly, aviad.tobaly@gmail.com\nAvi Berger, astraysoul@hotmail.com\nAviram Avidan, aviram.avidan@gmail.com\nAviram Gabay, aviramga@gmail.com\nAviv Eshed, avivesh85@gmail.com\nAviv Lichtigstein, avivlichtig@gmail.com\nAyal Stern, ayal7878@gmail.com\nAyelet Ackerfeld, ayelet.ack@gmail.com\nAyelet Robinson, ayelet.robinson@gmail.com\nBar Graubard, bargrob@gmail.com\nBen Fisher, adv.fisher@gmail.com\nBen Golan, golanben1@gmail.com\nBen Graubard, diamonddemon@gmail.com\nBenjamin Cates, catesbenjamin123@hotmail.com\nBenjy Cook, benjycook@hotmail.com\nBenny Weingarten-Gabbay, gardenofwine@gmail.com\nBetsy Laikin, betsydara@gmail.com\nBilly Pery, billypery@gmail.com\nBoaz Adato, boazadato@gmail.com\nBoaz Kantor, facebook@junkiada.com\nBoaz Shafrir, boazshaf@gmail.com\nBono Messi, bono422@hotmail.com\nCarlos Katerinsky, shortasscharlie@hotmail.com\nCaroline Logan, caroline.b.logan@gmail.com\nCarolyn Maurer, carolynwahid@gmail.com\nChen Gafner, chen_gafner@walla.com\nChristina Förster, cms.foerster@gmail.com\nDalia Meytes, dmeytes@gmail.com\nDana Kritstien, danakriz@gmail.com\nDana Zilberman, zilberman.dana@gmail.com\nDaniel Koren, korenensemble@gmail.com\nDaniel Levy, danielevy.dl@gmail.com\nDaniel Offek, drumerstick@gmail.com\nDaniel Sagi, danielsagi@hotmail.com\nDani Golovaty, ag1234@gmail.com\nDani Megrelishvili, dani@veecee.net\nDanny Leshem, dleshem@gmail.com\nDan Raz, danraz123@yahoo.com\nDavid Rogers, davidjoshuarogers@gmail.com\nDeirdre Golub, deirdre7@gmail.com\nDeirdre Mills, deirdre.b.mills@gmail.com\nDekel Shavit, dekel.shavit@gmail.com\nDhana Messing, danamessing@walla.com\nDina Leventol, dinaleventol@gmail.com\nDor Midlash, dorphantompain@gmail.com\nDoron Atuar, doronatuar@gmail.com\nDoron Shohet, doron_shohet@hotmail.com\nDoron Vaida, doron.vaida@gmail.com\nDror Davidovich, drordoit@gmail.com\nDror Haas, haasd@bgu.ac.il\nDudi Rubin, dudrubin@gmail.com\nDudu Davidoff, dudu.davidoff@gmail.com\nEden Shochat, edensh@gmail.com\nEdo Bar Gil, bargiledo@gmail.com\nEfrat Rubinstein, efikefi23@gmail.com\nEinat Kreiczer, einatkre@gmail.com\nEinat Shamir, shamir.einat@gmail.com\nEinat Volach, einalev@gmail.com\nEinat Weinboim, einatushka.wein@gmail.com\nElad Gariany, ggrelad@gmail.com\nElad Katz, eladkt@gmail.com\nElad Levy, ellevy12@gmail.com\nElinor Kashani, elinorkn@gmail.com\nElinor Lechtman, elinorle@gmail.com\nEliran Teller, themadkow@gmail.com\nElvira Neiman, elviran11@gmail.com\nEmily Shavro Shamir, emilyshamir@gmail.com\nEran Mika, eranmika@hotmail.com\nEran Orlev, eranorlev@gmail.com\nEran Zaken, eranzaken@gmail.com\nEtai Biran, etbiran@gmail.com\nEti Fisher, etifisher@gmail.com\néva Grünhut, buza79is@yahoo.com\nEvgenia Dobrovinska, evgenia.dobrovinska@gmail.com\nEyal Rofe, eyal.rofe@gmail.com\nEyal Roth, eyalroth1@gmail.com\nFanta Fanta, fanta240@walla.com\nFefe Nucho, thefelfes@hotmail.com\nFelix SB, felixbroco@hotmail.com\nFiodor Zilber, fedia85@gmail.com\nGad Meyer, gadmeyer@gmail.com\nGal Chen, galchs@gmail.com\nGal Frenkel, gal@intoatv.com\nGali Newman, galinewman@yahoo.com\nGall Zvyagin, gkirok@gmail.com\nGal Olkinizki, olkigal@gmail.com\nGaya Turtle, gayaturtle@gmail.com\nGev Rotem, gevrotem@gmail.com\nGil Alexandrony, gil.alexandrony@gmail.com\nGil Cohen, gilcohen84@gmail.com\nGil Dibner, gdibner@gmail.com\nGil Rimon, rimonster@gmail.com\nGiora Laibovitch, crappon@gmail.com\nGolan Salman, golansa05@gmail.com\nGuy Gal-Hen Oren, guyor1@walla.co.il\nGuy Feldberg, cardshark187@gmail.com\nGuy Gelman, gelmanguy@gmail.com\nGuy Kohn, guykohn@gmail.com\nHadas Ast, hadusky@walla.co.il\nHadas Jacobi Sar Shalom, hadas.j@gmail.com\nHadas Levi, hadas_le@012.net.il\nHagar Ben Yishay, hagarbenyishay@gmail.com\nHagit Levy, hagitlevy6@gmail.com\nHai Turkenitch, symdream1@yahoo.com\nHayim Sarfati, hayim@tidal.co.il\nHen Amar, hen1610@gmail.com\nHen Elkarat, hen.elkarat@gmail.com\nHen Schneider, hensc1984@gmail.com\nHila Brozky, hila_brozky@hotmail.com\nHila Kirshenboim, hilak70@gmail.com\nHila Kraisler Cohen, hilac@neogames.com\nHila Kup, chocomik@gmail.com\nHila Matsrafi Kerer, hilala.mt@gmail.com\nIda Lue, ida.lube@yahoo.com\nIdan Babler, idan.app@gmail.com\nIdan Touito, idantouito@walla.co.il\nIdit Gershoni, iditger@gmail.com\nIdo Av, ido.starter@gmail.com\nIdo Bass, ido.bass@gmail.com\nIdo Yablonka, ido.yablonka@gmail.com\nIevgeniia Tolstiakova, xtea@yandex.ru\nIfat Fledel, ifatfle@gmail.com\nIlia Oshmiansky, ili12000@yahoo.com\nInbal Kochavi, inbalkochavi@gmail.com\nInbal Neumann, inbal_neumann1@walla.co.il\nIppei Shimamura, ishimamura@mac.com\nIrit Malka, irit.malka@gmail.com\nItay Klein, klein.itay@hotmail.com\nItay Zecharia, itayoz@netvision.net.il\nJacob Dvir, jacob.dvir@gmail.com\nJeff Pulver, jeff@pulver.com\nJenny Mcflurry, jenny.mcflurry@gmail.com\nJohanna Best, hanna-best@web.de\nJonathon BenHaim, jonathonbenhaim2@gmail.com\nJulia Semmlinger, julia_semmlinger@yahoo.de\nKarin Levi, karinlevi144@gmail.com\nKarpadito Shaviv, karpadito@karpadito.com\nKatharina Wa, k.waldleitner@hotmail.de\nKeren Aharon, ah_keren@hotmail.com\nKeren Breitman, kerensharf@walla.co.il\nKeren Ramot, kramot@gmail.com\nKeren Rubin, swedishkeren@gmail.com\nKeshet Rosenthal, keshetrosental@gmail.com\nKobi Moshe, amit_ass@netvision.net.il\nKristoffer Morrison, krismorrison@gmail.com\nLaura Schwartz, laura_schwartz@hotmail.fr\nLeanne Amsterdam, la18a@yahoo.com\nLiad Avidov, liadavidov@yahoo.com\nLi Antra, jinjula2000@yahoo.com\nLiatben Mantra, magicalpalayground@gmail.com\nLihi Oren Yardeni, oren.lihi@gmail.com\nLilah Marzouk, lilahmarzouk@gmail.com\nLily Borohov, lia708@walla.com\nLior Eskenasy, lioreskenasy@gmail.com\nLior Kalai, liorkalai@gmail.com\nLior Lev-Ran, lior.levran@gmail.com\nLior Manor, lior@liormanor.co.il\nLior Sela, lior_sela@hotmail.com\nLior Vaintrov, lvaintrov@gmail.com\nLiron Finegold, lironfi@bgu.ac.il\nLital Gilad, litalgilad@gmail.com\nLizi Mizrachi, liz.miz@gmail.com\nMaayan Natan, maayanbarnatan@yahoo.com\nMaayan Rechtman, rmaayan1@gmail.com\nMaera Hagage, namror@gmail.com\nMarina Bass, m.lalchuk@gmail.com\nMatan Tamir, matant_86@walla.co.il\nMattea Patrickson, smoothje_mattya@hotmail.com\nMaxim Alexandrovich, makc900@gmail.com\nMaya Bick, mayawoock@googlemail.com\nMaya Marom, mayamarom@gmail.com\nMenash Edri, menash_edri@walla.com\nMeshi Avrahami, meshiavrahami@gmail.com\nMichal Bott, bott.michal@gmail.com\nMichal Mery Battat, mikomiro@gmail.com\nMichal Zeira, mzeira@gmail.com\nMicha Porat, porat.micha@gmail.com\nMika Josting, mikajosting@gmail.com\nMike Rsnb, michaelrosenblit@att.net\nMiri Nuriel, mirinuriel87@gmail.com\nMor Alon, moralon1@gmail.com\nMoran Alterzon Avisar, moranalter@gmail.com\nMoranne Natovich, moran8n@gmail.com\nMor Feigenbaum, f_mmor@yahoo.com\nMor Malachi, mortzipor@yahoo.com\nMor Segal, morimor88@gmail.com\nMylène Sj, nemiah304@hotmail.fr\nNaama David Nahari, usht@walla.co.il\nNaama Rodrigues, nerot10@walla.co.il\nNadav Mayer, nadav2675@gmail.com\nNanu Greenfeld, greenfeldnanu@gmail.com\nNarin Carmel, carmeln@gmail.com\nNatalie Argil, natalieargil@walla.com\nNaty Zimmer-Gabbay, natyga5@yahoo.com\nNetanel Wachshtein, netanel@mangonet.co.il\nNetanel Weizman, net_1@walla.co.il\nNima Ktalav, nimaktalav333@hotmail.com\nNimrod Moran, nimital@gmail.com\nNirit Gourgy Ben Ron, niritg@gmail.com\nNir Morgolis, nirmorgo@gmail.com\nNir Weber, webernir@gmail.com\nNissan Ninio, nninio@gmail.com\nNiv Lax, 4nooby4@gmail.com\nNiv Steingarten, nivstein@gmail.com\nNoa Kristianpoller, noakristi@gmail.com\nNoa Magger, contact@noawed.com\nNoam Avigdor, noamavigdor@gmail.com\nNoam Hollander, noam.hollander@gmail.com\nNoa Pniel, noapniel@gmail.com\nNoemi Brezins, brezinsnoemi@hotmail.com\nNoga Levy, mcgogga@gmail.com\nNora Ilan, nora777@gmail.com\nOded Shimon, ods5926@gmail.com\nOdin Shadmi, odinshadmi@gmail.com\nOfir Beigel, ofir@nhm.co.il\nOfir Kochavi, ofir.ko9@gmail.com\nOhad PowerShot, ohadeliasi@gmail.com\nOmer Davidovich, omerdav@gmail.com\nOmer Pollak, omerpollak@gmail.com\nOmri Brand, omri_brand@walla.co.il\nOmri Shor, omrisho@gmail.com\nOphir Zardok Shemer, zophir@hotmail.com\nOren Almozlino, orenalmoz@gmail.com\nOren Avraham, oren.avraham@gmail.com\nOren Nahari, orenahari@gmail.com\nOren Shalom, oren.sarshalom@gmail.com\nOri Ganani, ori.leviganani@gmail.com\nOrit Moskovich, orit.mosko@gmail.com\nOrlev Shahar, orlev01@gmail.com\nOrtal Avidov, ortalavidov@walla.com\nOz Levanon, oz.levanon@gmail.com\nOzzie Luk-Zilberman, shiraabr@cs.huji.ac.il\nPavel Shnayder, chobozil@yandex.ru\nPlamen Yulzari, patsi16@abv.bg\nPloni Almoni, 77plonialmoni@gmail.com\nRachel Everingham, rachel_everingham@hotmail.com\nRonen Kluska, ronenkluska@gmail.com\nRonen Ventura, v.ronen@gmail.com\nRonit Beeri, ronitbee@gmail.com\nRonny Elkayam, ronnyelkayam@gmail.com\nRotem Biton, rotemism@gmail.com\nRotem Shor, rotemshor@gmail.com\nRottem Paz, rottemita@gmail.com\nRoy Avrahami, roy11.roy22@gmail.com\nRoy Dotan, roydotan1@gmail.com\nRoy Maulbogat, maulbogat@gmail.com\nRoy Sharon, roy_sharon55@yahoo.com\nSam Abizdris, billiabizdris@gmail.com\nSanda Kanner, sandica2009@gmail.com\nShachar Levy, shacharily@gmail.com\nShai Almog, shai.almog@gmail.com\nShany Peleg, shanyp27@hotmail.com\nSharonna Cohen, shanikc@hotmail.com\nShauli Rejwan, shauli.rejwan@gmail.com\nShay Bloch, blochshay@gmail.com\nShay Cohen, snoopycohen@gmail.com\nShay Galy, shaygaly@gmail.com\nShay Lichtin, shayoosh@gmail.com\nShay Reshef, sreshef@gmail.com\nShen Baco, shenbaco@gmail.com\nShimmi Harel, shimmix@gmail.com\nShiree Shavit, susishavit@gmail.com\nShir Goldstein, shirgoldstein@gmail.com\nShiri Greenfeld, cemeterycherry@gmail.com\nShirley Dan-Ari, scohenmintz@gmail.com\nShirley Segal, shirlush20@hotmail.com\nShlomi Haguel, shlomih87@gmail.com\nShmuel Fortman Hapartzy, shmuel.fortman@gmail.com\nShy Peleg, shy_peleg@yahoo.com\nSmadar Avidan, smadaravidan@gmail.com\nSmile Caster, ronithree@gmail.com\nSofia De Mello-Barreto, sofiademb@gmail.com\nStella Allets, stella_schaefer@web.de\nSteph Meff, stephi.meyer@bluewin.ch\nSummer Anderson, natureslace@gmail.com\nTakara Udagawa, udagawa.tkr@gmail.com\nTal Bar, tal_bar@hotmail.com\nTal Elson, tal_howie@walla.co.il\nTal Levi, leviv@post.bgu.ac.il\nTal Ron-Pereg, talinew@gmail.com\nTal Shmayahu, tal.shmayahu@gmail.com\nTal Stern, talstern@walla.co.il\nTal Zohar, talzohar8@gmail.com\nTlalit Segal Raayoni, tlalit.sr@gmail.com\nTom Aharon, tomcatom@gmail.com\nTom Aizenstros, tomairo@gmail.com\nTomer Weller, tomer.weller@gmail.com\nTom Housman, tomhousman@gmail.com\nTsvika Shapira, tsvikas@gmail.com\nValeria Pundik, valeriapn@gmail.com\nVera Msnk, v.musnik@laposte.net\nVered Rachmani, im.alwaysss@gmail.com\nVered Shabtay, shabtayv@hotmail.com\nVerena Brockovich, schnubblbiene@gmx.de\nVictor Truhanov, victor.truhanov1@gmail.com\nVova Abayev, vova.abayev@gmail.com\nYael Gabay, yaelga@gmail.com\nYael Hazan, yael_h@yahoo.com\nYael Lanir, ylanir@hotmail.com\nYael Nathan, yaeln@mac.com\nYael Roskis, yaelroskis@gmail.com\nYael Sterenberg, yael.sterenberg@gmail.com\nYair Halevi, yh.spock@gmail.com\nYair Hanania, yair_almana@walla.com\nYanay Ben Noach, kelso815@gmail.com\nYaniv Cohen, yanivcoh.sv@gmail.com\nYaniv Katz, katz_yaniv@walla.co.il\nYaniv Yifrach, yanivyssj@gmail.com\nYasmin Chen, jasmininu@gmail.com\nYoav Alony, yoav_alony@walla.com\nYoav Feuerstein, yoav85+fb@gmail.com\nYogev Susan, yogevsusan@gmail.com\nYohai Mory, moryyoch@yahoo.co.uk\nYonathan Charbit, yonathan5@msn.com\nYoni Bloch, hergelim.raim@gmail.com\nYoni Blondi, yoni076@gmail.com\nYosi Konigsberg, yoseph.konigsberg@gmail.com\nYoske Shamam, zappatta@gmail.com\nYossi Ganon, yossi.glory@gmail.com\nYossi Shwartz, yosi0679@gmail.com\nYuli Arbov, yuli001@bezeqint.net\nYura Eliseev, escaperoomil@gmail.com\nYuval Brener, yuval@carambo.la\nYuval Karpovski, yuval.karpovski32@gmail.com\nYuval Kaufman, yuval.ka@gmail.com\nYuval Kenigsbuch, yuvalken@gmail.com\nYuval Peled, uvpeled@gmail.com';
	function startQueue() {
		lastIndexChecked = -1;
		numChecking = 0;
		updateQueue();
	}

	function checkEmail(email) {
		var deferred = $q.defer();

		$http({
			method: 'GET', 
			url: '/api/check', 
			params: {
				email: email
			}
		}).then(function (res) {
			deferred.resolve({
				email: res.data.email,
				found: res.data.found
			});
		});

		// $http({
		// 	method: 'POST',
		// 	url: 'https://dutzi.cloudant.com/amdump/_find',
		// 	data: {
		// 		'selector': {
		// 			'_id': {
		// 				'$eq': email
		// 			}
		// 		}
		// 	}
		// }).then(function (res) {
		// 	deferred.resolve({
		// 		email: email,
		// 		found: res.data.docs.length > 0
		// 	});
		// });

		return deferred.promise;
	}

	function gotResult(res) {
		var email = res.email;
		for (var i = 0; i < $scope.contacts.length; i++) {
			if ($scope.contacts[i].email === email) {
				$scope.contacts[i].state = (res.found) ?
					STATE_IS_ONLIST :
					STATE_IS_OFFLIST;

				break;
			}
		}
		numChecking--;
		updateQueue();
	}

	function updateQueue() {
		while (numChecking < 5 && lastIndexChecked < $scope.contacts.length - 1) {
			lastIndexChecked++;
			numChecking++;
			$scope.contacts[lastIndexChecked].state = STATE_IS_CHECKING;
			checkEmail($scope.contacts[lastIndexChecked].email).then(gotResult);
		}
	}
});
