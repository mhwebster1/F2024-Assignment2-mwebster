var len;
var results = '';

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "9deb1df717ab41a9860cc81ea5398696");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }

            $('#searchResults').html(results);
            $('#searchResults').css("visibility", "visible");
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert("error");
        });
}


$(document).ready(function () {
    $("#search").click(function () {
        apiSearch();
    })
})

$(document).ready(function () {
    var background1 = "url('https://images.unsplash.com/photo-1724942462164-7c30f103d91c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    var background2 = "url('https://images.unsplash.com/photo-1465429103920-30e481ab35b4?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"

    var currBackground = background1;
    $("#heading").click(function () {

        if (currBackground === background1) {
            $("body").css("background-image", background2);
            currBackground = background2;
        } else {
            $("body").css("background-image", background1);
            currBackground = background1;
        }
        $("body").css("background-size", "cover");
    });
});

$(document).ready(function () {
    function getCurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ":" + minutes;
    }

    $("#currTime").click(function () {
        var currentTime = getCurrentTime();
        $('#time').html("Current Time: " + currentTime);
        $('#time').css('visibility', 'visible');
        $('#time').dialog({
            title: "Current Time",
            modal: true,
            width: 300,
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#lucky").click(function () {
        luckySearch();
    });

    function luckySearch() {
        var params = {
            "q": $("#query").val(),
            "count": "50",
            "offset": "0",
            "mkt": "en-us"
        };

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "9deb1df717ab41a9860cc81ea5398696");
            },
            type: "GET",
        })
            .done(function (data) {
                if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                    var firstResult = data.webPages.value[0].url;

                    window.location.href = firstResult;
                } else {
                    alert("No results found for this query.");
                }
            })
    }
});