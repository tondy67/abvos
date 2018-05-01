/**
 * https://tondy67.github.io/app.js
 */
const $sel = (t) => { return document.querySelector(t); }
const $all = (t) => { return document.querySelectorAll(t); }
const $mk = (t) => { return document.createElement(t); }
const $add = (t) => { document.body.appendChild(t); };
const $ins = (t,c) => { document.body.insertBefore(t,c); };
const modal = () => {
	const img = $sel('#logo');
	if (!img) return;
	let el = $sel('#modal');
	if (!el){
		el = $mk('div');
		el.id = 'modal';
		el.innerHTML = `<span id="closebox">&#215;</span>
  <img class="modal-content" id="img1" />
  <div id="caption"></div>`;
		$add(el);
	};
	const img1 = $sel('#img1');
	const title = $sel('#caption');
	img.onclick = () => {
		el.style.display = 'block';
		img1.src = img.src;
		title.innerHTML = img.alt;
	};
	const b = $sel("#closebox");
	if (b) b.onclick = () => { el.style.display = 'none'; }
};
const openNav = () => { 
	const el = $sel('#sidenav');
	if (el) el.style.width = "300px"; 
};
const closeNav = ()=> { 
	const el = $sel('#sidenav');
	if (el) el.style.width = "0"; 
};
const openIFrame = (id) => {
	const el = $sel('#'+id);
	if (!el) return;
	const all = $all('iframe');
	for (let it of all) it.style.visibility = "hidden";
	el.style.visibility = "visible"; 
	closeNav();
};
const init = () => {
	let el = $sel('#header');
	if (el){
		el.innerHTML = `<a href="javascript:void(0)" id="opennav"><i class="fas fa-bars"></i></a><a href="/"></a>`;
		el = $sel('#sidenav');
		if (!el){
			el = $mk('div');
			el.id = 'sidenav';
			el.innerHTML = `<a href="javascript:void(0)" id="closenav">&#215;</a>
  <a href="javascript:void(0)" onclick="openIFrame(\'abvos\')">Home</a>
  <a href="javascript:void(0)" onclick="openIFrame(\'abvos\')">Abvos</a>
  <a href="javascript:void(0)" onclick="openIFrame(\'clock\')">Clock</a>
  <a href="javascript:void(0)" onclick="openIFrame(\'about\')">About</a>`;
			$add(el);
		}
		el = $sel('#closenav');
		if (el) el.onclick = ()=>closeNav();
		el = $sel('#main');
		if (el) el.onclick = ()=>closeNav();
		el = $sel('#opennav');
		if (el) el.onclick = ()=>openNav();
	}
	const f = $sel('#footer');
	if (!f) return;
	el = $sel('#tools');
	if (!el){
		el = $mk('div');
		el.id = 'tools';
		el.className = 'clearfix';
		$ins(el,f);
	}
	const url = window.location.href;
	const ttl = document.title;
	el.innerHTML = fb(url,ttl) + tw(url,'tondy67',ttl) + gplus(url);
};

const fb = (url, title='') => {
	return `<a href="https://www.facebook.com/sharer/sharer.php?u=`+encodeURI(url)+`&t=`+encodeURI(title)+`"
 onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" 
 target="_blank" title="Share on Facebook"><i class="fab fa-facebook"></i></a>`;
};
const tw = (url, user='', text='') => {
	return `<a href="https://twitter.com/share?url=`+encodeURI(url)+`&via=`+encodeURI(user)+`&text=`+encodeURI(text)+`" 
 onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
 target="_blank" title="Share on Twitter"><i class="fab fa-twitter"></i></a>`;
}
const gplus = (url) => {
	return `<a href="https://plus.google.com/share?url=`+encodeURI(url)+`"
 onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480');return false;"
 target="_blank" title="Share on Google+"><i class="fab fa-google-plus"></i></a>`;
}

window.onload = () => {
	init();
	modal();
	openIFrame('abvos');
};
