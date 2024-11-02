package com.example.testclientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.testclientapp.entity.Country;
import com.example.testclientapp.service.CountryService;
import com.example.testclientapp.service.RegionService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/country")
public class CountryController {

    private final CountryService countryService;
    private final RegionService regionService; 

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("countries", countryService.getAll());
        return "country/index";
    } 

    @GetMapping("/detail/{id}")
    public String getById(@PathVariable Integer id, Model model) {
        Country country = countryService.getById(id);
        model.addAttribute("country", country);
        return "country/detail";
    }

    @GetMapping("/create")
    public String createView(Model model) {
        model.addAttribute("country", new Country());
        model.addAttribute("regions", regionService.getAll()); 
        return "country/createform"; 
    }

    @PostMapping
    public String create(Country country) {
        countryService .create(country); 
        return "redirect:/country";
    }

    @GetMapping("/update/{id}")
    public String updateView(@PathVariable Integer id, Model model) {
        Country country = countryService.getById(id);  
        model.addAttribute("country", country);
        model.addAttribute("regions", regionService.getAll());
        return "country/update";
}

    @PutMapping("/update/{id}")
    public String update(@PathVariable Integer id, Country country) {
        countryService.update(id, country);
        return "redirect:/country";
}

    @GetMapping("/delete/{id}")
    public String deleteView(@PathVariable Integer id, Model model) {
        Country country = countryService.getById(id);
        model.addAttribute("country", country);
        return "country/delete";
}

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        countryService.delete(id);
        return "redirect:/country";
}

}