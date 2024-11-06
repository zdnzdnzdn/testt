package com.example.testclientapp.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.testclientapp.entity.Region;

import java.util.List;

@Service
@Slf4j
public class RegionService {

    @Value("${server.base.url}/regions") 
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Region> getAll() {
        return restTemplate
            .exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Region>>() {}
            )
            .getBody();
    }

    public Region getById(Integer id) {
        log.info("Fetching region from endpoint: {}", url.concat("/" + id));

        return restTemplate
            .exchange(url.concat("/" + id), HttpMethod.GET, null, Region.class)
            .getBody();
    }

    public Region create(Region region) {
        return restTemplate
            .exchange(
                url,
                HttpMethod.POST,
                new HttpEntity<>(region),
                new ParameterizedTypeReference<Region>() {}
            )
            .getBody();
    }

    public Region update(Integer id, Region region) {
        HttpEntity<Region> request = new HttpEntity<>(region);
        return restTemplate
            .exchange(url.concat("/" + id), HttpMethod.PUT, request, Region.class)
            .getBody();
    }

    public Region delete(Integer id) {
        return restTemplate
          .exchange(url.concat("/" + id), HttpMethod.DELETE, null, Region.class)
          .getBody();
      }
    }