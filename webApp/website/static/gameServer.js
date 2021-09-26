'use strict'

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

function start_stop_button_clicked(el, id)
{
    let signal = el.innerHTML.toLowerCase();
    switch(signal)
    {
        case 'stop':
            socket.emit('stop_game_server', id);
            break;
        case 'start':
            socket.emit('start_game_server', id)
            break;
        default:
            console.log('start_stop nicht möglich da status unbekannt')
    }
    console.log('stat_stop_button_clicked el = ' + el.innerHTML + ' und id = ' + id);
}

class gameServer
{
    constructor(data)
    {
        this.id = data['id']

        let tbody = document.getElementById('tbody');
        this.tr = document.createElement('tr');
        this.tr.id = data['name']

        //add name
        this.th_name = document.createElement('th');
        this.th_name.setAttribute('scope', 'row');
        this.th_name.appendChild( document.createTextNode(data['name']));
        this.tr.appendChild(this.th_name)

        //add status
        this.th_status = document.createElement('th');
        this.th_status.appendChild( get_badge(data['status']));
        this.tr.appendChild(this.th_status);

        //add server address
        this.th_address = document.createElement('th')
        this.th_address.appendChild( document.createTextNode(data['server_address']))
        this.tr.appendChild(this.th_address)

        //add downlaod button
        this.th_download_button = document.createElement('th')
        this.tr.appendChild(this.th_download_button)

        //add start button
        this.th_start_button = document.createElement('th');
        if(data['start_button'])
        {
            let ssb = get_start_button(data['status']);
            ssb.onclick = function()
            {
                start_stop_button_clicked(this, data['id'])
            }
            this.th_start_button.appendChild( ssb );
        }
        this.tr.appendChild(this.th_start_button)

        tbody.appendChild(this.tr)
    }
    update(data)
    {
        console.log(this.id + ' sollte jetzt updaten, mit folgenden daten: ' + data['id'])
    }
    remove()
    {
        console.log(this.name + ' sollte zerstört werden')
    }
}

class gameServerMenager
{
    constructor()
    {
        this.gs = []
    }
    update_game_server(gameServer_array)
    {
        if(gameServer_array != null)
        {
            for(let i of gameServer_array)
            {
                let temp = this.gs.find(x => x.id === i.id);
                if(temp == undefined)
                {
                    let n = new gameServer(i);
                    this.gs.push(n);
                }
                else
                {
                    temp.update(i);
                }
            }  
        }
        
    }
}