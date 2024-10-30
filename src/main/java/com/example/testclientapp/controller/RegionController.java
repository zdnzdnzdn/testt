package com.example.testclientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import com.example.testclientapp.entity.Region;
import com.example.testclientapp.service.RegionService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/region")
public class RegionController {
    private final RegionService regionService;

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("regions", regionService.getAll());
        return "region/index";
    }

    @GetMapping("/create")
    public String createView(Model model) {
        model.addAttribute("region", new Region());
        return "region/createform";
    }

    @PostMapping    
    public String create(Region region) {
        regionService.create(region);
        return "redirect:/region";
    }

    @GetMapping("/detail/{id}")
    public String getById(@PathVariable Integer id, Model model) {
        Region region = regionService.getById(id);
        model.addAttribute("region", region);
        return "region/detail";
    }

    @GetMapping("/update/{id}")
    public String updateView(@PathVariable Integer id, Model model) {
        Region region = regionService.getById(id);  
        model.addAttribute("region", region);
        return "region/update";
    }

    @PostMapping("/update/{id}")
    public String update(@PathVariable Integer id, Region region) {
        regionService.update(id, region);
        return "redirect:/region";
    }

    @GetMapping("/delete/{id}")
    public String deleteView(@PathVariable Integer id, Model model) {
        Region region = regionService.getById(id);
        model.addAttribute("region", region);
        return "region/delete";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        regionService.delete(id);
        return "redirect:/region";
    }
}