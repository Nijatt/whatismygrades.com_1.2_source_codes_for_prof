
 /*
 this is main array which we will us as main data
 */
var MAIN_ARRAY=[];
var last_curve=0;
var last_std=0;

// curve grading limits
var AA=0;
var BA=0;
var BB=0;
var CB=0;
var CC=0;
var DC=0;
var DD=0;
var FD=0;
var FF=0;
//this is an emergency fucntion to print main array
function emergency_print(){
	document.write(MAIN_ARRAY);
}

//this is an open function inside STORE_DATA() function to generate entries 
function open(MAIN_ARRAY){
	
	document.getElementById("header").value="";
	//creating entries
	var entries=document.getElementById('entries');
	entries.style.display="block"; //making form object visiable
	
	document.getElementById("entries").innerHTML = ""; //clearing all entries from form is new one generates
	for (i = 0; i < MAIN_ARRAY[0].length; i++) { 
	 
	 var entrie= document.createElement("INPUT");
	 entrie.placeholder=MAIN_ARRAY[0][i];
	 entrie.id=MAIN_ARRAY[0][i].toString();
	 entries.appendChild(entrie);
	 
	 var br = document.createElement('BR');
	 entries.appendChild(br);
	
	}
	document.getElementById("store_button").style.display="block";
	
}

// Generate button function gettin STRING from entri and splitting it in array ti make MAIN_ARRAY[0]
function on_generate(){
	MAIN_ARRAY=[];
	//getting element from header and then splitting it adding to array
	var header_string=document.getElementById('header').value;
	header_string_to_array=header_string.split(" ");
	MAIN_ARRAY[0]=header_string_to_array; /*the first object of arrays is main info
                                           which is usable for creating entries */
	document.getElementById("header").value="";
	//creating entries
	open(MAIN_ARRAY);
	createTable(MAIN_ARRAY);
	createTable_1(MAIN_ARRAY);

	from_array_to_screen(MAIN_ARRAY);
}

function on_extend(){
	var header_string=document.getElementById('header').value;
	header_string_to_array=header_string.split(" ");
	
	for(var a=0;a<header_string_to_array.length;a++){
		MAIN_ARRAY[0].push(header_string_to_array[a]);
		for (var b=1;b<MAIN_ARRAY.length;b++){
			MAIN_ARRAY[b].push("0");
		}
	}
	
	alert(MAIN_ARRAY[0]);
	
	document.getElementById("header").value="";
	//creating entries
	open(MAIN_ARRAY);
	createTable(MAIN_ARRAY);
	createTable_1(MAIN_ARRAY);
	from_array_to_screen(MAIN_ARRAY);
	
}


//ADD button fucntion which gets info and add to MAIN_ARRAY
function store_data(){
	/*This part is adding every single enrtie data to MAIN_ARRAY ,
	but cheking every single of it. If its value null , space or string entires..*/
	
	//creating null array
	var NULL_ARRAY=[];
	
	for (i = 0; i < MAIN_ARRAY[0].length; i++) { 
	 //this function cheking every single entry by elementId and using MAIN_ARRAY[0] elements as elementId. 
	 var info=document.getElementById(MAIN_ARRAY[0][i].toString()).value;
	 if(info.indexOf(' ') >= 0 || info==""){
		 //if input is null , space then it is zero in array.
		 info="0";
	 }
	//adding info to NULL_ARRAY every single loop
	 NULL_ARRAY.push(info);
	}
	//clearing input
	document.getElementById("entries").reset();
	//adding NULL_ARRAY as one dimension to MAIN_ARRAY
	MAIN_ARRAY.push(NULL_ARRAY);
	//creating Table in TABLE div (html DOM)
	createTable(MAIN_ARRAY);
	//creating Input table for CHANGE div(html DOM)
	createTable_1(MAIN_ARRAY);
	//adding new MAIN_ARRAY to interactive screen
	from_array_to_screen(MAIN_ARRAY);
	
}



//saving to local storage button
function save_to_localStorage(){
	//SAVE TO LOCAL STORE
	var name=document.getElementById('local_storage_name').value;
	var str = JSON.stringify(MAIN_ARRAY);
	localStorage.setItem(name,str);
	
}

