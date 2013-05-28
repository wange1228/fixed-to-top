class FixedToTop
    win = window
    doc = document
    constructor: ->
        # 配置参数
        @config =
            id: ''
            top: 0
            left: 0
            
        # 全局变量
        @global =
            topEl: null
            isIE6: !!win.ActiveXObject && !win.XMLHttpRequest
            scrollTop: 0
            winHeight: 0
            
        return
    
    # 初始化
    init: (config) ->
        @config = config || @config
        @bind()
        return
    
    # 获取滚动条距离
    getScrollTop: ->
        @global.scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop
    
    # 获取窗口高度
    getWinHeight: ->
        @global.winHeight = win.innerHeight || doc.documentElement.offsetHeight || doc.body.offsetHeight
        
    # 事件绑定
    bind: ->
        self = this
        @addHandler win, 'load', ->
            self.getWinHeight()
            return
            
        @addHandler win, 'scroll', ->
            self.getScrollTop()
            # 如果超过第一屏
            if self.global.scrollTop > self.global.winHeight
                if self.global.topEl
                    self.global.topEl.style.display = 'block'
                else
                    a = doc.createElement 'a'
                    a.innerHTML = 'TOP'
                    a.id = self.config.id
                    a.href = 'javascript:;'
                    
                    doc.body.appendChild a
                    self.global.topEl = doc.getElementById self.config.id
                self.setStyle()
            # 如果在第一屏内
            else 
                self.global.topEl?.style.display = 'none'
            
            return
            
        @addHandler win, 'resize', ->
            self.getWinHeight()
            self.setStyle()
            
            return
            
        @addHandler doc, 'click', (ev) ->
            target = ev.srcElement || ev.target
            if target.id is self.config.id
                self.scrollToTop()
            return
        
        return
        
    # 事件监听
    addHandler: (element, type, handler) ->
        if element.addEventListener
            element.addEventListener type, handler, false
        else if element.attachEvent
            element.attachEvent 'on' + type, handler
        else 
            element['on' + type] = handler
        return
    
    # 设置样式
    setStyle: ->
        if !@global.isIE6
            top = @config.top + 'px'
            left = @config.left + 'px'
            position = 'fixed'
        else
            top = (@config.top + @global.scrollTop) + 'px'
            left = @config.left + 'px'
            position = 'absolute'
            
        style = {top, left, position}
        
        for attr of style
            @global.topEl.style[attr] = style[attr]
            
        return
    
    # 滚动到顶部
    scrollToTop: ->
        self = this
        interval = 15
        scrollAnimate = setInterval ->
            nextScrollTop = self.global.scrollTop - 30
            if nextScrollTop <= 0
                top = 0
                clearInterval scrollAnimate
            else 
                top = nextScrollTop
            win.pageYOffset = doc.documentElement.scrollTop = doc.body.scrollTop = top
        , interval
        return
