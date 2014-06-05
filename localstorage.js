/**
* 让所有浏览器支持localstorage，不支持的用cookie代替（当然也受cookie限制）
* author: memoryza(jincai.wang@foxmail.com)
**/
;(function(w, doc) {
	var storage = null;
	if(typeof w.localStorage == 'object') {
		storage = w.localStorage;
	} else if(typeof w.globalStorage == 'object') {
		storage = w.globalStorage[location.host];
	} else {
		function cookieStorage() {
			if(!(this instanceof cookieStorage)) {
				return new cookieStorage();
			}
		}
		cookieStorage.prototype = {
			clear: function() {
				var key2Value = doc.cookie.split(';'),
					value = null,
					keys = [],
					kv= [],
					text = '';
				for(var i = 0, _len = key2Value.length; i < _len; i++) {
					value = key2Value[i];
					kv = value.split('=');
					if(kv.length == 2 && kv[1] !== '') {
						this.removeItem(decodeURIComponent(kv[0]).replace(/^\s+/, ''));
					}
				}
			},
			getItem: function(name) {
				var cookieName = encodeURIComponent(name) + '=';
					start = doc.cookie.indexOf(cookieName),
					value = undefined;
				if(start > -1) {
					var end = doc.cookie.indexOf(';', start);
					if(end == -1) {
						end = doc.cookie.length;
					}
					value = decodeURIComponent(doc.cookie.substring(start+cookieName.length, end));
				}
				this[name] = value;
				return value;
			},
			key: function(index) {
				var key2Value = doc.cookie.split(';'),
					value = null,
					keys = [],
					kv= [],
					key = undefined;
				for(var i = 0, _len = key2Value.length; i < _len; i++) {
					value = key2Value[i];
					kv = value.split('=');
					if(kv.length == 2 && kv[1] !== '') {
						keys.push(kv[0]);
					}
				}
				if(index < keys.length) {
					key = keys[index];
				}
				return key;
			},
			removeItem: function(name) {
				this.setItem(name, '');
			},
			setItem: function(name, value) {
				var text = encodeURIComponent(name) + '=' + encodeURIComponent(value);
				doc.cookie = text;
				value === '' && this[name] ? delete this[name] : (this[name] = value);				
			}
		}
		storage = new cookieStorage();
	}
	w.lStorage = storage;
})(window, document);
