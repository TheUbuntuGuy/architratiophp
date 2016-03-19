var arcChart;
var ctx;
var l2arcChart;
var l2ctx;

var hitrate;
var l2hitrate;
var missrate;
var l2missrate;

var lasthits = 0;
var lastmisses = 0;
var lastl2hits = 0;
var lastl2misses = 0;

var requests = 0;

var refreshInterval = 5000;

Chart.defaults.global = {
    animation: true,
    animationSteps: 60,
    animationEasing: "easeOutQuart",
    showScale: true,
    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 0,
    scaleLineColor: "rgba(0,0,0,.1)",
    scaleLineWidth: 1,
    scaleShowLabels: true,
    scaleLabel: "<%=value%>",
    scaleIntegersOnly: true,
    scaleBeginAtZero: true,
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    scaleFontSize: 12,
    scaleFontStyle: "normal",
    scaleFontColor: "#666",
    responsive: false,
    maintainAspectRatio: true,
    showTooltips: true,
    customTooltips: false,
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
    tooltipFillColor: "rgba(0,0,0,0.8)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    multiTooltipTemplate: "<%= value %>",
    onAnimationProgress: function(){},
    onAnimationComplete: function(){}
};

var arcData = {
    labels: [],
    datasets: [
        {
            label: "ARC Hit Ratio",
            fillColor: "rgba(18,197,17,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        }
    ]
};

var l2arcData = {
    labels: [],
    datasets: [
        {
            label: "L2ARC Hit Ratio",
            fillColor: "rgba(17,102,197,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        }
    ]
};


function refresh() {
    $.getJSON("get_data.php", function (data) {
        hitrate = (data.hits - lasthits) / (refreshInterval / 1000);
        l2hitrate = (data.l2hits - lastl2hits) / (refreshInterval / 1000);
        missrate = (data.misses - lastmisses) / (refreshInterval / 1000);
        l2missrate = (data.l2misses - lastl2misses) / (refreshInterval / 1000);

        lasthits = data.hits;
        lastmisses = data.misses;
        lastl2hits = data.l2hits;
        lastl2misses = data.l2misses;

        requests = hitrate + missrate;
        if (requests != 0) {
            arcChart.addData([Math.round((hitrate / requests) * 100)], "");
            l2arcChart.addData([Math.round((l2hitrate / requests) * 100)], "");
        } else {
            arcChart.addData([100], "");
            l2arcChart.addData([100], "");
        }
        
        if (arcChart.datasets[0].points.length > 60) {
            arcChart.removeData();
            l2arcChart.removeData();
        }
    });
}

$(document).ready(function () {
    ctx = document.getElementById("arcChart").getContext("2d");
    arcChart = new Chart(ctx).Line(arcData, null);
    l2ctx = document.getElementById("l2arcChart").getContext("2d");
    l2arcChart = new Chart(l2ctx).Line(l2arcData, null);
    console.log("Starting...");
    refresh();

    setInterval(refresh, refreshInterval);
});
