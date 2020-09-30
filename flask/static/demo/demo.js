type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('lineChartExample').getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Active Users",
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }]
      },
      options: gradientChartOptionsConfiguration
    });
  },

  initDashboardPageCharts: function() {

    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            autoSkip : false,
            suggestedMin: 0.5,
            suggestedMax: 1.0,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 0.9,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          stacked : true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          stacked : true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 0,
            fontColor: "#9e9e9e",
            fontSize: 10,
            autoSkip: false,
            maxRotation : 0,
            minRotation: 0,
          }
        }]
      }
    };

    var ctx = document.getElementById("chartLinePurple").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
    gradientStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

    var data = {
      labels: ['Jan 20', 'Jan 27', 'Feb 3', 'Feb 10', 'Feb 17', 'Mar 2', 'Mar 9', 'Mar 16', 'Mar 23','Mar 30', 'Apr 6'],
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#d048b6',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#d048b6',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#d048b6',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [2, 10, 15, 4, 3, 10, 15, 40, 53, 31, 60],
      }]
    };

    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipPurple
    });


    var ctxGreen = document.getElementById("chartLineGreen").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
    

    var data = {
      labels: ['Brazil', 'UK', 'Spain', 'USA', 'France', 'Turkey', 'Australia', 'Canada', 'Ireland', 'South Korea'],
      datasets: [{
        label: "Percentage",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [85, 70, 68, 67, 67, 63, 62, 61, 61, 59],
      }]
    };

    var myChart = new Chart(ctxGreen, {
      type: 'horizontalBar',
      data: data,
      legend: {
        display: false
      },
      options: gradientChartOptionsConfigurationWithTooltipGreen
    }
    );

    //myChart.options.legend.display = false    



    /* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

// SELECT ALL ELEMENTS
// ALL COUNTRY NAMES WITH THEIR ISO CODE
let country_list = [
  { name: 'USA', code: 'US' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'UK', code: 'GB' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Iran', code: 'IR' },
  { name: 'Russia', code: 'RU' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Portugal', code: 'PT' },
  { name: 'India', code: 'IN' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Austria', code: 'AT' },
  { name: 'Peru', code: 'PE' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Japan', code: 'JP' },
  { name: 'S. Korea', code: 'KR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Poland', code: 'PL' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Romania', code: 'RO' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Norway', code: 'NO' },
  { name: 'UAE', code: 'AE' },
  { name: 'Czechia', code: 'CZ' },
  { name: 'Australia', code: 'AU' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Panama', code: 'PA' },
  { name: 'Finland', code: 'FI' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Egypt', code: 'EG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'Moldova', code: 'MD' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Greece', code: 'GR' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Iceland', code: 'IS' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Oman', code: 'OM' },
  { name: 'North Macedonia', code: 'MK' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Ivory Coast', code: 'CI' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Niger', code: 'NE' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Albania', code: 'AL' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Honduras', code: 'HN' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Palestine', code: 'PS' },
  { name: 'Malta', code: 'MT' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Réunion', code: 'RE' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'DRC', code: 'CD' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Mali', code: 'ML' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Congo', code: 'CG' },
  { name: 'Brunei', code: 'BN' },
  { name: 'Somalia', code: 'SO' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Aruba', code: 'AW' },
  { name: 'French Guiana', code: 'GF' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Togo', code: 'TG' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Cabo Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Libya', code: 'LY' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Macao', code: 'MO' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Syria', code: 'SY' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Saint Martin', code: 'MF' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Chad', code: 'TD' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Zimbabwe', code: 'ZW' },
  { name: 'Angola', code: 'AO' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Eswatini', code: 'SZ' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Belize', code: 'BZ' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'CAR', code: 'CF' },
  { name: 'St. Vincent Grenadines', code: 'VC' },
  { name: 'Turks and Caicos', code: 'TC' },
  { name: 'Falkland Islands', code: 'FK' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Vatican City', code: 'VA' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'St. Barth', code: 'BL' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Caribbean Netherlands', code: 'BQ' },
  { name: 'British Virgin Islands', code: 'VG' },
  { name: 'Sao Tome and Principe', code: 'ST' },
  { name: 'South Sudan', code: 'SD' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Saint Pierre Miquelon', code: 'PM' },
  { name: 'Yemen', code: 'YE' },
  { name: 'China', code: 'CN' }
];

// APP VARIABLES
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	deaths = [],
	formatedDates = [];

// GET USERS COUNTRY CODE
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach( country => {
	if( country.code == country_code ){
		user_country = country.name;
	}
});

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */


