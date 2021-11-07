'use strict'

class User
{
    constructor(u)
    {
        this.id = u["id"];
        this.email = u["email"];
        this.first_name = u["first_name"];
        this.avatar = u["avatar"];
        this.col = null;

        this.add_user_to_area();        
    }
    add_user_to_area()
    {
        let row = document.getElementById("online_user_area");

        this.col = document.createElement("div");
        this.col.className="col-6";
        row.appendChild(this.col);
        
        let img = document.createElement("img");
        img.className = "avatar";
        img.src = this.avatar;
        this.col.appendChild(img)
        this.col.appendChild( document.createTextNode(" " + this.first_name))
    }
    remove_user_from_area()
    {
        this.col.parentNode.removeChild(this.col);
    }
}

class userOnlineMenager
{
    constructor()
    {
        this.online_user = []
    }
    add_user(user)
    {
        let u = new User(user)
        this.online_user.push(u)
    }
    update_online_user(user)
    {
        for(let u of user)
        {
            if( !this.online_user.find(o => o.id === u["id"]) )
            {
                this.add_user(u)
            }
        }
        for(let i in this.online_user)
        {
            if( user.find(o => o["id"] === this.online_user[i] ))
            {
                this.online_user[i].remove_user_from_area();
                this.online_user.splice(i, 1);
            }
        }
    }
}