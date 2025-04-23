package com.smartcalender.app.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * The EmailService class is responsible for sending different types of emails using the Mailgun API.
 * It provides functionality to send verification emails and password reset emails.
 */
@Service
public class EmailService {

    @Value("${mailgun.domain}")
    private String mailgunDomain;

    @Value("${mailgun.api.key}")
    private String mailgunApiKey;

    /**
     * Sends a verification email to the specified recipient using the Mailgun API.
     * The "template" parameter specifies the Mailgun template to use for the email.
     *
     * @param to the recipient's email address.
     * @param subject the subject of the email.
     * @param verificationUrl the verification URL to include in the email.
     * @param otp the one-time password (OTP) to include in the email.
     */
    public void sendVerificationEmail(String to, String subject, String verificationUrl, String otp) {
        HttpResponse<String> request;
        try {
            request = Unirest.post("https://api.mailgun.net/v3/" + mailgunDomain + "/messages")
                    .basicAuth("api", mailgunApiKey)
                    .field("from", "SmartCalendar <noreply@" + mailgunDomain + ">")
                    .field("to", to)
                    .field("subject", subject)
                    .field("template", "email_verification_html")
                    .field("h:X-Mailgun-Variables", "{\"verificationUrl\": \"" + verificationUrl + "\", \"otp\": \"" + otp + "\"}") //Lägga till variabeln unsubscribeUrl här när det ska implementeras
                    .asString();
        } catch (UnirestException e) {
            throw new RuntimeException("Failed to send email", e);
            // Göra något mer här eller skapa en specifik exception?
        }

        if (request.getStatus() != 200) {
            throw new RuntimeException("Failed to send email: " + request.getBody());
        }
    }

    /**
     * Sends a password reset email to the specified recipient using the Mailgun API.
     * The email includes a reset URL which allows the user to reset their password.
     * The "template" parameter specifies the Mailgun template to use for the email.
     *
     * @param to the recipient's email address
     * @param subject the subject of the password reset email
     * @param resetUrl the URL for resetting the password, included in the email
     */
    public void sendPasswordResetEmail(String to, String subject, String resetUrl) {
        HttpResponse<String> response;

        try {
            response = Unirest.post("https://api.mailgun.net/v3/" + mailgunDomain + "/messages")
                    .basicAuth("api", mailgunApiKey)
                    .field("from", "SmartCalendar <noreply@" + mailgunDomain + ">")
                    .field("to", to)
                    .field("subject", subject)
                    .field("template", "reset_password_html")
                    .field("h:X-Mailgun-Variables", "{\"resetUrl\": \"" + resetUrl + "\"}") //Lägga till variabeln unsubscribeUrl här när det ska implementeras
                    .asString();
        } catch (UnirestException e) {
            throw new RuntimeException("Failed to send email", e);
            // Göra något mer här eller skapa en specifik exception?
        }

        if (response.getStatus() != 200) {
            throw new RuntimeException("Failed to send email: " + response.getBody());
        }
    }

}