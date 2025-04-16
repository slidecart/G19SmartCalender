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
        HttpResponse<String> request = null;
        try {
            request = Unirest.post("https://api.mailgun.net/v3/" + mailgunDomain + "/messages")
                    .basicAuth("api", mailgunApiKey)
                    .queryString("from", "SmartCalendar <noreply@" + mailgunDomain + ">")
                    .queryString("to", to)
                    .queryString("subject", subject)
                    .queryString("template", "email verification")
                    .queryString("h:X-Mailgun-Variables", "{\"verificationUrl\": \"" + verificationUrl + "\", \"otp\": \"" + otp + "\"}")
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
        HttpResponse<String> request = null;
        try {
            request = Unirest.post("https://api.mailgun.net/v3/" + mailgunDomain + "/messages")
                    .basicAuth("api", mailgunApiKey)
                    .queryString("from", "SmartCalendar <noreply@" + mailgunDomain + ">")
                    .queryString("to", to)
                    .queryString("subject", subject)
                    .queryString("template", "password reset")
                    .queryString("h:X-Mailgun-Variables", "{\"resetUrl\": \"" + resetUrl + "\"}")
                    .asString();
        } catch (UnirestException e) {
            throw new RuntimeException(e);
            // Göra något mer här eller skapa en specifik exception?
        }

        if (request.getStatus() != 200) {
            throw new RuntimeException("Failed to send email: " + request.getBody().toString());
        }
    }
}