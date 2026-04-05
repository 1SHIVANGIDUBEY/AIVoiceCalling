package com.sms.smsservice.controller;

import com.sms.smsservice.service.SmsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/sms")
public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public String sendSms(@RequestBody Map<String, String> request) {

        String phone = request.get("phone");
        String message = request.get("message");

        smsService.sendSms(phone, message);

        return "SMS sent Successfully!";
    }
}