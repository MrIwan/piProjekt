'use strict'

function deleteToken(tokenId)
{
    fetch("/settings/delete-token", {
        method: "POST",
        body: JSON.stringify({ tokenId: tokenId}),
    }).then((_res) => {
        window.location.href = "/settings";
    })
}