(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    generateSampleData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
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

    // Returns an array of sample data that can be added to the application's
    // data list. 
    function generateSampleData() {
        // These three strings encode placeholder images. You will want to set the
        // backgroundImage property in your real data to be URLs to images.
        var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
        var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
        var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";

        // Each of these sample groups must have a unique key to be displayed
        // separately.
        var sampleGroups = {
            create: { key: "create", title: "Create New", subtitle: null, backgroundImage: darkGray, description: "Here list all the templates you can use to create a mind map. <br />To view details, select one." },
            open: { key: "open", title: "Open Existing", subtitle: null, backgroundImage: lightGray, description: "Here list all your existing mind maps. <br />To view details, select one." }
        };

        // Each of these sample items should have a reference to a particular
        // group.
        var sampleItems = [
            { group: sampleGroups.create, title: "Blank", subtitle: "Create a blank mind map.", description: null, content: "Use this template to create a blank mind map.", backgroundImage: "/images/new.png" },
            { group: sampleGroups.open, title: "MindMap for Project A", subtitle: "Created 11/4/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' },
            { group: sampleGroups.open, title: "周六讲座", subtitle: "Created 11/1/2012", description: null, content: "Some preview content", backgroundImage: "/images/open.png", key: '001' }
        ];

        return sampleItems;
    }
})();
