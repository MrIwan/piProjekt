'use strict'

class messageBlock
{
    constructor(m)
    {
        this.current_time = 'hallo';
    }
}

class chatMenager
{
    constructor()
    {
        this.chat = document.getElementById("chat_content");
        this.latest_msg = null;
    }
    new_message(m)
    {
        console.log(m, current_user)
        let media = document.createElement("div");
        
        if(m['author'] == current_user['first_name'])
        {
            media.className = "media media-chat media-chat-reverse";
        }
        else
        {
            media.className = "media media-chat";
            let img = document.createElement("img");
            img.className = "avatar";
            img.src = m["author_avatar"];
            media.appendChild(img);
        }
        this.chat.appendChild(media)

        let media_body = document.createElement("div");
        media_body.className = "media-body";
        media.appendChild(media_body);

        let p = document.createElement("p");
        p.appendChild( document.createTextNode(m['message']) )
        media_body.appendChild(p)

        //scroll to the bottom
        document.getElementById("chat_box").scrollTo(0, document.getElementById("chat_box").scrollHeight );
    }
}

