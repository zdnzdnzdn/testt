package com.example.testclientapp.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.testclientapp.entity.Country;

import java.util.List;

@Service
@Slf4j
public class CountryService {

    @Value("${server.base.url}/countries") 
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Country> getAll() {
        return restTemplate
            .exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Country>>() {}
            )
            .getBody();
    }

    public Country getById(Integer id) {
        log.info("Fetching country from endpoint: {}", url.concat("/" + id));

        return restTemplate
            .exchange(url.concat("/" + id), HttpMethod.GET, null, Country.class)
            .getBody();
    }

    public Country create(Country country) {
        return restTemplate
            .exchange(
                url,
                HttpMethod.POST,
                new HttpEntity<>(country),
                new ParameterizedTypeReference<Country>() {}
            )
            .getBody();
    }

    public Country update(Integer id, Country country) {
        HttpEntity<Country> request = new HttpEntity<>(country);
        return restTemplate
            .exchange(url.concat("/" + id), HttpMethod.PUT, request, Country.class)
            .getBody();
    }

    public void delete(Integer id) {
        restTemplate
            .exchange(url.concat("/" + id), HttpMethod.DELETE, null, Void.class);
    }
}