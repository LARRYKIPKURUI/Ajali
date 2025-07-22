import os
import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# Email notification
def send_email_notification(to_email, subject, message_body):
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    from_email = os.getenv("FROM_EMAIL")

    try:
        msg = MIMEText(message_body)
        msg["Subject"] = subject
        msg["From"] = from_email
        msg["To"] = to_email

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)

        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)


# SMS notification using Twilio
def send_sms_notification(to_number, message_body):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_PHONE_NUMBER")

    try:
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=message_body,
            from_=from_number,
            to=to_number
        )
        return True, message.sid
    except Exception as e:
        return False, str(e)
