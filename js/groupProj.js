$(document).ready(function(){

  var genders ={f:"Female",m:"Male"}
  var TYPE = {area:"area",bar:"bar"}

  var selectedGender=$("#gender").val();
  var selectedAge=$("#age").val();


  //init
  $("." + selectedGender).show();
  drawBarChart("vis1");

  // drawTrends("vis2",selectedGender,selectedAge)

  //On changing age
  $("#age").change(function(){
      selectedAge = $("#age").val();

      $("#control1").val(selectedAge);
      $("#control1").change();
  });

  //On changing age
  $("#gender").change(function(){
      selectedGender = $("#gender").val();

      $("#control1").change();
      $("#sel-gender").value=genders[selectedGender];

  });


  function drawBarChart (id) {
    var data = getWholeData(selectedGender);

    series = getDataForAge(selectedAge, data);

    var vis1 = drawHighChart(id, TYPE.bar, series);

    $("#control1").change(function() {

      data = getWholeData(selectedGender);

      var sliderVal = $("input[type=range]").val();

      var ageData = getDataForAge(sliderVal, data);
      vis1.series[0].update({name:'Age '+sliderVal});

      for (i in ageData[0].data) {
        vis1.series[0].data[i].update(ageData[0].data[i]);
      }

    });

  }

  function getWholeData(selectedGender) {
    if (selectedGender == "m") {
      return maleData;
    }
    else {
      return femaleData;
    }
  }

  function getDataForAge(age, data) {
    for(d of data) {
      if(d["Row Labels"] == age) {
        var ageStr = 'Age '+age;
        var d1 = [{name: ageStr, data: Object.values(d).slice(1)}];
        return d1;
      }
    }
 }

});



function getFormattedHours(mins) {
  var hrs = Math.floor(mins/60);
  var returnStr = "";
  if (hrs > 0) {
    returnStr = hrs + " hrs ";
  }
  returnStr += Math.floor(mins%60) + " mins";
  return returnStr;
}


function drawHighChart(id, type, series) {
    var chart1= Highcharts.chart(id, {
        chart: {
           type:type,
            animation: {
                duration: 1000
            }
        },
        id:"apple",
        title: {
            text: 'Activities By Age'
        },
        xAxis: {
            categories: ['Sleep','Household Activites', 'Work and Work Related','Eating and Drinking',
            'Socializing Relaxing and Leisure','Telephone Calls','Travelling','Education','Other'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time (minutes)',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
            }
        },
        tooltip: {
            valueSuffix: ' minutes',
            valueDecimals: 2,
            formatter: function(){
              return getFormattedHours(this.y);
            }
        },
        plotOptions: {

            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: series
    });

    return chart1;

}
