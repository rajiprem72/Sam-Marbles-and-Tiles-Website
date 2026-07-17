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

            const formData = new FormData();

            formData.append(
                "payload",
                JSON.stringify(payload)
            );

            await fetch(
                WEB_APP_URL,
                {
                    method: "POST",
                    body: formData,
                    mode: "no-cors"
                }
            );

            alert(
                "Your quotation request has been submitted successfully."
            );

            this.reset();

        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong. Please try again."
            );

        } finally {

            submitButton.disabled = false;
            submitButton.innerText = "Get Price Quote";

        }

    });
