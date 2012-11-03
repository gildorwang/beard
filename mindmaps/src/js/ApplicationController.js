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

    $('#drawing-area').css('background-image', 'url("img/grid.gif")')

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
    // $.post(baseUrl + '/upload',{name:doc.title,data:doc.serialize()},function(){
    //   alert('Success')
    // });
    if (true) {};
    var key = 'mindmap_' + doc.id + '@' + doc.title;
    localStorage.setItem(key, doc.serialize());
    window.location = '../../deck.js/introduction/beard.html?key=' + key;
    return;
  }

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
  function doOpenDocument() {
    $('#drawing-area').css('background-image', 'url("bg.JPG")')
    $.post(baseUrl+'/get', function(data){
      var doc = mindmaps.Document.fromJSON(data);

      mindmapModel.setDocument(doc);
    });

    // var data =  '{"id":"01109b63-a042-4836-af85-80fc2373a599","title":"BB 10 Rises","mindmap":{"root":{"id":"66454354-1b43-4af0-9bef-9f7b4014c567","parentId":null,"text":{"caption":"BB 10 Rises","font":{"style":"normal","weight":"bold","decoration":"none","size":26,"color":"#000000"}},"offset":{"x":0,"y":0},"foldChildren":false,"branchColor":"#000000","children":[{"id":"8c9f70eb-6eeb-40b5-8c54-4390cafd496f","parentId":"66454354-1b43-4af0-9bef-9f7b4014c567","text":{"caption":"BlackBerry Development","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-374.9833984375,"y":-91.5999755859375},"foldChildren":false,"branchColor":"#1e69fd","children":[{"id":"2c17fa37-ee5f-4002-b264-d54f8589ef0f","parentId":"8c9f70eb-6eeb-40b5-8c54-4390cafd496f","text":{"caption":"Tools","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-201.6832275390625,"y":-81.01666259765625},"foldChildren":false,"branchColor":"#1e69fd","children":[{"id":"953709c4-d56c-42e7-acac-501396fe21d8","parentId":"2c17fa37-ee5f-4002-b264-d54f8589ef0f","text":{"caption":"C => NDK","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-161.78338623046875,"y":-59},"foldChildren":false,"branchColor":"#1e69fd","children":[]},{"id":"75e5ebdc-cfae-4d87-a492-3b13b80683b2","parentId":"2c17fa37-ee5f-4002-b264-d54f8589ef0f","text":{"caption":"Adobe Air","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-193.51666259765625,"y":42},"foldChildren":false,"branchColor":"#1e69fd","children":[]},{"id":"b0815d24-0b65-41da-984e-b4cbdf027317","parentId":"2c17fa37-ee5f-4002-b264-d54f8589ef0f","text":{"caption":"QT","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-157.4833984375,"y":-8},"foldChildren":false,"branchColor":"#1e69fd","children":[]},{"id":"7bf840ef-bb9a-42eb-bbea-16faad733ad8","parentId":"2c17fa37-ee5f-4002-b264-d54f8589ef0f","text":{"caption":"Android","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-99.85003662109375,"y":90},"foldChildren":false,"branchColor":"#1e69fd","children":[]}]},{"id":"fb869ca2-4815-45ea-a919-4b867dca7fe4","parentId":"8c9f70eb-6eeb-40b5-8c54-4390cafd496f","text":{"caption":"Advantages","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-228.2999267578125,"y":103.98333740234375},"foldChildren":false,"branchColor":"#1e69fd","children":[{"id":"2ea6e15f-f8d5-4264-af7f-c6c32430786c","parentId":"fb869ca2-4815-45ea-a919-4b867dca7fe4","text":{"caption":"免认证费","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-123.11669921875,"y":-10},"foldChildren":false,"branchColor":"#1e69fd","children":[]},{"id":"2578c53a-29c4-4215-8ca6-f99fe0500227","parentId":"fb869ca2-4815-45ea-a919-4b867dca7fe4","text":{"caption":"蓝海新市场","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-156.6500244140625,"y":95},"foldChildren":false,"branchColor":"#1e69fd","children":[]},{"id":"8c899c12-2a12-42be-98f3-2ba1d5b769a6","parentId":"fb869ca2-4815-45ea-a919-4b867dca7fe4","text":{"caption":"客户关系紧密","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-158.38336181640625,"y":43},"foldChildren":false,"branchColor":"#1e69fd","children":[]}]}]},{"id":"39bfee63-ff9c-4e07-bbf6-61be3a823422","parentId":"66454354-1b43-4af0-9bef-9f7b4014c567","text":{"caption":"Team","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":214.42618625005707,"y":81.65223192190751},"foldChildren":false,"branchColor":"#0c2176","children":[{"id":"a509ffbd-3915-4301-9d4b-e6ef067c6855","parentId":"39bfee63-ff9c-4e07-bbf6-61be3a823422","text":{"caption":"Player1","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":161.7166748046875,"y":94},"foldChildren":false,"branchColor":"#0c2176","children":[{"id":"eb1f0846-3c62-4654-a3a6-09efced1b00e","parentId":"a509ffbd-3915-4301-9d4b-e6ef067c6855","text":{"caption":"黄冠_青山老妖","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":62.5833740234375,"y":-87},"foldChildren":false,"branchColor":"#0c2176","children":[]},{"id":"93bc7160-160d-4793-8f72-ff539c96724c","parentId":"a509ffbd-3915-4301-9d4b-e6ef067c6855","text":{"caption":"H5/Node/Agile","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":87.3333740234375,"y":-37},"foldChildren":false,"branchColor":"#0c2176","children":[]},{"id":"e229a5ff-f5ce-4319-8346-a004aee5e5f2","parentId":"a509ffbd-3915-4301-9d4b-e6ef067c6855","text":{"caption":"创业者/顾问","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":115.2166748046875,"y":15},"foldChildren":true,"branchColor":"#0c2176","children":[]}]},{"id":"c72774eb-6689-4e56-8b0d-4886e66c524e","parentId":"39bfee63-ff9c-4e07-bbf6-61be3a823422","text":{"caption":"Player2","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":139.2166748046875,"y":-139},"foldChildren":false,"branchColor":"#0c2176","children":[{"id":"581541e2-cde4-4b17-87d2-c1c95ef1638b","parentId":"c72774eb-6689-4e56-8b0d-4886e66c524e","text":{"caption":"滕腾　Tenx","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":62.75,"y":-79},"foldChildren":false,"branchColor":"#0c2176","children":[]},{"id":"8a107a0c-cf7a-4540-98d8-e1387e9de18f","parentId":"c72774eb-6689-4e56-8b0d-4886e66c524e","text":{"caption":"H5/UI","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":103.550048828125,"y":-19},"foldChildren":false,"branchColor":"#0c2176","children":[]},{"id":"9f66c126-7087-4a22-a966-d2e28d1222f2","parentId":"c72774eb-6689-4e56-8b0d-4886e66c524e","text":{"caption":"产品经理","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":131.800048828125,"y":43},"foldChildren":false,"branchColor":"#0c2176","children":[]}]}]},{"id":"a709c563-0cd1-4b10-9e87-4886e2db04fb","parentId":"66454354-1b43-4af0-9bef-9f7b4014c567","text":{"caption":"App","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-168.0833740234375,"y":306.61669921875},"foldChildren":false,"branchColor":"#1f2a27","children":[{"id":"cb96b7bf-0b73-4e58-a2d4-ed0fa3e0e401","parentId":"a709c563-0cd1-4b10-9e87-4886e2db04fb","text":{"caption":"MindeShow","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-158.03471721010283,"y":2},"foldChildren":false,"branchColor":"#1f2a27","children":[{"id":"d6947d62-5302-4933-820d-37d595d33275","parentId":"cb96b7bf-0b73-4e58-a2d4-ed0fa3e0e401","text":{"caption":"想你所想","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-139.316650390625,"y":5},"foldChildren":false,"branchColor":"#1f2a27","children":[]},{"id":"f822ac89-b9be-4665-b861-291c0bf5c8bd","parentId":"cb96b7bf-0b73-4e58-a2d4-ed0fa3e0e401","text":{"caption":"说你所说","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-147.13330078125,"y":-54},"foldChildren":false,"branchColor":"#1f2a27","children":[]}]},{"id":"9c7fdc82-effa-41b3-98a3-b0f346260bec","parentId":"a709c563-0cd1-4b10-9e87-4886e2db04fb","text":{"caption":"问题","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-155.0333251953125,"y":138},"foldChildren":false,"branchColor":"#1f2a27","children":[{"id":"83caf2d3-b051-4e6d-8f40-df647b6c2e22","parentId":"9c7fdc82-effa-41b3-98a3-b0f346260bec","text":{"caption":"BB市场空缺","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-172.64996337890625,"y":-31},"foldChildren":false,"branchColor":"#1f2a27","children":[]},{"id":"115ee045-ed44-4226-9baa-6a87bc509d37","parentId":"9c7fdc82-effa-41b3-98a3-b0f346260bec","text":{"caption":"MindMap展示","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":-212.9832763671875,"y":36},"foldChildren":false,"branchColor":"#1f2a27","children":[]}]},{"id":"1a19fa06-ef9c-4498-8db0-9b2dccfff0ac","parentId":"a709c563-0cd1-4b10-9e87-4886e2db04fb","text":{"caption":"解决","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":110.5333251953125,"y":16},"foldChildren":false,"branchColor":"#1f2a27","children":[{"id":"0447fddc-e1b8-4b86-a787-96d9481faa56","parentId":"1a19fa06-ef9c-4498-8db0-9b2dccfff0ac","text":{"caption":"html5 三屏合一","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":75.7166748046875,"y":-25},"foldChildren":false,"branchColor":"#1f2a27","children":[]},{"id":"24f7885f-e23b-429f-b0ad-af7742e9bc7d","parentId":"1a19fa06-ef9c-4498-8db0-9b2dccfff0ac","text":{"caption":"Any Device","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":112.0833740234375,"y":15},"foldChildren":false,"branchColor":"#1f2a27","children":[]},{"id":"0acbf7c3-7b36-44ef-8425-28661faef7d9","parentId":"1a19fa06-ef9c-4498-8db0-9b2dccfff0ac","text":{"caption":"Flow Slide Experence","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":25.25,"y":-92},"foldChildren":false,"branchColor":"#1f2a27","children":[]},{"id":"98d2a5b4-aa49-43c5-a233-255a31c5afc2","parentId":"1a19fa06-ef9c-4498-8db0-9b2dccfff0ac","text":{"caption":"Mobile Friendly","font":{"style":"normal","weight":"normal","decoration":"none","size":22,"color":"#000000"}},"offset":{"x":87.7332763671875,"y":67},"foldChildren":false,"branchColor":"#1f2a27","children":[]}]}]}]}},"dates":{"created":1350735810857,"modified":1350737857962},"dimensions":{"x":3000,"y":2000},"autosave":false}';
    // var doc = mindmaps.Document.fromJSON(data);

    // mindmapModel.setDocument(doc);

    var presenter = new mindmaps.OpenDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.OpenDocumentView(), filePicker);
    presenter.go();
  }

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

    doOpenDocument();
    // doNewDocument();
  };

  this.init();

  

  function slideFunction(){
    $('#toolbar,#statusbar').hide();
    // setTimeout(function(){
    //   $('#drawing-area').width(3000);
    //   $('#drawing-area').height(2000); 
    // },300)
    $('#new-btn').click(function(){
      doNewDocument();
    });

    $('#delete-btn').click(function(){
      mindmapModel.deleteNode();
    });
    $('#save-btn').click(function(){
      doSaveDocument();
    });
    $('#open-btn').click(function(){
      doOpenDocument();
    });
    $('#show-btn').click(function(){
      if(onSlideShow){
        $('#show-btn').html('演示模式');
        $('#drawing-area').unbind('click',SlideChnage)
          .unbind('mousedown',StopDefault)
          .unbind('mouseup',StopDefault)
          .unbind('mousemove',StopDefault)
        onSlideShow =false;
      }
      else{
        hideAll();
        $('#show-btn').html('编辑模式');
        $('#drawing-area')
          .bind('click',SlideChnage)
          .bind('mousedown',StopDefault)
          .bind('mouseup',StopDefault)
          .bind('mousemove',StopDefault)


        center();
        onSlideShow = true;
      }
    });


    $('#demo-btn').click(function(){

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
      var original=new Array;//原始数组 
      //给原始数组original赋值 
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
