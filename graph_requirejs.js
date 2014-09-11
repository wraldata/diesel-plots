require(
  ['jquery','lodash','vendor/plugins/jqplot'],

  function($, _) {

    var jsonurl = '<<JSON URL HERE>>';
    var data1 = [];
    var data2 = [];
    var ticks = [];

    $.ajax({
      async: false,
      url: jsonurl,
      dataType: "json",
      success: function(data){
        $.each(data,function(i,val){
          ticks.push([i, val["<<JSON KEY NAME>>"]]);
          data1.push([i, parseInt(val["<<JSON KEY NAME>>"])]);
          data2.push([i, parseInt(val["<<JSON KEY NAME>>"])]);
        });

        var options1 = {
          stackSeries: false,
          highlighter: {
            show: true,
            formatString: "<b>TEXT</b> %.0f<br /><b>TEXT</b> %.0f"
          },
          seriesDefaults: {
            fill:true,
            shadow: false
          },
          series: [
            {label: 'LEGEND LABEL'},
            {label: 'LEGEND LABEL'}
          ],
          seriesColors: ['#1f78b4', '#a6cee3'],
          legend: {
            show: true,
            placement: 'insideGrid'
          },
          grid: {
            drawBorder: false,
            drawGridlines: false,
            background: '#ffffff',
            shadow:false
          },
          axes: {
            xaxis: {
              ticks: ticks,
              tickRenderer: $.jqplot.CanvasAxisTickRenderer,
              tickOptions: {
                angle: -90,
                fontFamily: '"Droid Sans",Helvetica,sans-serif',
                fontSize: '12px'
              },
              drawMajorGridlines: false,
            },
            yaxis: {
              drawMajorGridlines: false,
              min:0,
              tickOptions: {
                formatString: "%.0f"
              }
            }
          }
        };
        var plot1 = $.jqplot('chart1', [data1, data2], options1);
        $(window).resize('resize',function() {
          plot1.replot({resetAxes: true});
        });
      }
    });   
  }
);
