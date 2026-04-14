package com.indux.campaignservice.dto;

import lombok.Data;
import java.util.List;

@Data
public class LeadPageResponse {
    private List<LeadDTO> content;
    private int currentPage;
    private int totalPages;
    private long totalItems;
}