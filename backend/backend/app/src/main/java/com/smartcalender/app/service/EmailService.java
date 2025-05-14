package com.smartcalender.app.service;

import brevo.ApiClient;
import brevo.Configuration;
import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * The EmailService class is responsible for sending emails using the Brevo API.
 * It supports verification and password reset emails with dynamic parameters.
 */
@Service
public class EmailService {

    private String apiKey;
    private final TransactionalEmailsApi api;

    public EmailService(@Value("${brevo.api.key}") String apiKey) {
        this.apiKey = apiKey;
        ApiClient client = Configuration.getDefaultApiClient();
        client.setApiKey(apiKey);
        this.api = new TransactionalEmailsApi(client);
    }


    /**
     * Sends a verification email using a Brevo template.
     *
     * @param to the recipient's email address
     * @param subject the subject of the email
     * @param verificationUrl the verification URL
     * @param otp the one-time password
     * @param //unsubscribeUrl the unsubscribe URL
     */
    public void sendVerificationEmail(String to, String subject, String verificationUrl, String otp /*, String unsubscribeUrl*/) {
        try {
            SendSmtpEmail email = new SendSmtpEmail();
            email.setSender(new SendSmtpEmailSender().name("SmartCalendar Team").email("no-reply@smartcalendar.se"));
            email.setTo(Collections.singletonList(new SendSmtpEmailTo().email(to)));
            email.setSubject(subject);
            email.setTemplateId(1L);

            // Dynamic parameters
            Map<String, Object> params = new HashMap<>();
            params.put("verificationUrl", verificationUrl);
            params.put("otp", otp);
            //params.put("unsubscribeUrl", unsubscribeUrl);
            email.setParams(params);

            api.sendTransacEmail(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email: " + e.getMessage());
        }
    }

    /**
     * Sends a password reset email using a Brevo template.
     *
     * @param to the recipient's email address
     * @param subject the subject of the email
     * @param resetUrl the password reset URL
     * @param //unsubscribeUrl the unsubscribe URL
     */
    public void sendPasswordResetEmail(String to, String subject, String resetUrl /*, String unsubscribeUrl*/) {
        try {
            SendSmtpEmail email = new SendSmtpEmail();
            email.setSender(new SendSmtpEmailSender().name("SmartCalendar Team").email("no-reply@smartcalendar.se"));
            email.setTo(Collections.singletonList(new SendSmtpEmailTo().email(to)));
            email.setSubject(subject);
            email.setTemplateId(2L);

            // Dynamic parameters
            Map<String, Object> params = new HashMap<>();
            params.put("resetUrl", resetUrl);
            //params.put("unsubscribeUrl", unsubscribeUrl);
            email.setParams(params);

            api.sendTransacEmail(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send password reset email: " + e.getMessage());
        }
    }
}