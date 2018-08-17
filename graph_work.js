//free data for working with graphs
var GRAPH_DATA=[];

//array cleaning function
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


//
function transform_main_array(){
    GRAPH_DATA=[];
	for (var a=0;a<MAIN_ARRAY[0].length;a++){
	var first_dim=[];
	for(var b=0;b<MAIN_ARRAY.length;b++){
		first_dim.push(MAIN_ARRAY[b][a]);
	}
	GRAPH_DATA.push(first_dim);
}
	
}

//transform to integer
function transform_to_int(data_to_int){
	
	var int_data=[];
	
	for(var a=0;a<data_to_int.length;a++){
		int_data.push(parseInt(data_to_int[a]));
	}
	return int_data;
}
//transform to string
function transform_to_str(data_to_str){
	
	var str_data = new Array();
	
	for(var a=0;a<data_to_str.length;a++){
		str_data.push(data_to_str[a].toString());
	}
	return str_data;
}

//generating histogram data 
function generate_hist_data(data_to_generate){
	var hist_label=[];
	var hist_data=[];
	var total_return=[data_to_generate[0]];
	var data_generate=[];
	
	//data_generate=data_to_generate.slice();
	data_generate=transform_to_int(data_to_generate);
	data_generate.shift();
	for(var a=0;a<data_generate.length;a++){
		var counter=0;
		for (var b=0;b<data_generate.length;b++){
			if(parseInt(data_generate[0])==parseInt(data_generate[b])){
				counter+=1;
			}
		}
		hist_data.push(counter);
		hist_label.push(data_generate[0].toString());
		data_generate.clean(data_generate[0]);
	}
	total_return.push(hist_label);
	total_return.push(hist_data);
    return total_return;
}//end of function

//MAIN FUNCTION TO TRANSFORMING MAIN ARRAy


//second onerror

function create_histogram(DATA_T,chart_place){
transform_main_array();

var array_from_function=generate_hist_data(DATA_T);

var graph_place = document.getElementById(chart_place).getContext('2d');


var myChart = new Chart(graph_place, {
    type: 'bar',
    data: {
        labels: array_from_function[1],
        datasets: [{
            label: '# of grades in '+array_from_function[0],
            data: array_from_function[2],
            borderWidth: 1
        }]
    },
    options: {
		responsive: false, 
        maintainAspectRatio: false,
		 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
		
    }
});
}
//test for generating button for hist

function generate_button(data,name){
	var div_1=document.getElementById('histogram_button_div');
	var input_button= document.createElement("button");
	input_button.id=name.toString()+"button_id";
	input_button.innerHTML=name.toString();
	input_button.onclick=function(){
			create_histogram(data,"histogram_chart");
		};		
	div_1.appendChild(input_button);
	
}

function generate_button2(data,name){
	var div_1=document.getElementById('histogram_button_div2');
	var input_button= document.createElement("button");
	input_button.id=name.toString()+"button_id";
	input_button.innerHTML=name.toString();
	input_button.onclick=function(){
			create_histogram(data,"histogram_chart2");
		};		
	div_1.appendChild(input_button);
	
}


function generate_button_for_hist(){
	alert("adasd");
	transform_main_array();
	for (var a=0;a<MAIN_ARRAY[0].length;a++){
		generate_button(GRAPH_DATA[a],MAIN_ARRAY[0][a]);
		generate_button2(GRAPH_DATA[a],MAIN_ARRAY[0][a]);
	}
}

