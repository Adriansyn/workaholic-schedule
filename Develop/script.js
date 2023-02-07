
$(function () {
  var savedSchedule = {}
function loadHours (format) {
  if (localStorage.getItem("planner") != null) {
    savedSchedule = JSON.parse(localStorage.getItem("planner"))
  }
  // day.js format is applied in this code to get the time.
  var startHour = dayjs().hour(0).get('h')
  var currentHour = dayjs().get('h')
  var endHour = dayjs().hour(23).get('h')
  $('#hours').empty()
  for ( var hour=startHour; hour <= endHour; hour++) {
    var displayHour = dayjs().hour(hour).format(format)
    var currentTime='present'
    if (hour>currentHour) {
      currentTime='future'
    }
    if(hour<currentHour) {
      currentTime='past'
  } 
  var text = ''
  //undefined will prevent the code from breaking if local storage is erased.
  if (savedSchedule[`hour-${hour}`] != undefined) {
    text = savedSchedule[`hour-${hour}`]
  }
  //use of string templates (``) to add dynamic content to the elements ${var}.
    var hourContent=` <div id="hour-${hour}" class="row time-block ${currentTime}">
    <div class="col-2 col-md-1 hour text-center py-3">${displayHour}</div>
    <textarea class="col-8 col-md-10 description" rows="3">${text}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`
  $('#hours').append(hourContent)
  }
}
//Display on the top Name of day, Month and Number of the day using day.js format. 'ddd MMMM D'
  var format = 'hh A'
  loadHours(format)
  var currentDate=dayjs().format(' dddd MMMM D ')
  $('#currentDate').text(currentDate)


  $('.saveBtn').click(function (){
    var parent = $(this).parent()
    var id=parent.attr('id')
    var textValue = parent.children(".description")[0].value
    savedSchedule[id] = textValue
    localStorage.setItem("planner",JSON.stringify(savedSchedule));
  })
//This code changes the hour format from standard AM/PM to Millitary Time Format.
  $('#format-button').click(function() {
    if (format == 'hh A') {
      format = 'H'
    } else {
      format = 'hh A'
    }
    loadHours(format)
  })

 
});
