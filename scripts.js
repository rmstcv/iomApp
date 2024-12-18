    class Rectangle {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        }
    }
    
    
    function makeVisible( obj )
    {
        obj.style.visibility = "visible";
    }
    
    function makeInvisible( obj )
    {
        obj.style.visibility = "hidden";
    }
    
    function getVisibleArea( r )
    {
        var o3_frame = window;

        r.width = o3_frame.document.body.clientWidth;
        if (!r.width) r.width = o3_frame.innerWidth; 
        if (!r.width) r.width = o3_frame.outerWidth;
    
        r.height = o3_frame.document.body.clientHeight;
        if (!r.height) r.height = o3_frame.innerHeight;
        if (!r.height) r.height = o3_frame.outerHeight;
    }
    
    function getRealLeft(el) {
        xPos = el.offsetLeft;
        tempEl = el.offsetParent;
        while (tempEl != null) {
            xPos += tempEl.offsetLeft;
            tempEl = tempEl.offsetParent;
        }
        return xPos;
    }
    
    function getRealTop(el) {
        yPos = el.offsetTop;
        tempEl = el.offsetParent;
        while (tempEl != null) {
            yPos += tempEl.offsetTop;
            tempEl = tempEl.offsetParent;
        }
        return yPos;
    }
    
    function getElementSize( obj, r )
    {
        if ( typeof obj.offsetLeft != 'undefined' ) {
            r.left = getRealLeft( obj );
            r.top = getRealTop( obj );
            r.width = obj.offsetWidth;
            r.height = obj.offsetHeight;
        }
        else {
            alert( "Got no idea how to figure out the element size." );
        }
    }
    
    function setElementPos( obj, r )
    {
        obj.style.left = r.left + "px";
        obj.style.top = r.top + "px";
        obj.style.width = r.width + "px";
        obj.style.height = r.height + "px";
    }
    
    var verticalPad = 5;
    var divObj = null;
    
    
    function getElt( o )
    {
        return document.getElementById( o );
    }
    
    function popup( forWhat, html )
    {
        if ( document.body.insertAdjacentHTML ) {
            document.body.insertAdjacentHTML( 'AfterBegin', '<DIV ID=popup CLASS=popup>xyz</DIV>' );
            divObj = getElt( "popup" );
        }
        else {
            divObj = document.createElement( "DIV" );
            divObj.className = "popup";
            document.body.appendChild( divObj );
        }
    
        divObj.innerHTML = html.replace(/\|q/g, "'").replace(/\|d/g, '"').replace(/\|n/g, '\n').replace(/\|\|/g, "|");
    
        var forWhatRect = new Rectangle;
        getElementSize( forWhat, forWhatRect );
        var popupRect = new Rectangle;
        getElementSize( divObj, popupRect );
        var screenSize = new Rectangle;
        getVisibleArea( screenSize );
    
        var idealLeft = forWhatRect.left - ( popupRect.width - forWhatRect.width ) / 2;
        if ( idealLeft < screenSize.left )
          idealLeft = screenSize.left;
        else if ( idealLeft + popupRect.width > screenSize.left + screenSize.width )
          idealLeft = screenSize.left + screenSize.width - popupRect.width;
    
        var idealTop = forWhatRect.top - popupRect.height - verticalPad;
        if ( idealTop < screenSize.top )
          idealTop = forWhatRect.top + forWhatRect.height + verticalPad;
    
    
        popupRect.left = idealLeft;
        popupRect.top = idealTop;
    
        setElementPos( divObj, popupRect );
    }
    
    function clearpopup()
    {

        if ( divObj != null ) {
            makeInvisible( divObj );
    
            var screenSize = new Rectangle;
            getVisibleArea( screenSize );
            divObj = null;
        }

        let elem = document.getElementById('popup');
        elem.remove()
    }
    