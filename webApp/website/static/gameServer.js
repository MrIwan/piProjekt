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

class gameServer
{
    constructor(data)
    {
        let tbody = document.getElementById('tbody');
        this.tr = document.createElement('tr');
        this.tr.id = data['name']

        //add id
        this.th_hash = document.createElement('th');
        this.th_hash.setAttribute('scope', 'row');
        this.th_hash.appendChild( document.createTextNode(data['id']) );
        this.tr.appendChild(th_hash);

        //add name
        this.th_name = document.createElement('th');
        this.th_name.appendChild( document.createTextNode(data['name']));
        this.tr.appendChild(th_name)

        //add status
        this.th_status = document.createElement('th');
        this.th_status.appendChild( get_badge(data['status']));
        this.tr.appendChild(th_status);

        //add downlaod button
        this.th_download_button = document.createElement('th')
        this.tr.appendChild(th_download_button)

        //add start button
        this.th_start_button = document.createElement('th');
        if(data['start_button'])
        {
            this.th_start_button.appendChild( get_start_button(data['status']));
        }
        tr.appendChild(th_start_button)

        tbody.appendChild(tr)
    }
    
}

class gameServerMenager
{
    constructor()
    {
        this.gs = []
    }
}