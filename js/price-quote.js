const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbx11kMZUg2yYiZZ9AkscGFhLpqUKP7hdPfKIDC3CYHFXVDlLzu--8Yqoj6-yx4Cd7dWOA/exec";

document
    .getElementById("quoteForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = this.querySelector("button");

        submitButton.disabled = true;
        submitButton.innerText = "Generating Quote...";

        try {

            const selectedItems = [];

            document
                .querySelectorAll(
                    '.checkbox-grid input[type="checkbox"]:checked'
                )
                .forEach(item => {

                    selectedItems.push(
                        item.value
                    );

                });

            if (selectedItems.length === 0) {

                alert(
                    "Please select at least one product."
                );

                submitButton.disabled = false;
                submitButton.innerText = "Get Price Quote";

                return;
            }

            const payload = {

                name: this.name.value.trim(),

                mobile: this.mobile.value.trim(),

                email: this.email.value.trim(),

                items: selectedItems

            };

            const response = await fetch(
                WEB_APP_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify(
                        payload
                    )

                }
            );

            const result =
                await response.json();

            if (result.success) {

                alert(

                    "Your quotation has been sent to your email successfully.\n\nQuote ID: " +

                    result.quoteId

                );

                this.reset();

            } else {

                alert(

                    "Error:\n" +

                    result.message

                );

            }

        } catch (error) {

            console.error(error);

            alert(

                "Something went wrong. Please try again."

            );

        }

        submitButton.disabled = false;

        submitButton.innerText = "Get Price Quote";

    });
