const CHATBOT_URL =
    "https://script.google.com/macros/s/AKfycbyKkOOZsHydc4WROm0lFIYePt7im97UtBfL-mqQOe9PNe206F5otgqa57h96hteFlsycw/exec";

async function sendMessage() {

    const input =
        document.getElementById(
            "chat-input"
        );

    const message =
        input.value.trim();

    if (!message) return;

    const response = await fetch(
        CHATBOT_URL,
        {
            method: "POST",
            body: JSON.stringify({
                message
            })
        }
    );

    const data =
        await response.json();

    document
        .getElementById(
            "chat-messages"
        )
        .innerHTML += `

        <p><b>You:</b> ${message}</p>

        <p><b>AI:</b> ${data.reply}</p>

        `;
}
