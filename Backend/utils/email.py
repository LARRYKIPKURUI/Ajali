import os
import sendgrid
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("ALERT_FROM_EMAIL", "alerts@ajali.app")

def send_email_alert(to_email, subject, content):
    if not SENDGRID_API_KEY:
        raise Exception("Missing SendGrid API key")

    sg = sendgrid.SendGridAPIClient(SENDGRID_API_KEY)
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to_email,
        subject=subject,
        html_content=content
    )
    response = sg.send(message)
    return response.status_code
