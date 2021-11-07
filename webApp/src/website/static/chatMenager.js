'use strict'

class chatMenager
{
    constructor()
    {
        this.chat = document.getElementById("chat_content");
        this.latest_msg = null;
    }
    new_message(m)
    {
        console.log(m)
        let media = document.createElement("div");
        media.className = "media media-chat";
        media.display ="none";
        this.chat.appendChild(media)

        let img = document.createElement("img");
        img.className = "avatar";
        img.src = m["author_avatar"];
        media.appendChild(img);

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