function fetchData(user_country){


	cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
	
	fetch(`https://api.covid19api.com/dayone/country/${user_country}`, {
    "method": "GET",
    
		
	})
	.then( response => {
		return response.json();
	})
	.then( data => {
		dates = Object.keys(data);
		
		dates.forEach( date => {
			let DATA = data[date];
      // console.log(DATA.Confirmed)
      formatedDates.push(formatDate(DATA.Date));
      // const index1 = formatedDates.indexOf("8 Jul");
      // if (index1 > -1) {
      //   formatedDates.splice(index1, 1);
      // }
			app_data.push(DATA);
      cases_list.push(parseInt(DATA.Confirmed));
      // const index2 = cases_list.indexOf("8 Jul");
      // if (index2 > -1) {
      //   cases_list.splice(index2, 1);
      // }
      recovered_list.push(parseInt(DATA.Recovered));
      // const index3 = recovered_list.indexOf("8 Jul");
      // if (index3 > -1) {
      //   recovered_list.splice(index3, 1);
      // }   
      deaths_list.push(parseInt(DATA.Deaths));
      const index = formatedDates.indexOf("8 Jul");
      if (index > -1) {
        formatedDates.splice(index, 1);
        cases_list.splice(index, 1);
        recovered_list.splice(index, 1);
        deaths_list.splice(index, 1);
      }
      // const index4 = deaths_list.indexOf("8 Jul");
      // if (index4 > -1) {
      //   deaths_list.splice(index4, 1);
      // }
      // const index = formatedDates.indexOf("8 Jul");
      // if (index > -1) {
      //   formatedDates.splice(index, 1);
      // }
      // app_data.push(DATA);
      // cases_list.push(parseInt(DATA.Confirmed));

      // const index1 = cases_list.indexOf("8 Jul");
      // if (index1 > -1) {
      //   cases_list.splice(index1, 1);
      // }

      // recovered_list.push(parseInt(DATA.Recovered));
      // const index2 = recovered_list.indexOf("8 Jul");
      // if (index2 > -1) {
      //   recovered_list.splice(index2, 1);
      // }
      // deaths_list.push(parseInt(DATA.Deaths));
      // const index3 = deaths_list.indexOf("8 Jul");
      // if (index3 > -1) {
      //   deaths_list.splice(index3, 1);
      // }
		})
	})
  .catch( error => {
		alert(error);
	})
}



fetchData(user_country);

// UPDATE UI FUNCTION


// UPDATE CHART
let my_chart;
function axesLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Cases',
				data: cases_list,
				fill : false,
				borderColor : '#FFF',
				backgroundColor: '#FFF',
				borderWidth : 1
			},{
				label: 'Recovered',
				data: recovered_list,
				fill : false,
				borderColor : '#009688',
				backgroundColor: '#009688',
				borderWidth : 1
			},{
				label: 'Deaths',
				data: deaths_list,
				fill : false,
				borderColor : '#f44336',
				backgroundColor: '#f44336',
				borderWidth : 1
			}],
			labels: formatedDates
		},
		options: {
			responsive : true,
			maintainAspectRatio : false
		}
	});
}

// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString){
	let date = new Date(dateString);

	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}
