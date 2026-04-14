package com.indux.campaignservice.client;

import com.indux.campaignservice.dto.LeadDTO;
import com.indux.campaignservice.dto.LeadPageResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class LeadClient {

    private final RestTemplate restTemplate;

    public LeadClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<LeadDTO> getAllLeads() {

        String url = "http://localhost:8081/api/leads?page=0&size=1000";

        LeadPageResponse response = restTemplate.exchange(
                url,
                org.springframework.http.HttpMethod.GET,
                null,
                new ParameterizedTypeReference<LeadPageResponse>() {}
        ).getBody();

        return response.getContent();
    }
}