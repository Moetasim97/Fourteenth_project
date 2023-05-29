

//initializing the model,view and controller objects
var model={}
var view={
    init:function(){
        return controller.init()
    },
    checkboxes:$('tbody input'),
    all_missed: $('tbody .missed-col'),
    render_missing:function(){
        return controller.countMissing()
    },
    event_mounter:function(){
        $allCheckboxes = view.checkboxes;
        $allCheckboxes.on('click', function() {
            controller.update_model()
        });
    
    }
}
//view object
var controller={
    update_model:function(){
        var studentRows = $('tbody .student'),
            newAttendance = {};
        studentRows.each(function() {
            
            
            var name = $(this).children('.name-col').text(),
            
                $allChecks = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allChecks.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });
        localStorage.model = JSON.stringify(newAttendance);
        controller.countMissing();
    },
    retrieve_model:function(){
        return JSON.parse(localStorage.getItem('model'))
    },
    countMissing:function() {
        $allMissed = view.all_missed,
        $allMissed.each(function() {
            
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }
}

controller.init=function(){
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }
        var nameColumns = $('tbody .name-col'),
            attendance = {},
            names=["Slappy the Frog","Lily the Lizard","Palrus the Walrus","Gregory the Goat","Adam the Anaconda"],
            students_no=11

            // here is an object created called attendance and I will pass to it an array containing the names of the students

        nameColumns.each(function(index,name) {
            
            name.textContent=names[index]
            
        
            attendance[names[index]] = [];
            

            for (var i = 0; i <= students_no; i++) {
                attendance[names[index]].push(getRandom());
            }
        });
        model=attendance;
        localStorage.model = JSON.stringify(model);
//function to check the ticks of every day based on the boolean values found in the model
        $.each(model, function(name, days) {
            
            console.log(days)
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');
    
            dayChecks.each(function(i) {
                $(this).prop('checked', days[i]);
            });
        });
    }
    localStorage.model = JSON.stringify(model);
}
//count_object


//this function calls the controller init function that in turn initiliazes the checkboxes randomly
view.init()
view.event_mounter()
view.render_missing()


    

    

