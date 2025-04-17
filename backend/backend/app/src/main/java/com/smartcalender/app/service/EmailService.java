package com.smartcalender.app.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${mailgun.domain}")
    private String mailgunDomain;

    @Value("${mailgun.api.key}")
    private String mailgunApiKey;

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
            throw new RuntimeException(e);
            // Göra något mer här eller skapa en specifik exception?
        }

        if (request.getStatus() != 200) {
            throw new RuntimeException("Failed to send email: " + request.getBody().toString());
        }
    }

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
        }

        if (response.getStatus() != 200) {
            throw new RuntimeException("Failed to send email: " + response.getBody());
        }
    }

}