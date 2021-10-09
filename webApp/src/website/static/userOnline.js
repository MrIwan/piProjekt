'use strict'

class userOnlineMenager
{
    constructor()
    {
        this.tbody = document.getElementById("tbody_playerOnline");
        this.online_user = []
    }
    add_user(user)
    {
        let td = document.createElement("td");
        td.id = "user;" + user;
        td.appendChild( document.createTextNode(user));
        this.tbody.appendChild(td);

        this.online_user.push(user)
    }
    remove_user(user)
    {
        this.tbody.removeChild( document.getElementById("user;" + user) )
        this.online_user
    }
    update_online_user(user)
    {
        for(let u of user)
        {
            if(!this.online_user.includes(u))
            {
                this.add_user(u);
            }
        }
        for(let u of this.online_user)
        {
            if(!user.includes(u))
            {
                this.remove_user(u);
            }
        }
    }
}