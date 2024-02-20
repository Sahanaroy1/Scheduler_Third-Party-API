//To create the current date
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM D, YYYY,  h:mm A'));
  var time = {
    startHour: 9,
    endHour: 17
}
window.onload = displaySchedule;
//Is created to save the job to the calender

$(document).ready(function (){
  displaySchedule();
  $('.saveBtn').on('click', function (){
   
      var value = $(this).siblings('.description').val();
      var time = $(this).parent().attr('data-name');
      
      localStorage.setItem("hour-"+time, value);

     $("#notification").text("Appointment added to Local storage ✅");
    
      setTimeout(function(){
        $("#notification").text("");
      }, 5000);
  })
})

//To show the task in the calender even after the page is refreshed
function displaySchedule(){
  console.log("display");
  generateTimeSlot();
  updateTimeSlot();
 
  for(var i = 0; i < localStorage.length; i++){
  var record = localStorage.getItem(localStorage.key(i));

  $("#" + localStorage.key(i)).children('textarea').eq(0).text(record);
  
}
}
//to generate the time slot
function generateTimeSlot(){

  for( var hour = time.startHour; hour <= time.endHour; hour++){
      var savedTask = localStorage.getItem(time) || '';
    
    var html = ` <div id="hour-${hour}" class="row time-block past" data-name=${hour}>
                    <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
                    <textarea class="col-8 col-md-10 description" rows="3">${savedTask}</textarea>
                    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                    </button>
                 </div>`
        $('.container-lg').append(html);
  }
}
//To change the colour according to the time of the day
function updateTimeSlot(){
  var currentHour = dayjs().hour();

  $('.time-block').each(function (index, element){
    console.log($(element).attr('data-name'));
    var hour = $(element).attr('data-name');
   
    if(hour < currentHour){
      $(element).find('.description').addClass('past');
    }else if(hour == currentHour){
      $(element).find('.description').addClass('present');
    }else{
      $(element).find('.description').addClass('future');
    }
  })
}
//To generate the previous page 
function previousButton(){
  var previousDay = dayjs().add(-1, 'day');
  $('#currentDay').text(previousDay.format('dddd, MMMM D, YYYY'))

}
  $('.previous').on('click', previousButton);

  
