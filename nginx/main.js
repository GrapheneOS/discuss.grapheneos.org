async function extractEmail(r) {
    try {
        const data = await r.readRequestJSON();
        if (!data.email) {
            r.error("missing email field in /register request");
            r.return(400);
            return;
        }
        r.variables.extracted_email = data.email;
    } catch (e) {
        r.error(`JSON parsing failed: ${e.message}`);
        r.return(400);
        return;
    }
    r.internalRedirect("/register-internal");
}

export default { extractEmail };
