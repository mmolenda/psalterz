
var data;

function populateTable(psalmNumber) {
  psalmNumber = psalmNumber - 1;
  $('table tr').remove();
  $("div#links a").removeClass("current");
  $("div#links a").each(function (key, item) {
    if (parseInt($(item).attr("href").substring(1)) - 1 == psalmNumber) {
      $(item).addClass("current");
      return false;
    };
  });

  $('table thead').append($('<tr>')
    .append($('<th>')
      .append($('<h3>')
        .attr('valign', 'top')
        .text(data[psalmNumber][0][0])
        )
      )
    .append($('<td>')
      .append($('<h3>')
        .attr('valign', 'top')
        .text(data[psalmNumber][1][0])
        )
      )
    );

  $.each(data[psalmNumber][0].slice(1), function(key) {
    $('table tbody').append($('<tr>').attr('class', 'verse')
      .append($('<td>')
        .attr('valign', 'top')
        .html("<b>" + (key + 1) + "</b>" + " " + data[psalmNumber][0][key + 1])
        )
      .append($('<td>')
        .attr('valign', 'top')
        .html("<b>" + (key + 1) + "</b>" + " " + data[psalmNumber][1][key + 1])
        )
      );
  });
}

function populateLinks() {
  $.each(data, function(key) {
    psalmNumber = key + 1;
    $("div#links").append($("<a class=\"current\" onclick=\"populateTable(" + psalmNumber + ")\" href=\"#" + psalmNumber + "\">" + psalmNumber + "</a>")).append(" ");
  });
}

function populateTodayPsalms() {
  var dateObj = new Date();
  var day = dateObj.getUTCDate();
  var content = [];
  for (i=0; i<5; i++) {
    content.push(day + (i*30))
  }
    $("div#today").append($("<a>Dzisiaj: " + content.join(', ') + "</a>"));
}


$(function() {
  $.getJSON("wulgata-wujek.json", function(datax) {
    data = datax;
    populateLinks();
    populateTodayPsalms();
    var psalmNumber = parseInt(window.location.hash.substring(1));
    if (isNaN(psalmNumber)) {
      psalmNumber = 1;
      window.location.hash = psalmNumber;
    }
    populateTable(parseInt(psalmNumber));
  });
});
