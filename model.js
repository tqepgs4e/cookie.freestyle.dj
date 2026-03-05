const model = {
    send: function(authToken) {
        return fetch(
            "https://smart-cookie-gateway-production.up.railway.app/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + authToken
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    msghistory: [{ role: "user", content: "Explain why fast language models matter." }]
                })
            }
        ).then(response => response.json());
    }
};
