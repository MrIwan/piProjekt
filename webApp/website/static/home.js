'use strict'

//status data
let stat = {}

let cCPU = new gaugeChart('CPU', document.getElementById("ChartCpu"));
let cRam = new gaugeChart('Ram', document.getElementById("ChartRam"));

//socket for updating server status
let socket = io({autoConnect:false})
socket.connect()

function get_badge(color)
{
    let span = document.createElement('span');
    switch (color)
    {
        case 'online':
            span.className = 'badge bg-success';
            span.appendChild( document.createTextNode('online'));
            break;
        case 'starting':
            span.className = 'badge bg-warning text-dark';
            span.appendChild( document.createTextNode('starting'));
            break;
        case 'stopping':
            span.className = 'badge bg-warning text-dark';
            span.appendChild( document.createTextNode('stopping'));
            break;
        case 'offline':
            span.className = 'badge bg-danger';
            span.appendChild( document.createTextNode('offline'));
            break;
        default:
            span.className = 'badge bg-secondary';
            span.appendChild( document.createTextNode('unknown'));

    }
    return span;
}

function get_start_button(status)
{
    let button = document.createElement('button');
    switch (status)
    {
        case 'online':
            button.className = 'btn btn-outline-danger';
            button.appendChild( document.createTextNode('Stop'));
            button.disabled = false;
            break;
        case 'starting':
            button.className = 'btn btn-outline-secondary';
            button.appendChild( document.createTextNode('Starting'));
            button.disabled = true;
            break;
        case 'stopping':
            button.className = 'btn btn-outline-secondary';
            button.appendChild( document.createTextNode('Stopping'));
            button.disabled = true
            break;
        case 'offline':
            button.className = 'btn btn-outline-success';
            button.appendChild( document.createTextNode('Start'));
            button.disabled = false;
            break;
        default:
            button.className = 'badge bg-outline-secondary';
            button.appendChild( document.createTextNode('unknown'));
            button.disabled = true;

    }
    return button;
}

function add_game_server(g)
{
    let tbody = document.getElementById('tbody');

    let tr = document.createElement('tr');
    tr.id = g['name']

    //add id
    let th_hash = document.createElement('th');
    th_hash.setAttribute('scope', 'row');
    th_hash.appendChild( document.createTextNode(g['id']) );
    tr.appendChild(th_hash);

    //add name
    let th_name = document.createElement('th');
    th_name.appendChild( document.createTextNode(g['name']));
    tr.appendChild(th_name)

    //add status
    let th_status = document.createElement('th');
    th_status.appendChild( get_badge(g['status']));
    tr.appendChild(th_status);

    //add downlaod button
    let th_download_button = document.createElement('th')
    tr.appendChild(th_download_button)

    //add start button
    let th_start_button = document.createElement('th');
    if(g['start_button'])
    {
        th_start_button.appendChild( get_start_button(g['status']));
    }
    tr.appendChild(th_start_button)

    tbody.appendChild(tr)
}

function display_on_of_switcher(display)
{
    document.getElementById('ChartCpu').style.display = display;
    document.getElementById('ChartRam').style.display = display;
    document.getElementById('available_server').style.display = display;
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

function set_game_server(game_server)
{
    if(game_server != null)
    {
        for( let i of game_server)
        {
            let tr = document.getElementById(i['name']);
            if( tr == null )
            {
                add_game_server(i);
            }
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
    set_game_server(stat['game_server'])
})