import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email sending via SendGrid
def send_email(to, subject, body):
    try:
        message = Mail(
            from_email=os.getenv("FROM_EMAIL"),
            to_emails=to,
            subject=subject,
            html_content=body
        )
        sg = SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
        response = sg.send(message)
        return response.status_code
    except Exception as e:
        print(f"[SendGrid Error] {str(e)}")
        return None


# SMS sending via Twilio
def send_sms(phone_number, message):
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_PHONE_NUMBER")

        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=message,
            from_=from_number,
            to=phone_number
        )
        return message.sid
    except Exception as e:
        print(f"[Twilio Error] {str(e)}")
        return None
