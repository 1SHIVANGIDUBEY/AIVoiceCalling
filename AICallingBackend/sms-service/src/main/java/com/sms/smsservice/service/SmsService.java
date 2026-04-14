package com.sms.smsservice.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {

    public void sendSms(String phone, String message) {

        System.out.println("====================");
        System.out.println("SMS Sent!");
        System.out.println("To: " + phone);
        System.out.println("Message: " + message);
        System.out.println("====================");
    }
}
