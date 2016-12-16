


$(document).ready(function(){

  //On scroll, sticky header
    var header = $("#sticky-header");

    $(window).on("scroll",function(e) {
      if ($(window).scrollTop() > 525) {
        header.addClass("top-header");
      } else {
        header.removeClass("top-header");
      }

    });

  Highcharts.setOptions({
        colors: ['#4ECDC4','#6AF9C4' ,'#CD7777' , '#9F87AF', '#CAFFB9', '#FF9655','#9F7E69',  '#FF3789','#24CBE5','#FFF263']
    });


  var genders ={f:"Female",m:"Male"}
  var TYPE = {area:"area",bar:"bar"}

  var selectedGender=$("#gender").val();
  var selectedAge=$("#age").val();

  var ageTemp = $("#age");

  $("#ageVal").text(selectedAge)
  // populating dropdown age values
  $.each(new Array(65), function(i){

    ageTemp.append($("<option />").val(i+16).text(i+16));

  });
 // adding 85 specifically
  ageTemp.append($("<option />").val(85).text(85));

  //init
  $("." + selectedGender).show();
  drawBarChart("vis1");
  drawAreaChart("vis2male",'m');
  drawAreaChart("vis2female",'f');
  $('#visfemale').hide();



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
      if(selectedGender == "f")
      {
              
              $("#vis2female").show();
              $("#vis2male").hide();
              $("#vis3Female").show();
              $("#vis4Female").show();
              $("#vis3Male").hide();
              $("#vis4Male").hide();


      }
      else
      {
              $("#vis2female").hide();
              $("#vis2male").show();
              $("#vis3Female").hide();
              $("#vis4Female").hide();
              $("#vis3Male").show();
              $("#vis4Male").show();

      }

      $("#control1").change();
      $("#sel-gender").value=genders[selectedGender];

  });



  function drawBarChart (id) {
    var data = getWholeData(selectedGender);

    series = getDataForAge(selectedAge, data);

     var categories = ['Sleep','Household Activites', 'Work and Work Related','Eating and Drinking',
            'Socializing Relaxing and Leisure','Telephone Calls','Travelling','Education','Fitness and Exercise','Other'];

    var vis1 = drawHighChart(id, TYPE.bar, series, categories);

    $("#control1").change(function() {

      data = getWholeData(selectedGender);

      var sliderVal = $("input[type=range]").val();

      var ageData = getDataForAge(sliderVal, data);
      vis1.series[0].update({name:'Age '+sliderVal});

      for (i in ageData[0].data) {
        vis1.series[0].data[i].update(ageData[0].data[i]);
      }

      $("#ageVal").text(sliderVal);
    });



  }

    function drawAreaChart (id,sex) {
    
    var data = getWholeData(sex);
    var series = formatData(data);
    var vis2 = drawHighChart(id, TYPE.area, series.ser,series.category);

    $("#filter").change(function(){
     var filter = $("#filter").val();
     if(filter == "All")
     {
         for(i=0;i<10;i++)
        {

          vis2.series[i].show();
      }
     }
     else
      { var series = figureHide(filter);
      for(i=0;i<10;i++)
      {
       if(i!=series)
          vis2.series[i].hide();
      }
      vis2.series[series].show();
     }





  });




 function figureHide(filter)
 {

    if(filter == "Sleep")
      return 0;
    else if(filter == "Household Activities")
      return 1;
    else if(filter == "Work and Work Related")
      return 2;
    else if(filter == "Eating and Drinking")
      return 3;
    else if(filter == "Socializing Relaxing and Leisure")
      return 4;
    else if(filter == "Telephone Calls")
      return 5;
    else if(filter == "Travelling")
      return 6;
    else if(filter == "Education")
      return 7;
    else if(filter == "Fitness and Exercise")
      return 8;
    else if(filter == "Other")
      return 9;
  }


  }

  function formatData(data)
  {
     var series = [];
     var sleep = [], household=[], work=[], eating=[],socializing=[],telephone=[],travelling=[],education=[],exercise=[] ,other = [],age=[];
    for(d of data)
    {
           age.push(Object.values(d)[0]);
           sleep.push(Object.values(d)[1]);
           household.push(Object.values(d)[2]);
           work.push(Object.values(d)[3]);
           eating.push(Object.values(d)[4]);
           socializing.push(Object.values(d)[5]);
           telephone.push(Object.values(d)[6]);
           travelling.push(Object.values(d)[7]);
           education.push(Object.values(d)[8]);
           exercise.push(Object.values(d)[9]);
           other.push(Object.values(d)[10]);


    }



    series = [{name: 'Sleep', data: sleep},{name: 'Household Activites', data: household},{name: 'Work and Work Related', data: work},{name: 'Eating and Drinking', data: eating},{name: 'Socializing Relaxing and Leisure', data: socializing},
    {name: 'Telephone Calls', data: telephone},{name: 'Travelling', data: travelling},{name: 'Education', data: education},{name: 'Fitness and Exercise', data: exercise},{name: 'Other', data: other}];


        return {ser:series, category:age};


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


function drawHighChart(id, type, series,categories) {
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
            categories: categories,
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

          bar: {
            colorByPoint: true
        },
        area:{
          stacking : 'normal',
          marker: 'none'
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