// console.log(formatedDates)

  var chart_labels = formatedDates
    var chart_data = cases_list;


    var ctx = document.getElementById("chartBig1").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: formatedDates,
        datasets: [{
          label: 'Cases',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data:cases_list,
        },{
          label: 'Recovered',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#2bffc6',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#2bffc6',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#2bffc6',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data:recovered_list,
        },{
          label: 'Deaths',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#f4f5f7',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#f4f5f7',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#f4f5f7',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data:deaths_list,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipPurple
    };
    
    var myChartData = new Chart(ctx, config);
    document.getElementById("456").innerHTML='Statistics'
    document.getElementById("123").innerHTML="Most Trusted News Sources"
    var data = myChartData.config.data;
    data.datasets[0].data = [0.55, 0.60, 0.75, 0.76, 0.8, 0.83, 0.83, 0.85, 0.86, 0.87, 0.87, 0.88, 0.89, 0.9, 0.9, 1, 1]
    data.datasets[0].label='Trust'
    data.labels = ['CBS', 'Atlantic', 'USA Today', 'Seattle Times', 'Time', 'Denver Post', 'Politicio', 'Local', 'Latimes', 'Wall Street Journal', 'Guardian', 'PBS', 'NPR', 'BBC', 'Reuters', 'Public TV', 'Economist'];
    myChartData.options.scales.yAxes[0].ticks.max=1.0
    myChartData.options.scales.yAxes[0].ticks.min=0.5
    myChartData.update();
    
    $("#0").click(function() {
      document.getElementById("456").innerHTML='Statistics'
      document.getElementById("123").innerHTML="Most Trusted News Sources"
      var data = myChartData.config.data;
      data.datasets[0].data = [0.55, 0.60, 0.75, 0.76, 0.8, 0.83, 0.83, 0.85, 0.86, 0.87, 0.87, 0.88, 0.89, 0.9, 0.9, 1, 1]
      data.datasets[0].label='Trust'
      data.labels = ['CBS', 'Atlantic', 'USA Today', 'Seattle Times', 'Time', 'Denver Post', 'Politicio', 'Local', 'Latimes', 'Wall Street Journal', 'Guardian', 'PBS', 'NPR', 'BBC', 'Reuters', 'Public TV', 'Economist'];
      myChartData.options.scales.yAxes[0].ticks.max=1.0
      myChartData.options.scales.yAxes[0].ticks.min=0.5
      myChartData.update();
    });
    $("#1").click(function() {
      document.getElementById("456").innerHTML=user_country;
      document.getElementById("123").innerHTML="COVID 19 Tracker"
      var data = myChartData.config.data;
      data.datasets[0].label='Cases'
      data.datasets[0].data = cases_list;
      data.datasets[1].data = recovered_list;
      data.datasets[2].data = deaths_list;
      data.labels = formatedDates;
      myChartData.options.scales.yAxes[0].ticks.max=10000000
      myChartData.options.scales.yAxes[0].ticks.min=0
      myChartData.update();
    });

    $("#2").click(function() {
      document.getElementById("456").innerHTML='Statistics'
      document.getElementById("123").innerHTML="Sensex"
      var data = myChartData.config.data;
      data.datasets[0].label='Price'
      data.datasets[0].data = [37018, 36562, 38305, 40165, 40802, 41306, 39735, 38144, 28265, 31715, 33303, 35414];
      data.labels = ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', '2020', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul'];
      myChartData.options.scales.yAxes[0].ticks.max=50000
      myChartData.options.scales.yAxes[0].ticks.min=20000
      myChartData.update();
    });


  var ctx = document.getElementById("CountryChart").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


    var myChart = new Chart(ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: true
      },
      data: {
        labels: ['Economy', 'Casually', 'Culture', 'Treatments', 'Statistics', 'Government', 'Environment'],
        datasets: [
        {
          label: "Audio",
          fill: true,
          backgroundColor: '#0000ff',
          hoverBackgroundColor: gradientStroke,
          borderColor: '#FFFFFF',
          borderWidth: 0,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [0, 0, 2, 2, 3, 5, 0],
        },

        {
          label: "Image",
          fill: true,
          backgroundColor: '#FF0000',
          hoverBackgroundColor: gradientStroke,
          borderColor: '#FFFFFF',
          borderWidth: 0,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [5, 20, 16, 17, 7, 17, 6],
        },
        
        {
          label: "Text",
          fill: true,
          backgroundColor: '#FFFF00',
          hoverBackgroundColor: gradientStroke,
          borderColor: '#FFFFFF',
          borderWidth: 0,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [7, 0, 5, 17, 15, 14, 3],
        },
        
        {
          label: "Video",
          fill: true,
          backgroundColor: '#008000',
          hoverBackgroundColor: gradientStroke,
          borderColor: '#FFFFFF',
          borderWidth: 0,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [2, 18, 39, 3, 1, 10, 4],
        }]
      },
      options: gradientBarChartConfiguration
    });

  },

  initGoogleMaps: function() {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8ec3b9"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1a3646"
          }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#334e87"
          }]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#283d6a"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6f9ba5"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3C7680"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#304a7d"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2c6675"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#9d2a80"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#9d2a80"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#b0d5ce"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }
      ]
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function(from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};
