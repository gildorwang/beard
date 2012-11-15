(function () {
  "use strict";

  var list = new WinJS.Binding.List();
  var groupedItems = list.createGrouped(
      function groupKeySelector(item) { return item.group.key; },
      function groupDataSelector(item) { return item.group; }
  );


  WinJS.Namespace.define("Data", {
    refresh: getSavedItems,
    items: groupedItems,
    groups: groupedItems.groups,
    getItemReference: getItemReference,
    getItemsFromGroup: getItemsFromGroup,
    resolveGroupReference: resolveGroupReference,
    resolveItemReference: resolveItemReference
  });

  // Get a reference for an item, using the group key and item title as a
  // unique reference to the item that can be easily serialized.
  function getItemReference(item) {
    return [item.group.key, item.title];
  }

  // This function returns a WinJS.Binding.List containing only the items
  // that belong to the provided group.
  function getItemsFromGroup(group) {
    return list.createFiltered(function (item) { return item.group.key === group.key; });
  }

  // Get the unique group corresponding to the provided group key.
  function resolveGroupReference(key) {
    for (var i = 0; i < groupedItems.groups.length; i++) {
      if (groupedItems.groups.getAt(i).key === key) {
        return groupedItems.groups.getAt(i);
      }
    }
  }

  // Get a unique item from the provided string array, which should contain a
  // group key and an item title.
  function resolveItemReference(reference) {
    for (var i = 0; i < groupedItems.length; i++) {
      var item = groupedItems.getAt(i);
      if (item.group.key === reference[0] && item.title === reference[1]) {
        return item;
      }
    }
  }

  function getSavedItems() {
    var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
    var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
    var groups = {
      create: { key: "create", title: "Create New", subtitle: null, backgroundImage: darkGray, description: "Here list all the templates you can use to create a mind map. <br />To view details, select one." },
      open: { key: "open", title: "Open Existing", subtitle: null, backgroundImage: lightGray, description: "Here list all your existing mind maps. <br />To view details, select one." }
    };
    var createItem = { group: groups.create, title: "Blank", subtitle: "Create a blank mind map.", description: null, content: "Use this template to create a blank mind map.", backgroundImage: "/images/new.png" };

    while (list.length > 0) {
      list.pop();
    }
    list.push(createItem);
    for (var i in localStorage) {
      if (i.indexOf('mindmap') >= 0) {
        var map = JSON.parse(localStorage[i]);
        if (map.title !== 'Central Idea') {
          list.push({
            id: i.id,
            key: 'mindmap_' + map.id + '@' + map.title,
            title: map.title,
            content: map.title,
            created: new Date(map.dates.created),
            description: null,
            group: groups.open
          });
        }
      }
    }
  }
})();
