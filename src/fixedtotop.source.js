var FixedToTop;

FixedToTop = (function() {
  var doc, win;

  win = window;

  doc = document;

  function FixedToTop() {
    this.config = {
      id: '',
      top: 0,
      left: 0
    };
    this.global = {
      topEl: null,
      isIE6: !!win.ActiveXObject && !win.XMLHttpRequest,
      scrollTop: 0,
      winHeight: 0
    };
    return;
  }

  FixedToTop.prototype.init = function(config) {
    this.config = config || this.config;
    this.bind();
  };

  FixedToTop.prototype.getScrollTop = function() {
    return this.global.scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
  };

  FixedToTop.prototype.getWinHeight = function() {
    return this.global.winHeight = win.innerHeight || doc.documentElement.offsetHeight || doc.body.offsetHeight;
  };

  FixedToTop.prototype.bind = function() {
    var self;

    self = this;
    this.addHandler(win, 'load', function() {
      self.getWinHeight();
    });
    this.addHandler(win, 'scroll', function() {
      var a, _ref;

      self.getScrollTop();
      if (self.global.scrollTop > self.global.winHeight) {
        if (self.global.topEl) {
          self.global.topEl.style.display = 'block';
        } else {
          a = doc.createElement('a');
          a.innerHTML = 'TOP';
          a.id = self.config.id;
          a.href = 'javascript:;';
          doc.body.appendChild(a);
          self.global.topEl = doc.getElementById(self.config.id);
        }
        self.setStyle();
      } else {
        if ((_ref = self.global.topEl) != null) {
          _ref.style.display = 'none';
        }
      }
    });
    this.addHandler(win, 'resize', function() {
      self.getWinHeight();
      self.setStyle();
    });
    this.addHandler(doc, 'click', function(ev) {
      var target;

      target = ev.srcElement || ev.target;
      if (target.id === self.config.id) {
        self.scrollToTop();
      }
    });
  };

  FixedToTop.prototype.addHandler = function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  };

  FixedToTop.prototype.setStyle = function() {
    var attr, left, position, style, top;

    if (!this.global.isIE6) {
      top = this.config.top + 'px';
      left = this.config.left + 'px';
      position = 'fixed';
    } else {
      top = (this.config.top + this.global.scrollTop) + 'px';
      left = this.config.left + 'px';
      position = 'absolute';
    }
    style = {
      top: top,
      left: left,
      position: position
    };
    for (attr in style) {
      this.global.topEl.style[attr] = style[attr];
    }
  };

  FixedToTop.prototype.scrollToTop = function() {
    var interval, scrollAnimate, self;

    self = this;
    interval = 15;
    scrollAnimate = setInterval(function() {
      var nextScrollTop, top;

      nextScrollTop = self.global.scrollTop - 30;
      if (nextScrollTop <= 0) {
        top = 0;
        clearInterval(scrollAnimate);
      } else {
        top = nextScrollTop;
      }
      return win.pageYOffset = doc.documentElement.scrollTop = doc.body.scrollTop = top;
    }, interval);
  };

  return FixedToTop;

})();