//loading from the local storage
function load_from_localStorage(){
	//LOAD FROM LOCAL STORE
	//document.getElementById("store_button").style.display="none";
	var name=document.getElementById('local_storage_name').value;
	str=localStorage.getItem(name);
	var STORED_ARRAY = JSON.parse(str);
	MAIN_ARRAY=[];
	MAIN_ARRAY=STORED_ARRAY.slice();
	open(MAIN_ARRAY);
	createTable(MAIN_ARRAY);
	createTable_1(MAIN_ARRAY);
	from_array_to_screen(MAIN_ARRAY);
	
}

//creating table and adding to table
function createTable(tableData) {
  clearTable();
  var table = document.getElementById('table_id');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
}


function clearTable()
{
 var tableRef = document.getElementById('table_id');
 while ( tableRef.rows.length > 0 )
 {
  tableRef.deleteRow(0);
 }
}


function createTable_2(tableData) {
  clearTable_1();
  var table = document.getElementById('table_id1');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
    
    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
	  var inside_cell=document.createElement('input');
	  inside_cell.placeholder=cellData;
	  inside_cell.id=cellData+"_for_table";
	  if(cellData.length==1){
		  input_length=20;
	  }
	  else{
		  input_length=cellData.length*10;
	  }
	  
	  inside_cell.style="width:"+input_length+"px;";
      cell.appendChild(inside_cell);
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
}


function clearTable_1()
{
	
document.getElementById('curve_id').value="";
document.getElementById('std_id').value="";

document.getElementById('aa_id').value="";
document.getElementById('ba_id').value="";
document.getElementById('bb_id').value="";
document.getElementById('cb_id').value="";
document.getElementById('cc_id').value="";
document.getElementById('dc_id').value="";
document.getElementById('dd_id').value="";
document.getElementById('fd_id').value="";
document.getElementById('ff_id').value="";

 var tableRef = document.getElementById('table_id1');
 while ( tableRef.rows.length > 0 )
 {
  tableRef.deleteRow(0);
 }
}


