/**
 * Creates a new Application Controller.
 * 
 * @constructor
 */
mindmaps.ApplicationController = function() {
  var eventBus = new mindmaps.EventBus();
  var shortcutController = new mindmaps.ShortcutController();
  var commandRegistry = new mindmaps.CommandRegistry(shortcutController);
  var undoController = new mindmaps.UndoController(eventBus, commandRegistry);
  var mindmapModel = new mindmaps.MindMapModel(eventBus, commandRegistry, undoController);
  var clipboardController = new mindmaps.ClipboardController(eventBus, commandRegistry, mindmapModel);
  // var helpController = new mindmaps.HelpController(eventBus, commandRegistry);
  var printController = new mindmaps.PrintController(eventBus, commandRegistry, mindmapModel);
  var autosaveController = new mindmaps.AutoSaveController(eventBus, mindmapModel);
  // var filePicker = new mindmaps.FilePicker(eventBus, mindmapModel);

  /**
   * Handles the new document command.
   */
  function doNewDocument() {
    // close old document first
    var doc = mindmapModel.getDocument();
    doCloseDocument();

    $('#drawing-area').css('background-image', 'url("img/grid.gif")');

    var presenter = new mindmaps.NewDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.NewDocumentView());
    presenter.go();
  }

  /**
   * Handles the save document command.
   */
  function doSaveDocument() {
    var doc = mindmapModel.getDocument();
    doc.prepareSave();

    if (doc.title !== 'Central Idea')
    {
      var key = 'mindmap_' + doc.id + '@' + doc.title;
      localStorage.setItem(key, doc.serialize());
    }
    return;
  }

  this.save = doSaveDocument;

  /**
   * Handles the close document command.
   */
  function doCloseDocument() {
    var doc = mindmapModel.getDocument();
    if (doc) {
      // TODO for now simply publish events, should be intercepted by
      // someone
      mindmapModel.setDocument(null);
    }
  }
  // var baseUrl = 'http://192.168.1.124:9000';
  var baseUrl = 'http://127.0.0.1:9000';
  /**
   * Handles the open document command.
   */
  function doOpenDocument(data) {
    var doc = mindmaps.Document.fromJSON(data);
    setDocument(doc);
  }

  function doOpenDocumentFromObject(obj) {
    var doc = mindmaps.Document.fromObject(obj);
    setDocument(doc);
  }

  function setDocument(doc) {
    mindmapModel.setDocument(doc);

    var presenter = new mindmaps.OpenDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.OpenDocumentView(), null);
    presenter.go();
  }

  this.open = doOpenDocumentFromObject;

  function doExportDocument() {
    var presenter = new mindmaps.ExportMapPresenter(eventBus,
        mindmapModel, new mindmaps.ExportMapView());
    presenter.go();
  }

  /**
   * Initializes the controller, registers for all commands and subscribes to
   * event bus.
   */
  this.init = function() {
    var newDocumentCommand = commandRegistry
        .get(mindmaps.NewDocumentCommand);
    newDocumentCommand.setHandler(doNewDocument);
    newDocumentCommand.setEnabled(true);

    var openDocumentCommand = commandRegistry
        .get(mindmaps.OpenDocumentCommand);
    openDocumentCommand.setHandler(doOpenDocument);
    openDocumentCommand.setEnabled(true);

    var saveDocumentCommand = commandRegistry
        .get(mindmaps.SaveDocumentCommand);
    saveDocumentCommand.setHandler(doSaveDocument);

    var closeDocumentCommand = commandRegistry
        .get(mindmaps.CloseDocumentCommand);
    closeDocumentCommand.setHandler(doCloseDocument);

    var exportCommand = commandRegistry.get(mindmaps.ExportCommand);
    exportCommand.setHandler(doExportDocument);

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
      saveDocumentCommand.setEnabled(false);
      closeDocumentCommand.setEnabled(false);
      exportCommand.setEnabled(false);
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
      saveDocumentCommand.setEnabled(true);
      closeDocumentCommand.setEnabled(true);
      exportCommand.setEnabled(true);
    });
  };

  /**
   * Launches the main view controller.
   */
  this.go = function() {
    var viewController = new mindmaps.MainViewController(eventBus,
        mindmapModel, commandRegistry);
    viewController.go();

    // doOpenDocument();
    doNewDocument();
  };

  this.init();

  

  function slideFunction(){
    function getParameterByName(name)
    {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if(results == null)
        return "";
      else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $('#toolbar,#statusbar').hide();

    var key = getParameterByName('key');
    if(key)
    {
      var data = localStorage.getItem(getParameterByName('key'));  
      setTimeout(function(){
        doOpenDocument(data);
      }, 50);
    }
    
    $('#add-btn').click(function(){
      mindmapModel.createNode();
    });

    $('#delete-btn').click(function(){
      mindmapModel.deleteNode();
    });
    $('#save-btn').click(function(){
      doSaveDocument();
    });
    
    $('#list-btn').click(function(){
        WinJS.Navigation.navigate('/pages/groupedItems/groupedItems.html');
//      window.location = '../../bootmetro/list.html';      
    });

    $('#slide-btn').click(function(){
      var doc = mindmapModel.getDocument();
      var key = 'mindmap_' + doc.id + '@' + doc.title;
      localStorage.setItem(key, doc.serialize());
      WinJS.Navigation.navigate('../../deck.js/introduction/beard.html?key=' + key);
//      window.location = '../../deck.js/introduction/beard.html?key=' + key;
    });

    function SlideChnage(e){
      var c = $('#canvas-container');
      var width = c.width();
      if(e.clientX < width/2) showPrev();
      else showNext();
    }
    function getFirstNode(object){
      var keys = Object.keys(object);
      if(keys.length == 0) return null;
      else return object[keys[0]];
    }
    function getNextNode(object, node){
      var keys = Object.keys(object);
      for(var i = 0;i<keys.length;i++){
        if(keys[i] == node.id) break;
      }
      if(i == keys.length - 1) return null;
      else return object[keys[i+1]];
    }

    function getPrevNode(object, node){
      var keys = Object.keys(object);
      for(var i = 0;i<keys.length;i++){
        if(keys[i] == node.id) break;
      }
      if(i == 0) return null;
      else return object[keys[i-1]];
    }

    function findNextNode(node, subNode){
      if(!node) return null;
      if(node.getDepth() == 2) return findNextNode(node.parent, node);      
      if(subNode){
        var _node = getNextNode(node.children.nodes,subNode);
        if(_node) return _node;
        else return findNextNode(node.parent, node);
      }
      else{
        var _node = getFirstNode(node.children.nodes);
        if(_node) return _node;
        else return findNextNode(node.parent, node);
      }
    }

    function findPrevNode(node){
      var _node = getPrevNode(node.parent.children.nodes,node);
      if(_node) return _node;
      else return node.parent;
    }

    function getOffset(node){
      if(node.parent){
        return {x:node.offset.x+node.parent.offset.x,y:node.offset.y+node.parent.offset.y}
      }
      else return {x:0,y:0};
    }

    function showPrev(){
      if(!currentNode){
        currentNode = mindmapModel.getDocument().mindmap.root;
      }
      var animationName;
      var target = findPrevNode(currentNode);
      if(!target) return;

      if(target == currentNode.parent || target.parent == currentNode.parent){
        animationName = backAnimation(getOffset(currentNode), getOffset(target)); 
      }
      else{
        animationName = backAnimation(getOffset(currentNode), getOffset(target)); 
      }
      if(currentNode.getDepth() ==2){
        closeNode(currentNode);
      }

      if(target.getDepth() ==2){
        openNode(target);
      }
      $getNodeCaption(currentNode).removeClass('highlight');
      $getNodeCaption(target).addClass('highlight');
      
      currentNode = target;
      $('#drawing-area')[0].style['-webkit-animation'] = animationName +' 1.1s ease-in-out forwards';
    }

    function showNext(){
      if(!currentNode){
        currentNode = mindmapModel.getDocument().mindmap.root;
      }
      var animationName;
      var target = findNextNode(currentNode);
      if(!target) target = mindmapModel.getDocument().mindmap.root;
      console.log(target);
      console.log(target.getDepth());
      
      if(target.parent == currentNode || target.parent == currentNode.parent){
        animationName = GenerateSimpleAnimation(getOffset(currentNode), getOffset(target)); 
      }
      else{
        animationName = GenerateAnimation(getOffset(currentNode), getOffset(target)); 
      }

      if(currentNode.getDepth() ==2){
        closeNode(currentNode);
      }

      if(target.getDepth() ==2){
        openNode(target);
      }

      $getNodeCaption(currentNode).removeClass('highlight');
      $getNodeCaption(target).addClass('highlight');
      
      currentNode = target;
      $('#drawing-area')[0].style['-webkit-animation'] = animationName + ' 1.1s ease-in-out forwards';
    }

    function hideAll(){
      var mindmap = mindmapModel.getDocument().mindmap;
      for(var index in mindmap.nodes.nodes)
      {
        var node = mindmap.nodes.nodes[index];
        if(node.getDepth() == 2)
          closeNode(node);
      }
    }

    function StopDefault(e){
      e.stopPropagation();
    }

    function center(){
      var c = $('#canvas-container');
      var area = $('#drawing-area');

      var w = area.width() - c.width();
      var h = area.height() - c.height();
      c.scrollLeft(w/2).scrollTop(h/2);
    }

    function backAnimation(origin,target){
      return GenerateAnimation(origin,target,'15');
    }
    function GenerateAnimation(origin, target, arc){
      var arc =  (arc || '15') +'deg'; 
      var name = 'random' + randomArray.pop();
      var keyframes = '@-webkit-keyframes '+ name +' { '+
                        '0% {-webkit-transform: translate3d('+ -origin.x+'px,'+ -origin.y+'px,0) scale(1)}'+
                        '50% {-webkit-transform: translate3d(0, 0, 0) scale(0.8)  rotate3d(0,0,1,'+ arc +')}'+
                        '100% {-webkit-transform: translate3d('+ -target.x+'px,'+ -target.y+'px,0) scale(1)}'+
                      '}';
     
      if( document.styleSheets && document.styleSheets.length ) {
          document.styleSheets[0].insertRule( keyframes, 0 );
      } else {
        var s = document.createElement( 'style' );
        s.innerHTML = keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
      }
      return name;
    }  

    function GenerateSimpleAnimation(origin, target){
      var name = 'random' + randomArray.pop();
      var keyframes = '@-webkit-keyframes '+ name +' { '+
                        '0% {-webkit-transform: translate3d('+ -origin.x+'px,'+ -origin.y+'px,0) scale(1)}'+
                        '50% {-webkit-transform: translate3d('+ (-origin.x-target.x)/2 +'px,'+ (-origin.y-target.y)/2+'px,0) scale(0.8)  rotate3d(0,0,1,-15deg)}'+
                        '100% {-webkit-transform: translate3d('+ -target.x+'px,'+ -target.y+'px,0) scale(1)}'+
                      '}';

      if( document.styleSheets && document.styleSheets.length ) {
        console.log(keyframes)
          document.styleSheets[0].insertRule( keyframes, 0 );
      } else {
        var s = document.createElement( 'style' );
        s.innerHTML = keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
      }
      return name;
    }  
    function RandomArray(count){
      var original=new Array;//鍘熷鏁扮粍 
      //缁欏師濮嬫暟缁刼riginal璧嬪€?
      for (var i=0;i<count;i++){ 
       original[i]=i+1; 
      } 
      original.sort(function(){ return 0.5 - Math.random(); }); 
      return original;
    }

    function $getNodeCanvas(node) {
      return $("#node-canvas-" + node.id);
    }

    function $getNode(node) {
      return $("#node-" + node.id);
    }

    function $getNodeCaption(node) {
      return $("#node-caption-" + node.id);
    }

    function closeNode(node) {
      var $node = $getNode(node);
      $node.children(".node-container").hide();

      var $foldButton = $node.children(".button-fold").first();
      $foldButton.removeClass("open").addClass("closed");
    };

    function openNode(node) {
      var $node = $getNode(node);
      $node.children(".node-container").show();

      var $foldButton = $node.children(".button-fold").first();
      $foldButton.removeClass("closed").addClass("open");
    };

    var canvasContainer = document.getElementById('canvas-container');
    var randomArray = RandomArray(300);
    
    var currentNode;
    var onSlideShow = false;
  }
  
  slideFunction();
};
