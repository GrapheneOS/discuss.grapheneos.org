async function extractEmail(r) {
    try {
        const data = await r.readRequestJSON();
        if (!data.email) {
            r.error("missing email field in /register request");
            r.return(400);
            return;
        }
        const parts = data.email.split("@");
        if (parts.length != 2) {
            r.error("invalid email field");
            r.return(400);
            return;
        }
        const domain = parts[1];
        if (domain == "gmail.com") {
            const username = parts[0].split('+')[0].replaceAll(".", "");
            r.variables.extracted_email = username + "@" + domain;
        } else {
            r.variables.extracted_email = data.email;
        }
    } catch (e) {
        r.error(`JSON parsing failed: ${e.message}`);
        r.return(400);
        return;
    }
    r.internalRedirect("/register-internal");
}

export default { extractEmail };
