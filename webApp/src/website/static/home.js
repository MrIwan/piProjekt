'use strict'

//status data
let stat = {}

//classes which represents the charts
let cCPU = new gaugeChart('CPU', document.getElementById("ChartCpu"));
let cRam = new gaugeChart('Ram', document.getElementById("ChartRam"));

//class which representes all the availible game server
let gs_menager = new gameServerMenager()

//class which meages all online user
let user_menager = new userOnlineMenager()

//socket for updating server status
let socket = io({autoConnect:false})
socket.connect()

function display_on_of_switcher(display)
{
    if(display == 'none')
    {
        $("#ChartCpu").fadeOut();
        $("#ChartRam").fadeOut();
        $("#available_server").fadeOut();
    }
    else if(display == 'block')
    {
        $("#ChartCpu").fadeIn();
        $("#ChartRam").fadeIn();
        $("#available_server").fadeIn();
    }
}

function update_charts(stat)
{
    cCPU.add_data(stat['cpu_percent'])
    cRam.add_data(stat['virtual_memory'])
}

function update_status(stat, system_info = null)
{
    let start_stop_button = document.getElementById("start_stop_button")
    switch(stat)
    {
        case 'offline':
            display_on_of_switcher('none');
            start_stop_button.className = 'btn btn-outline-success';
            start_stop_button.innerHTML = 'Start';
            break;
        case 'starting':
            display_on_of_switcher('none');
            start_stop_button.className = 'btn btn-outline-warning';
            start_stop_button.innerHTML = 'Starting';
            break;
        case 'stopping':
            display_on_of_switcher('none');
            start_stop_button.className = 'btn btn-outline-warning';
            start_stop_button.innerHTML = 'Stopping';
            break;
        case 'unknown':
            display_on_of_switcher('none');
            start_stop_button.className = 'btn btn-outline-secondary';
            start_stop_button.innerHTML = 'unknown';
            break;
        default:
            display_on_of_switcher('block');
            start_stop_button.className = 'btn btn-outline-danger';
            start_stop_button.innerHTML = 'Stop';
            if(system_info != null)
            {
                update_charts(system_info);
            }
            
    }
}

document.getElementById("start_stop_button").addEventListener('click', emit_stop_start)
function emit_stop_start()
{
    let s = document.getElementById('start_stop_button').innerHTML.toLowerCase();
    console.log(s)
    switch (s)
    {
        case 'start':
            socket.emit('start')
            break;
        case 'stop':
            socket.emit('stop')
    }
}

socket.on('connect', function()
{
    socket.emit('stat')
    console.log('socket connected')
})

socket.on('disconnect', function()
{
    console.log('socket disconected')
})

socket.on('stat', function(s)
{
    stat = s;
    console.log(stat);
    update_status(stat['status'], stat['system_info']);
    gs_menager.update_game_server(stat['game_server']);
    user_menager.update_online_user(stat['user_online'])
})