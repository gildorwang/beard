(function () {
    "use strict";
    
    function open(item) {
        var md = new Windows.UI.Popups.MessageDialog('Will open ' + item.title);
        md.commands.append(new Windows.UI.Popups.UICommand('OK'));
        md.commands.append(new Windows.UI.Popups.UICommand('Cancel'));
        md.showAsync().then(function(command) {
            if (command.label === 'OK') {
              WinJS.Navigation.navigate('/mindmaps/src/index.html', { key: item.key });
            }
        });
    }

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.subtitle;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .item-image").alt = item.subtitle;
            element.querySelector("article .item-image").addEventListener("mousedown", function() {
                open(item);
            });
            element.querySelector("article .item-content").innerHTML = item.content;
            element.querySelector(".content").focus();
        }
    });
})();
