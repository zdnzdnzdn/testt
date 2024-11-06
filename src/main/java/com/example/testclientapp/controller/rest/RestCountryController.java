package com.example.testclientapp.controller.rest;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.testclientapp.entity.Country;
import com.example.testclientapp.entity.Region;
import com.example.testclientapp.service.CountryService;
import com.example.testclientapp.model.request.CountryRequest;
import com.example.testclientapp.model.response.CountryResponse;
import java.util.List;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/country")
public class RestCountryController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<Country>> getAll() {
        return ResponseEntity.ok(countryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(countryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Country> create(@RequestBody CountryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(countryService.createWithDTOAuto(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Country> update(
        @PathVariable Integer id, 
        @RequestBody CountryRequest request
    ) {
        Country country = new Country();
        country.setId(id);
        country.setCode(request.getCode());
        country.setName(request.getName());
        
        Region region = new Region();
        region.setId(request.getRegionId());
        country.setRegion(region);
        
        return ResponseEntity.ok(countryService.update(id, country));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        countryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/custom-response")
    public ResponseEntity<CountryResponse> getCustomResponse(@PathVariable Integer id) {
        return ResponseEntity.ok(countryService.getByIdCustomResponse(id));
    }
}