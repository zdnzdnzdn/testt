package com.example.testclientapp.service;

import org.springframework.stereotype.Service;
import com.example.testclientapp.entity.Region;
import java.util.List;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegionService {
    private final RestTemplate restTemplate;

    public List<Region> getAll() {
        return restTemplate
            .exchange(
                "http://localhost:9001/regions",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Region>>() {}
            )
            .getBody();
    }

    public Region create(Region region) {
        return restTemplate
            .exchange(
                "http://localhost:9001/regions",
                HttpMethod.POST,
                new HttpEntity<>(region),
                new ParameterizedTypeReference<Region>() {}
            )
            .getBody();
    }

    public Region getById(Integer id) {
        return restTemplate
            .exchange(
                "http://localhost:9001/regions/{id}",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Region>() {},
                id
            )
            .getBody();
    }

    public Region update(Integer id, Region region) {
        return restTemplate
            .exchange(
                "http://localhost:9001/regions/{id}",
                HttpMethod.PUT,
                new HttpEntity<>(region),
                new ParameterizedTypeReference<Region>() {},
                id
            )
            .getBody();
    }

    public void delete(Integer id) {
        restTemplate
            .exchange(
                "http://localhost:9001/regions/{id}",
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<Void>() {},
                id
            );
    }
}