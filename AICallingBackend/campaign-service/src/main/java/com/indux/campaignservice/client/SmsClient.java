package com.indux.campaignservice.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class SmsClient {

    private final RestTemplate restTemplate;

    public SmsClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendSms(String phone, String message) {

        String url = "http://localhost:8084/api/sms/send";

        Map<String, String> request = new HashMap<>();
        request.put("phone", phone);
        request.put("message", message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        restTemplate.postForObject(url, entity, String.class);
    }
}