function createTable_1(tableData) {
  clearTable_1();
  document.getElementById('curve_id').placeholder="CURVE : "+last_curve.toString();
  document.getElementById('std_id').placeholder="STD : "+last_std.toString();
  
  //create curve grading scale..
  document.getElementById('aa_id').placeholder="AA : "+AA.toString()+"+";
  document.getElementById('ba_id').placeholder="BA : "+BA.toString();
  document.getElementById('bb_id').placeholder="BB : "+BB.toString();
  document.getElementById('cb_id').placeholder="CB : "+CB.toString();
  document.getElementById('cc_id').placeholder="CC : "+CC.toString();
  document.getElementById('dc_id').placeholder="DC : "+DC.toString();
  document.getElementById('dd_id').placeholder="DD : "+DD.toString();
  document.getElementById('fd_id').placeholder="FD : "+FD.toString();
  document.getElementById('ff_id').placeholder="FF : "+FF.toString()+"-";
  //----------------------------
  var table = document.getElementById('table_id1');
  var tableBody = document.createElement('tbody');

  for (var a=0;a<tableData.length;a++){
    var row = document.createElement('tr');
    
    for (var b=0;b<tableData[a].length;b++){
      var cell = document.createElement('td');
	  var inside_cell=document.createElement('input');
	  cell_element=tableData[a][b].toString();
	  inside_cell.placeholder=cell_element;
	  inside_cell.id=a.toString()+"_"+b.toString()+"_for_table";
	  if(cell_element.length==1){
		  input_length=20;
	  }
	  else{
		  input_length=cell_element.length*10;
	  }
	  
	  inside_cell.style="width:"+input_length+"px;";
      cell.appendChild(inside_cell);
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
}


//THIS IS IMPORTANT COMMAND FUNCTIONS FOR CHANGING DATA===========================================================================================================
function change_data(){
	//Stroing headers (also in other name MAIN_ARRAY[0] array which consist of name arrays)..
	var USEFULL_ARRAY=[];//creating null array..
	USEFULL_ARRAY=MAIN_ARRAY[0].slice();//coping The MAIN_ARRAY[0] to USEFULL_ARRAY[]..
	
	                                               //--NOW ALL MAIN FUNCTIONS RUN--
	
	var curve_input=document.getElementById('curve_id').value;
	if(curve_input.indexOf(' ') >= 0 || curve_input=="" || isNaN(parseInt(curve_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				last_curve=curve_input;// replacing data by input
	    }//end of else.
	
	var std_input=document.getElementById('std_id').value;
	if(std_input.indexOf(' ') >= 0 || std_input=="" || isNaN(parseInt(std_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				last_std=std_input;// replacing data by input
	    }//end of else.
	
	//---Part for adding grade limists to screen--------------------------------------------------------------BEGIN
	
	var aa_input=document.getElementById('aa_id').value;
	if(aa_input.indexOf(' ') >= 0 || aa_input=="" || isNaN(parseInt(aa_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				AA=aa_input;// replacing data by input
	    }//end of else.
	
	var ba_input=document.getElementById('ba_id').value;
	if(ba_input.indexOf(' ') >= 0 || ba_input=="" || isNaN(parseInt(ba_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				BA=ba_input;// replacing data by input
	    }//end of else.
	
	var bb_input=document.getElementById('bb_id').value;
	if(bb_input.indexOf(' ') >= 0 || bb_input=="" || isNaN(parseInt(bb_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				BB=bb_input;// replacing data by input
	    }//end of else.
	
	var cb_input=document.getElementById('cb_id').value;
	if(cb_input.indexOf(' ') >= 0 || cb_input=="" || isNaN(parseInt(cb_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				CB=cb_input;// replacing data by input
	    }//end of else.
	
	var cc_input=document.getElementById('cc_id').value;
	if(cc_input.indexOf(' ') >= 0 || cc_input=="" || isNaN(parseInt(cc_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				CC=cc_input;// replacing data by input
	    }//end of else.

	var dc_input=document.getElementById('dc_id').value;
	if(dc_input.indexOf(' ') >= 0 || dc_input=="" || isNaN(parseInt(dc_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				DC=dc_input;// replacing data by input
	    }//end of else.
	
	var dd_input=document.getElementById('dd_id').value;
	if(dd_input.indexOf(' ') >= 0 || dd_input=="" || isNaN(parseInt(dd_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				DD=dd_input;// replacing data by input
	    }//end of else.
		
	var fd_input=document.getElementById('fd_id').value;
	if(fd_input.indexOf(' ') >= 0 || fd_input=="" || isNaN(parseInt(fd_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				FD=fd_input;// replacing data by input
	    }//end of else.	
	
	var ff_input=document.getElementById('ff_id').value;
	if(ff_input.indexOf(' ') >= 0 || ff_input=="" || isNaN(parseInt(ff_input))==true){
				//if input is null , space then it is zero in array.
				}// end of if.
	else{
				FF=ff_input;// replacing data by input
	    }//end of else.
	
	//---Part for adding grade limists to screen--------------------------------------------------------------END
	// CHANCING DATA BY THE input ..
	for(var a=0;a<MAIN_ARRAY.length;a++){
		for(var b=0;b<MAIN_ARRAY[a].length;b++){
			var input_id=a.toString()+"_"+b.toString()+"_for_table";
			var input=document.getElementById(input_id).value;
			if(input.indexOf(' ') >= 0 || input==""){
				//if input is null , space then it is zero in array.
				}// end of if.
			else{
				MAIN_ARRAY[a][b]=input;// replacing data by input
			    }//end of else.
			}
	}// end of chancing data by input loop..
	
	
	
	//DELETING ONE COLOUMN BY  " del " COMMAND.. 
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		//checks the every coloumns first element..
		if(MAIN_ARRAY[0][a].toString()=="del"){//checking if there is "del" and memorising it by loop variable a..
			//starting deleting row by saving a.
			for(var b=0;b<MAIN_ARRAY.length;b++){
				MAIN_ARRAY[b].splice(a, 1);
			}// end of deleting loop..
		}// end of checking if statement..
	}//end of DELETING ONE COLOUMN BY  " del " COMMAND loop.
	
	
	//DELETING SEVERAL COLOUMN BY "del_from" AND "del_to" COMMANDS..
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		if(MAIN_ARRAY[0][a].toString()=="del_from"){//checking if there is "del_from"..
			var del_from=a;//memorising "del_from" index..
		for(var a=0;a<MAIN_ARRAY[0].length;a++){	
			if(MAIN_ARRAY[0][a].toString()=="del_to"){//checking if there is "del_from"..
				var del_to=a;//memorising "del_to" index..
				//start deleting
				for(var b=0;b<MAIN_ARRAY.length;b++){
					for (var mm=del_from;mm<=del_to;mm++){
						MAIN_ARRAY[b].splice(del_from, 1);
						}// end of loop of mm..
					}//end of loop of b..
			     }//end of checking "del_to" statement..
			}// end of loop		
		}//end of checking "del_from" statement..
	}//end of DELETING SEVERAL COLOUMN BY "del_from" AND "del_to" COMMANDS loop..
	
	
	//DELETING ONE ROW BY "del" COMMAND..
	for(var a=0;a<MAIN_ARRAY.length;a++){
		if(MAIN_ARRAY[a][0].toString()=="del"){//checking if there is "del"..
			//starting deleting row by a index
			MAIN_ARRAY.splice(a, 1);
			}
	}//end of DELETING ONE ROW BY "del" COMMAND loop.
	
	
	//DELETING SEVERAL ROW BY "del_from" AND "del_to" COMMANDS..
	for(var a=0;a<MAIN_ARRAY.length;a++){
		if(MAIN_ARRAY[a][0].toString()=="del_from"){//checking if there is "del_from"..
			var del_from=a;//memorising "del_from" index..
			for(var a=0;a<MAIN_ARRAY.length;a++){
				if(MAIN_ARRAY[a][0].toString()=="del_to"){//checking if there is "del_to"..
				var del_to=a;//memorising "del_to" index..
				//starting deleting..
				for (var mm=del_from;mm<=del_to;mm++){
					MAIN_ARRAY.splice(del_from, 1);
					}// end of loop of mm..
				}// end of cheking "del_to" if statement.
			}//end of checking "del_to" loop..
		}//end of checking "del_from" statement..
	}//end of DELETING SEVERAL ROW BY "del_from" AND "del_to" COMMANDS loop..
	
	
	
	
	//CREATING MAIN_ARRAY ELEMENT BY CHOOSING ONE AND CHANGE IT BY "per_##" COMMAND note: ## must be in [0,100].. 
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		var for_command=MAIN_ARRAY[0][a].toString();//cheking if there is any "per_##"..
		var for_command=for_command.split("_");//if yes split it to array..
		var check_true=for_command[0];//this one for checking "per"..
		var check_percent=parseInt(for_command[1]);//this one for integer number..
		if(check_true.toString()=="per"){// if there is "per"..
			if(check_percent<=100 && check_percent>=0){//then check if number between [0,100]..
			for(var b=0;b<MAIN_ARRAY.length;b++){// if yes lets start doing math..
				if(b==0){// if first array..
				    MAIN_ARRAY[b][a]=USEFULL_ARRAY[a];//changin the header of used part to original name..
					MAIN_ARRAY[b].push(USEFULL_ARRAY[a]+"("+check_true+"-"+check_percent+")");//this is name of new array
				    }// end of if part for b=0..
				else{//this is for math part..
				    var new_grade=(parseInt(MAIN_ARRAY[b][a])*check_percent)/100;//finding persentage..
				    MAIN_ARRAY[b].push(new_grade);//adding to the array
                    }//end of else part for math..
			    }//end of loop..
		    }//end of if statent for number check..
			else{
				MAIN_ARRAY[0][a]=USEFULL_ARRAY[a];
			}
	    }// end of if statement for "per" check..
	}//end of "per_##" COMMAND loop..
	
    //CREATING MAIN_ARRAY ELEMENT BY CHOOSING ONE AND CHANGE IT BY "ers_(<>=)_##" COMMAND note: ## must be in [0,100]..
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		var for_command=MAIN_ARRAY[0][a].toString();//cheking if there is any "ers_(<>=)##"..
		var for_command=for_command.split("_");//if yes split it to array..
		var check_true=for_command[0];//this one for checking "ers"..
		var check_case=for_command[1];//checking of < , >,>=,<= or =;
		var check_percent=parseInt(for_command[2]);//this one for integer number..
		if(check_true.toString()=="ers"){// if there is "per"..
			if(check_case=="=" || check_case==">" || check_case=="<" || check_case==">=" || check_case=="<=" && check_percent==true ){//then check if number between [0,100]..
			for(var b=0;b<MAIN_ARRAY.length;b++){// if yes lets start doing math..
				if(b==0){// if first array..
				    MAIN_ARRAY[b][a]=USEFULL_ARRAY[a];//changin the header of used part to original name..
					MAIN_ARRAY[b].push(USEFULL_ARRAY[a]+"("+check_true+"-"+check_case+"-"+check_percent+")");//this is name of new array
				    }// end of if part for b=0..
				else{//this is for erasing part ..
				    // ALL CHARACTER CASES RUN HERE..
					if(check_case=="="){//cheking if it is "="
						if(parseInt(MAIN_ARRAY[b][a])==check_percent){
							MAIN_ARRAY[b].push("erased");//adding to the array
						    }//end of erasing statement..
						else{
							MAIN_ARRAY[b].push(MAIN_ARRAY[b][a]);//adding to the array
						    }//end of adding original member..
				        }// end of "=" statmenet.
						
					if(check_case==">"){//cheking if it is ">"
						if(parseInt(MAIN_ARRAY[b][a])>check_percent){
							MAIN_ARRAY[b].push("erased");//adding to the array
						    }//end of erasing statement..
						else{
							MAIN_ARRAY[b].push(MAIN_ARRAY[b][a]);//adding to the array
						    }//end of adding original member..
				        }// end of ">" statmenet.

					if(check_case=="<"){//cheking if it is "<"
						if(parseInt(MAIN_ARRAY[b][a])<check_percent){
							MAIN_ARRAY[b].push("erased");//adding to the array
						    }//end of erasing statement..
						else{
							MAIN_ARRAY[b].push(MAIN_ARRAY[b][a]);//adding to the array
						    }//end of adding original member..
				        }// end of "<" statmenet.
						
					if(check_case==">="){//cheking if it is ">="
						if(parseInt(MAIN_ARRAY[b][a])>=check_percent){
							MAIN_ARRAY[b].push("erased");//adding to the array
						    }//end of erasing statement..
						else{
							MAIN_ARRAY[b].push(MAIN_ARRAY[b][a]);//adding to the array
						    }//end of adding original member..
				        }// end of "=>" statmenet.	
					
					if(check_case=="<="){//cheking if it is "<="
						if(parseInt(MAIN_ARRAY[b][a])<=check_percent){
							MAIN_ARRAY[b].push("erased");//adding to the array
						    }//end of erasing statement..
						else{
							MAIN_ARRAY[b].push(MAIN_ARRAY[b][a]);//adding to the array
						    }//end of adding original member..
				        }// end of "=" statmenet.
					
					else{
						
					}
						
					}//end of erasing part..
			    }//end of loop..
		    }//end of if statent for number check..
	    }// end of if statement for "per" check..
	}//end of "per_##" COMMAND loop..

	
	//CREATING NEW MAIN_ARRAY ELEMENT BY ADDING CHOOSED INT ELEMENT BASED MEMBERS BY "add" COMMAND..
	//PART1--chekingpart
	var help_array=[];//null array for adding index's of array elements which header is "add"
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		if(MAIN_ARRAY[0][a].toString()=="add"){//checking if "add"
			help_array.push(a);//adding to array
		}
	}//end of PART1	
	//PART2--adding part.
	if(help_array.length>1){
	for(var a=0;a<MAIN_ARRAY.length;a++){
		var header_name="";
		if(a==0){// creating name for first element and changing name of used array to original..
			for(var c=0;c<help_array.length;c++){
				MAIN_ARRAY[a][help_array[c]]=USEFULL_ARRAY[help_array[c]];//changin names of used arrays to original..
				header_name+="-"+USEFULL_ARRAY[help_array[c]].toString();
				}
			    MAIN_ARRAY[a].push(header_name);//name for add array.
				}//end of if statement..
		else{//doing adding..
			var total_grade=0;
			for(var c=0;c<help_array.length;c++){//adding by index
				total_grade+=parseInt(MAIN_ARRAY[a][help_array[c]]);
				}//end of adding loop..
		        MAIN_ARRAY[a].push(total_grade);//adding to array..
			}//end of else statement.
		}//end of main loop
	}//ending of PART2
	//end of ADDING ARRAY ELEMENTS BY "add" command..
	
	
	                                                       //--GRADING PART--

    //CATALOGUE GRADING
    function cat_grade(grade){
		var letter_grade="NA";
		var int_grade=parseInt(grade);
		if(int_grade<50){
			letter_grade="FF";
		}
		if(int_grade<60 && int_grade>=50){
			letter_grade="FD";
		}
		if(int_grade<65 && int_grade>=60){
			letter_grade="DD";
		}
		if(int_grade<70 && int_grade>=65){
			letter_grade="DC";
		}
		if(int_grade<75 && int_grade>=70){
			letter_grade="CC";
		}
		if(int_grade<80 && int_grade>=75){
			letter_grade="CB";
		}
		if(int_grade<85 && int_grade>=80){
			letter_grade="BB";
		}
		if(int_grade<90 && int_grade>=85){
			letter_grade="BA";
		}
		if(int_grade<100 && int_grade>=90){
			letter_grade="AA";
		}
		if(int_grade>=100){
			letter_grade="AA"
		}
		
		return letter_grade;
		
	}	
	
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		var for_command=MAIN_ARRAY[0][a].toString();//cheking if there is any "cat_##"..
		var for_command=for_command.split("_");//if yes split it to array..
		var check_name=for_command[0];//this one for checking "per"..
		var check_scale=parseInt(for_command[1]);//this one for integer number..
		if(check_name=="cat" && check_scale>=10){
			for(var b=0;b<MAIN_ARRAY.length;b++){
				if(b==0){
					 MAIN_ARRAY[b][a]=USEFULL_ARRAY[a];//changin the header of used part to original name..
					 MAIN_ARRAY[b].push("Catalogue"+"-"+check_scale);
				}
				else{
					var grade=(parseInt(MAIN_ARRAY[b][a])*100)/check_scale;
					MAIN_ARRAY[b].push(cat_grade(grade));
				}
			}
		}
	}
	//end of catalogue grading
	
	//Generating grading limits with gen command
	for(var a=0;a<MAIN_ARRAY[0].length;a++){
		if(MAIN_ARRAY[0][a].toString()=="gen")//cheking if there is any "gen"..
		{
			if(last_curve>0 && last_std>0){
				FF=parseInt(last_curve)-4*parseInt(last_std);
				FD=parseInt(last_curve)-3*parseInt(last_std);
				DD=parseInt(last_curve)-2*parseInt(last_std);
				DC=parseInt(last_curve)-parseInt(last_std);
				CC=parseInt(last_curve)+parseInt(last_std);
				CB=parseInt(last_curve)+2*parseInt(last_std);
				BB=parseInt(last_curve)+3*parseInt(last_std);
				BA=parseInt(last_curve)+4*parseInt(last_std);
				AA=parseInt(last_curve)+5*parseInt(last_std);
			}
			else{
				alert("WARNING!! CURVE and STD at least should be higher than zero..");
			}
		    
			MAIN_ARRAY[0][a]=USEFULL_ARRAY[a];//changin the header of used part to original name..
		}
		
	}
	                                                      
														  
	//CURVE GRADING
    //PART1
    var curve_array=[];
    for(var a=0;a<MAIN_ARRAY[0].length;a++){
		if(MAIN_ARRAY[0][a].toString()=="cur"){//checking if "cur"
			curve_array.push(a);//adding to array
		}
	}
	
	if(curve_array.length>0){
	var total_curve=0;
	var first_curve=0;
	for(var a=0;a<curve_array.length;a++){
		var total_grades=0;
		var counter=0;
		for (var b=0;b<MAIN_ARRAY.length;b++){
			    if(b==0){
					MAIN_ARRAY[b][curve_array[a]]=USEFULL_ARRAY[curve_array[a]];
				}
			    else if(parseInt(MAIN_ARRAY[b][curve_array[a]])>=0){
					total_grades+=parseInt(MAIN_ARRAY[b][curve_array[a]]);
					counter+=1;
				}
				else if(MAIN_ARRAY[b][curve_array[a]].toString()=="erased"){
					total_grades+=0;
				}
				else{
					total_grades+=0;
					counter+=1;
				}
				
			}//end of adding loop..
			first_curve=total_grades/(counter);
			total_curve+=first_curve;
		}//end of else statement.
		last_curve=total_curve;
	}//end of main loop
	
	
	
	//MAIN FUNCTIONF FOR ARRAYS
	
    function standardDeviation(values){
		var avg = average(values);
		var squareDiffs = values.map(function(value){
			var diff = value - avg;
			var sqrDiff = diff * diff;
			return sqrDiff;
			});
		var avgSquareDiff = average(squareDiffs);
		var stdDev = Math.sqrt(avgSquareDiff);
		return stdDev;
		}

     function average(data){
     var sum = data.reduce(function(sum, value){
     return sum + value;
	 }, 0);

	 var avg = sum / data.length;
	 return avg;
	 }

	 function to_integer(data_to_use){
		 var array=[];
		 var data=[];
		 data=data_to_use.slice();
		 data.clean(data[0]);
		 for(var a=0;a<data.length;a++){
			 if(isNaN(parseInt(data[a]))==false){
				array.push(parseInt(data[a]));
			 }
			 else{
				 if(data[a].toString()=="erased"){
					 
				 }
				 else{
					 array.push(0);
				 }
			 }
		}
	   return array;
	}

     transform_main_array();

     for(var a=0;a<MAIN_ARRAY[0].length;a++){
		 if(MAIN_ARRAY[0][a].toString()=="std"){
			 last_std=standardDeviation(to_integer(GRAPH_DATA[a]));
			 MAIN_ARRAY[0][a]=USEFULL_ARRAY[a];
			 }
			 }
			 
	
	for (var a=0;a<MAIN_ARRAY[0].length;a++){
		  if(MAIN_ARRAY[0][a].toString()=="info"){
			  alert("The length of the "+USEFULL_ARRAY[a].toString()+" array is "+GRAPH_DATA[a].length);
			  MAIN_ARRAY[0][a]=USEFULL_ARRAY[a];
			  document.getElementById("0_"+a.toString()+"_for_table").value="";
			  }
			  }	
	
	
	// fucntion for correctiong data to scale of grading
	function correct_to(data,scale){
		var return_data=[];
		var null_data=data.slice();
		var int_null_data=to_integer(null_data);
		for(var a=0;a<int_null_data.length;a++){
			return_data.push(int_null_data[a]*100/scale);
		}
		return return_data;
	}// end of correct_to() fucntion..
	
	
	for (var a=0;a<MAIN_ARRAY[0].length;a++){
		if(MAIN_ARRAY[0][a].toString()=="cur_"){
			MAIN_ARRAY[0][a]=USEFULL_ARRAY[a];
			transform_main_array();
			// fucntion for generating template grades from data
            function curve_temp(grade){
				var letter_grade="NA";
				var int_grade=parseInt(grade);
				if(int_grade<FF){
					letter_grade="FF";
				}
				if(int_grade<FD && int_grade>=FF){
					letter_grade="FD";
				}
				if(int_grade<DD && int_grade>=FD){
					letter_grade="DD";
				}
				if(int_grade<DC && int_grade>=DD){
					letter_grade="DC";
				}
				if(int_grade<CC && int_grade>=DC){
					letter_grade="CC";
				}
				if(int_grade<CB && int_grade>=CC){
					letter_grade="CB";
				}
				if(int_grade<BB && int_grade>=CB){
					letter_grade="BB";
				}
				if(int_grade<BA && int_grade>=BB){
					letter_grade="BA";
				}
				if(int_grade<AA && int_grade>=BA){
					letter_grade="AA";
				}
				if(int_grade>=AA){
					letter_grade="AA"
				}				
				return letter_grade;				
			}			
		
			for(var b=0;b<GRAPH_DATA[a].length;b++){
				if(b==0){
					MAIN_ARRAY[b].push("CURVE-"+GRAPH_DATA[a][b].toString());
					
				}
				else{
					MAIN_ARRAY[b].push(curve_temp(GRAPH_DATA[a][b]));
				}
			}
			
		}
	}//end of loop

													  //--MAIN PROCUDURE-- 
      													
	
	open(MAIN_ARRAY);
	//creating Table in TABLE div (html DOM)
	createTable(MAIN_ARRAY);
	//creating Input table for CHANGE div(html DOM)
	createTable_1(MAIN_ARRAY);
	//adding new MAIN_ARRAY to interactive screen
	from_array_to_screen(MAIN_ARRAY);
	
	
}//END OF change_data() function..


function alert_commands(){
	var str1="del                     /for deleting row or coloumn \n";
	var str2="del_from and del_to     /deleting multiple rows and commands \n";
    var	str3="per_##                  /findin the persentage of list ## must be between [0,100] \n";
	var str4="add                     /adding multiple lists \n";
	var str5="cur                     /finding the curve of list or multiple lists \n";
   var str51="cur_                    /generating curve grades in letter according to curve and std \n";
	var str6="cat_##                  / generating catalogue grades by ## scale \n";
	var str7="std                     /finding std of list \n";
	var str8="gen                     /generating grade limits of curve grading \n";
	var str9="info                    /showing info about an array \n";
	var str10="ers_=_##, ers_<=_##, ers_>=_##, ers_<_##, ers_>_##     /erasing function and creating new array \n";
	alert(str1+str2+str3+str4+str5+str51+str6+str7+str8+str9+str10);
}
















//send data to php 
 function myMethod(){
	var str=""
	var hidden_place=document.getElementById("hidden_p");
	for (var i=0 ; i<MAIN_ARRAY.length;i++){
		for(var j=0;j<MAIN_ARRAY[i].length;j++){
			add=MAIN_ARRAY[i][j].toString()+"*";
			str+=add
		}
		str+="#";
	}
	
	hidden_place.value=str;
}
 
//getting local storage---------------------------------------------------------------------------------------------
function get_local_storage(){
	//document.getElementById("store_button").style.display="none";
	var name=document.getElementById('local_storage_name').value;
	str=localStorage.getItem(name);
	var STORED_ARRAY = JSON.parse(str);
	MAIN_ARRAY=[];
	MAIN_ARRAY=STORED_ARRAY.slice();
	open(MAIN_ARRAY);
}



function on_save(){
	//local storage
	//local session
	var name=document.getElementById('mytxt').value;
	var str = JSON.stringify(MAIN_ARRAY);
	localStorage.setItem(name,str);
	document.getElementById('mytxt').reset();

}

function on_show(){
	//local storage
	//local session
	var name=document.getElementById('mytxt').value;
	document.write(localStorage.getItem(name));
}

//-------------------------------------------------------------------------------------------------
//csv test
function exportToCVS(){
	var csv = 'Name,Title\n';
	
    MAIN_ARRAY.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
			});
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}

function exportToJSON(){

}




 
 
//INTERACTIVE CANVAS BACKGROUND
var canvas = document.getElementById('ctx'),
ctx = canvas.getContext('2d');
WIDTH=window.innerWidth;
HEIGHT=window.innerHeight;
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//start game coding...
ctx.font="13px Arial";
ctx.fillStyle = "blue"

//CREATING OBJECT FROM MAIN Array

var student_list={};

var DATA_POOL={
	name:"DATA POOL",
    x:300,
    spdx:2,
    y:300,
    spdy:2
};

student_list["DATA_POOL"]=DATA_POOL;

function from_array_to_screen(MAIN_ARRAY){
//Making list free	
student_list={}
//making pool text on 
var DATA_POOL={
	name:"DATA POOL",
    x:300,
    spdx:2,
    y:300,
    spdy:2
};
student_list["DATA_POOL"]=DATA_POOL;

// loading names from MAIN ARRAY to 
for (var m=0; m<=MAIN_ARRAY.length; m++)
{  
 var student={
	name:"NOTHING TO SHOW",
    x:10,
    spdx:10,
    y:10,
    spdy:10
};
	name_or_id=MAIN_ARRAY[m][0];
	student.name=name_or_id.toString();
	student.x=Math.random()*WIDTH;
	student.y=Math.random()*HEIGHT;
	student.spdx=Math.random()*3;
	student.spdy=Math.random()*3;
	student_list[m.toString()]=student; 
  }
}

function update_object(object){
object.x+=object.spdx;
object.y+=object.spdy;
ctx.fillText(object.name,object.x,object.y);

if (object.x<0 || object.x>WIDTH){
    object.spdx=-object.spdx;
}
if (object.y<0 || object.y>HEIGHT){
    object.spdy=-object.spdy;
}
}

//gettin image options
base_image = new Image();
base_image.src = 'back.jpg';

function update(){

//clearing canvas
ctx.clearRect(0,0,WIDTH,HEIGHT);
//after clearing drawing the image
ctx.drawImage(base_image, 0, 0);

for (var key in student_list){
	update_object(student_list[key]);
}

}

setInterval(update,40);
