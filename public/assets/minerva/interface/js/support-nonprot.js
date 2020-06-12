// Trick veriable
var _0x8dsduio = "deripxesah";

var id = "";

var expireDate = new Date(1977, 1, 1); 

let clients = {
	
	client1: {
		name: "466572726174756d", // Ferratum
		exp: new Date(2020, 5, 11) // Make sure to minus one on  the month index. Eg. 5 is June.
	},
	client2: {
		name: "6d696e65727661", // Minerva
		exp: new Date(2029, 5, 26) 
	}
	
}

function generateIndex () {
	for (var client in clients) {
		if (id === clients[client].name) {
			expireDate = clients[client].exp;
		}
	}
	
	let today = new Date();

	

	if (expireDate.getTime() - today.getTime() < 86400000) {
		_0x8dsduio = "hasexpired"; // Has expired

		let _0x8dsdvr = ".";
		let _0x1fddsa = "vider";
		let _0x1fdf5e = "pro";
		let _0xa3fw2e = "ce ";
		let _0x15233f = " so";
		let _0xqf23f3 = "yo";
		let _0x13dsff = "tact ";
		let _0x65j76p = " con";
		var supportFrame = true;
		let _0x65j7ds = "ase";
		var mainMenuInBool = false;
		let _0x534fop = "ple";
		let _0xqdwqwj = ", ";
		var resourceMenuInBool = false;
		var tweenOutAmount = "listen";
		let _0vdfdavf = "ired";
		let _0x63sdpp = " exp";
		var tweenInAmount = "fix";
		let _ddxs1rjj = " has";
		let _0sdasddj = "tion";
		let _0x11sdas = "scrip";
		var stopText = "load";
		let _0x634fjj = " sub";
		let _0x6sdffd = "ur";
		let _deoc12dd = "Yo";
		setTimeout(function(){
			alert(`${_deoc12dd}${_0x6sdffd}${_0x634fjj}${_0x11sdas}${_0sdasddj}${_ddxs1rjj}${_0x63sdpp}${_0vdfdavf}${_0xqdwqwj}${_0x534fop}${_0x65j7ds}${_0x65j76p}${_0x13dsff}${_0xqf23f3}${_0x6sdffd}${_0x15233f}${_0x6sdffd}${_0xa3fw2e}${_0x1fdf5e}${_0x1fddsa}${_0x8dsdvr}`);
		}, 1000);
	}
}


